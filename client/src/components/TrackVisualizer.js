import { Container, Box, Typography, Button } from '@mui/material';
import React, { useState } from 'react'


/**
 * Wrapper function for every segment + section
 * @param Dataobj in the form {starttime, finishtime, frequency, volume}
 */
const processSegments = (sections, segments) => {
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
                segmentData.push({startTime: segment.start, finishTime: segment.start + segment.duration, frequency: freq, volume: vol})
            }
        }
    }
    return segmentData;
}

/**
 * Updates the bar color/height from live data... TODO: Implement live data, rather than default results
 */
const updateBarParams = (numBars) => {
    const barsData = []
    let i = 0;
    while(i < numBars) {
        barsData[i] ={height: "7.5vh"}
        ++i;
    }
    return barsData;
}

const initFreqBands = (maxFreq, numBands) => {
    const interval = maxFreq / numBands;
    const freqBands = [];
    let tmp = 0;
    for(let i = 0; i < numBands; i++) {
        tmp += interval;
        freqBands[i] = tmp;
    }
    //console.log(freqBands)
    return freqBands
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

    // props
    const {beats} = props;
    const {bars} = props;
    const {sections} = props;
    const {segments} = props;
    const {tatums} = props;
    const {track} = props;
    
    // waveform variables
    const numBars = 50;
    const freqBands = initFreqBands(track.analysis_sample_rate,numBars);
    const segData = processSegments(sections, segments);


    const barConfig = updateBarParams(numBars);

    // usestates
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
                    <Typography variant="body2" color="text.secondary">Total Segments {segData.length}</Typography>
                </Box>
            }
            <Box className="visualizer-container" sx={{display:"flex", paddingTop: "1vh"}}>
                {barConfig.map(bar => (
                    <Box sx={{backgroundColor:"primary.dark", height:bar.height, width:"1vw", marginLeft:"0.125vw"}}></Box>
                ))}
            </Box>
        </Container>
    )
}
