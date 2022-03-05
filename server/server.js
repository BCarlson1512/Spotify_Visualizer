const path = require('path');
require("dotenv").config({path: path.resolve(__dirname, './.env')});
const express = require("express");
const SpotifyWebAPI = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyWebAPI = new SpotifyWebAPI({
        redirectUri: "http://localhost:3000/",
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
    spotifyWebAPI.authorizationCodeGrant(code)
    .then(data => { // Spotify auth works...
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch((err) => { // Spotify authentication error
        console.log(err)
        res.sendStatus(400);
    })
});

app.post("/refresh", (req,res) => {
    const refreshToken = req.body.refresh_token;
    // Get the refresh tokenconsole.log(req.body)
    //console.log(refreshToken);
    const spotifyWebAPI = new SpotifyWebAPI({
        redirectUri: "http://localhost:3000/",
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken,
    });
    spotifyWebAPI.refreshAccessToken().then(
        (data) => {
            //console.log(data.body)
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            })
            //spotifyWebAPI.setAccessToken(data.body['access_token']);
        }).catch((err) => {
            console.log(err)
            res.sendStatus(400);
        }
    );
});

/**
 * Wrapper function for every segment + section
 * @param Dataobj in the form {starttime, finishtime, frequency, volume}
 */
 const processSegments = (sections, segments) => {
    console.log("functioncall");
    const segmentData = [];
    // C = 0, Cmaj = 1... see spotify API for further documentation
    const keyFreqs = [261.63, 277.18, 293.665, 311.127, 329.628, 349.228, 369.994, 391.995, 415.305, 440, 466.164, 493.883]
    for(const section of sections) {
        const startingFrequency = keyFreqs[section.key];
        const endTime = section.start + section.duration;
        // aggregate the pitches
        for(const segment of segments) {
            if(segment.start + segment.duration >= endTime) break; // out of range
            const vol = Math.abs(segment.loudness_max)
            for (const pitch of segment.pitches) {
                const freq = startingFrequency * pitch;
                const tmpObj = {startTime: Math.ceil((segment.start) * 1000) / 1000, finishTime: Math.ceil((segment.start + segment.duration) * 1000) / 1000, frequency: freq, volume: vol * pitch};
                segmentData.push(tmpObj);
            }
        }
    }
    return segmentData;
}

// song analysis from spotiy API
app.get("/analyze", (req,res) => {
    const trackUri = req.query.track_uri.replace("spotify:track:","");
    const accessToken = req.query.access_token;
    //console.log(trackUri)
    const spotifyWebAPI = new SpotifyWebAPI({
        redirectUri: "http://localhost:3000/",
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });
    spotifyWebAPI.setAccessToken(accessToken);
    spotifyWebAPI.getAudioAnalysisForTrack(trackUri).then(
        (data) => {
            const processedData = processSegments(data.body.sections, data.body.segments);
            //console.log(processedData)
            //console.log(data.body.segments);
            const dataAnalysis = data.body;
            res.send({tracks: dataAnalysis, segments: processedData});
        }).catch((err)=> {
            console.log(err);
            res.sendStatus(400);
        });
});

app.get("/currentlyPlaying", (req, res) => {
    //TODO: Fetch timestamp of current track playing
});

app.listen(process.env.PORT);
console.log(`Listening on Port: ` + process.env.PORT);