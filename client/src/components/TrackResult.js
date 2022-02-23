import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

export default function TrackResult(props) {
    const track = props.props;
    const {selectTrack} = props;

    const playerHandler = () => {
        selectTrack(track);
    }

    return (
    <Card sx={{display: "flex", marginHorizontal:"2vw", marginVertical:"2vh", align: "center"}}>
        <CardActionArea onClick={playerHandler}>
            <CardContent>
                <CardMedia component="img" image={track.albumUrl} alt="albumart"  style={{maxWidth:"3vw", maxHeight:"3vw"}}/>
                <Typography gutterBottom variant ="h5" style={{marginLeft:"3",}}>{track.title}</Typography>
                <Typography variant="body2" color="text.secondary">{track.artist}</Typography>
            </CardContent>
        </CardActionArea>
    </Card>
    )
}
