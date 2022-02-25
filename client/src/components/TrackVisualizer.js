import { Container, Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'


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
                const tmpObj = {startTime: Math.ceil((segment.start) * 100) / 100, finishTime: Math.ceil((segment.start + segment.duration) * 100) / 100, frequency: freq, volume: vol * pitch};
                if(segmentData.filter((e) => {return e.frequency === freq}).length === 0) {
                    segmentData.push(tmpObj);
                }
            }
        }
    }
    return segmentData;
}

/**
 * Updates the bar color/height from live data... TODO: Implement live data, rather than default results
 */
const updateBarParams = (numBars, bars) => {
    const barsData = []
    let i = 0;
    while(i < numBars) {
        barsData[i] ={height: `${1 + bars[i] % 15}vh`}
        ++i;
    }
    return barsData;
}

/**
 * Compare callback for objects by frequency
 * @param {*} a object a
 * @param {*} b object b
 * @returns -1 when freq(a) > freq(b) , 1 freq(a) < freq(b), 0 freq(a) === freq(b)
 */
const compare = (a,b) => {
    if(a.frequency > b.frequency) {
        return 1;
    }
    if(a.frequency < b.frequency) {
        return -1;
    }
    return 0;
}
/**
 * Generates waveform data at a specic time frame
 * @param {*} freqBands -> A set of frequencies "buckets" to group data into
 * @param {*} segments -> A set of segments belonging to the same start time
 */
const updateBars = (freqBands, segments) =>{
    segments = segments.sort((a,b) => compare(a,b));
    //console.log(segments);
    //console.log(freqBands);
    const ret = []; // store height and frequency
    let lofreq = 0;
    let segCount = 0;
    for(let i = 0; i < freqBands.length; i++) { // initialize values
        ret[i] = 0;
    }
    while (segCount < segments.length) { // loop over segments
        while(segCount < segments.length && segments[segCount].frequency <= freqBands[lofreq]) { // partition accordingly
            ret[lofreq] += segments[segCount].volume;
            segCount++;
        }
        lofreq++;
    }
    
    return ret;
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

const maxFreq = (segments) => {
    let max = -1;
    for(const segment of segments) {
        if(segment.frequency > max){
            max = segment.frequency;
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
    
    /*TODO: Further optimization, process data before it is sent to its respective component
    const {segData} = props;
    const {freqBands} = props;
    */
    // waveform Constants
    const numBars = 50;
    const segData = processSegments(sections, segments);
    const freqBands = initFreqBands(maxFreq(segData),numBars);

    // usestates
    const [displayAnalytics, setDisplayAnalytics] = useState(false);
    
    /**
     * Waveform state
     */
    const timeSigData = segData.filter(segment => segment.startTime === 0)
    const barsStep = updateBars(freqBands, timeSigData);
    const barConfig = updateBarParams(numBars, barsStep);
    const [waveformState, setWaveFormState] = useState({
        timeSignature: 0,
        timeSigData: timeSigData,
        barsConfig: barConfig,
    });
    const analyticsClickHandler = (e) => {
        e.preventDefault();
        setDisplayAnalytics(!displayAnalytics);
    }
    console.log(segData)
    /* hook for updating waveform data */
    useEffect(() => {
        if(waveformState.timeSignature === segData[segData.length - 1].finishTime) return;
        //console.log(waveformState)
        let newData = segData.filter(segment => segment.startTime === waveformState.timeSignature)
        //console.log(newData);
        let timeout = setTimeout(() => {
            let barSteps = updateBars(freqBands, waveformState.timeSigData);
            setWaveFormState({
                timeSignature: newData[0].finishTime,
                timeSigData: newData,
                barsConfig: updateBarParams(numBars, barSteps),
            });
        }, (newData[0].finishTime - newData[0].startTime))
        return () => clearTimeout(timeout);
    },[]);
    /*[waveformState, segData, freqBands]*/
    return (
        <Container>
        <Box sx={{display:"flex", justifyContent:"space-between", paddingBottom:"15vw"}}>
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
                {waveformState.barsConfig.map(bar => (
                    <Box sx={{backgroundColor:"primary.dark", height:bar.height, width:"1vw", marginLeft:"0.125vw"}}></Box>
                ))}
            </Box>
        </Container>
    )
}
