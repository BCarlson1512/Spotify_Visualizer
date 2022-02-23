import { Container, Box, Typography, Button } from '@mui/material';
import React, { useState } from 'react'


/**
 * Wrapper function for every segment + section
 * @param Dataobj in the form {starttime, finishtime, frequency, volume}
 */
const processSegments = (sections, segments, dataObj) => {

}

/**
 * Takes a segment, returns pitch data in the form {starttime, finishtime, frequency, volume}
 * @param pitches -> An array of pitches
 * @param segment a specific segment
 */
const groupPitches = (segment, pitches) => {

}

/**
 * Gets the average duration length
 * @param segments -> The array of segments
 */
const averageDuration = (segments) => {
    let averageDuration = 0;
    for(const segment of segments) {
        averageDuration += segment.duration;
    }
    return averageDuration / segments.length;
}

/**
 * Gets the max duration of segments
 */
const maxDuration = (segments) => {
    let max = -1;
    for(const segment of segments) {
        if (max < segment.duration) {
            max = segment.duration;
        }
    }
    return max;
}

/**
 * Gets the min duration of segments
 */
const minDuration = (segments) => {
    let max = 10000000;
    for(const segment of segments) {
        if (max > segment.duration) {
            max = segment.duration;
        }
    }
    return max;
}

export default function TrackVisualizer(props) {

    const {beats} = props;
    const {bars} = props;
    const {sections} = props;
    const {segments} = props;
    const {tatums} = props;
    const {track_key} = props;
    const [displayAnalytics, setDisplayAnalytics] = useState(false);
    
    const analyticsClickHandler = (e) => {
        e.preventDefault();
        setDisplayAnalytics(!displayAnalytics);
    }

    return (
        <Container>
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <Typography gutterBottom variant ="h5" style={{marginLeft:"3",}}>Visualization</Typography>
            <Button variant="contained" color="success" onClick={(e)=> analyticsClickHandler(e)}>{!displayAnalytics? "Show" : "Hide"} Analytics</Button>
        </Box>
            {displayAnalytics &&
                <Box className="analytics-container">
                    <Typography gutterBottom variant ="h6" style={{marginLeft:"3",}}>Track Analytics</Typography>
                    <Typography variant="body2" color="text.secondary">Mean Segment Length: {averageDuration(segments) * 1000} msec</Typography>
                    <Typography variant="body2" color="text.secondary">Max Segment Length: {maxDuration(segments) * 1000} msec</Typography>
                    <Typography variant="body2" color="text.secondary">Min Segment Length: {minDuration(segments) * 1000} msec</Typography>
                </Box>
            }
            <Box className="visualizer-container">
            </Box>
        </Container>
    )
}
