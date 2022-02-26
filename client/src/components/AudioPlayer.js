import { useState } from 'react'
import SpotifyPlayer from "react-spotify-web-playback";

export default function AudioPlayer(props) {
    const accessToken = props.accessToken;
    const trackUri = props.trackUri?.uri;
    //console.log(props)
    const [play, setPlay] = useState(false);

    if (!accessToken) return null;
    return (
        <SpotifyPlayer 
        token={accessToken}
        showSaveIcon
        uris={trackUri ? [trackUri] : []}
        />
    )
}
