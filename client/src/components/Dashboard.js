import { Box, Container, FormControl, Input, InputLabel} from '@mui/material';
import React, { useState, useEffect } from 'react'
import SpotifyWebApi from "spotify-web-api-node";
import TrackResult from './TrackResult'
import AudioPlayer from './AudioPlayer';
import useAuth from '../hooks/useAuth';
import Axios from 'axios';
import TrackVisualizer from './TrackVisualizer';

const spotifyAPI = new SpotifyWebApi({
    clientId:"a4a973fdd7b04086abbccb93d5fd8360",
});

function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [Search, setSearch] = useState("");
    const [searchResults, setSearchResults]  = useState([]);
    const [currentTrack, setCurrentTrack] = useState();
    const [trackURI, setTrackURI] = useState();
    const [trackAnalysis, setTrackAnalysis] = useState();
    const [segData, setSegData] = useState([]);
    const selectTrack = (track) => {
        setTrackURI(track.uri);
        setCurrentTrack(track);
        setSearch("");
    }

    // auth useEffect
    useEffect(() => {
        if (!accessToken) return;
        spotifyAPI.setAccessToken(accessToken);
    }, [accessToken]);
    
    //searching
    useEffect(() => {
        if (!Search) return setSearchResults([]);
        if (!accessToken) return;
        let cancel = false;
        const updateCancel = () => {
            cancel = true;
        }
        spotifyAPI.searchTracks(Search).then(res => {
            //console.log(res.body.tracks.items);
            if (cancel) return;
            if (!res.body.tracks) return setSearchResults([]);
            setSearchResults(
                res.body.tracks.items.map(track => {
                const minAlbum = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image;
                        return smallest;
                }, track.album.images[0])
                return { 
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: minAlbum.url
                }
            })); 
        })
        return updateCancel;
    }, [Search, accessToken]);

    // analyze specific track
    useEffect(()=> {
        if(!trackURI) return;
        //console.log(trackURI)
        Axios.get("http://localhost:3001/analyze", {params: {
            track_uri: trackURI,
            access_token: accessToken
        }}).then( res => {
            //console.log(res.data.segments)
            setSegData(res.data.segments);
            setTrackAnalysis(res.data.tracks);
        }).catch(()=> {
            console.log("An error occurred");
        });
    }, [trackURI, accessToken]);

    return (
        <Container style={{display: 'flex', flexDirection: 'column', height: "96vh", }}>
            <FormControl>
                <InputLabel htmlFor="input-field">Search Artists/Songs</InputLabel>
                <Input id="input-field" value={Search} onChange={e => setSearch(e.target.value)}/>
            </FormControl>
            
            <Box flexGrow={1} style={{overflowY: 'auto'}}>
            <p>Search for a Track to start...</p>
            {searchResults.map(track => {
                return <TrackResult props={track} key={track.uri} selectTrack={selectTrack} />
            })}
            </Box>
            {(trackAnalysis && segData) &&
                <Box sx={{paddingBottom:"1vh"}}>
                    <TrackVisualizer 
                    beats={trackAnalysis.beats} 
                    bars={trackAnalysis.bars}
                    sections={trackAnalysis.sections}
                    segments={trackAnalysis.segments}
                    tatums={trackAnalysis.tatums}
                    track={trackAnalysis.track}
                    segData={segData}
                    />
                </Box>
            }
            <Box> 
                <AudioPlayer accessToken={accessToken} trackUri={currentTrack} />
            </Box>
        </Container>
    )
}

export default Dashboard