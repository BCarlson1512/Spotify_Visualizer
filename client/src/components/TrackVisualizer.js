import { Container, Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import getDefaultBars from '../utils/visualizer/getDefaultBars'
import updateBarParams from '../utils/visualizer/updateBarParams'
import updateBars from '../utils/visualizer/updateBars'
import initFreqBands from '../utils/visualizer/initFreqBands'
import averageDuration from '../utils/visualizer/averageDuration'
import maxDuration from '../utils/visualizer/maxDuration'
import maxFreq from '../utils/visualizer/maxFreq'
import minDuration from '../utils/visualizer/minDuration'

export default function TrackVisualizer(props) {

    // props
    const {beats} = props;
    const {bars} = props;
    const {track} = props;
    const {trackURI} = props;
    const {segments} = props;
    const {segData} = props;
    // waveform Constants
    const numBars = 50;
    //const segData = processSegments(sections, segments);
    const freqBands = initFreqBands(maxFreq(segData),numBars);
    const defaultFreq = getDefaultBars(numBars);
    // usestates
    const [displayAnalytics, setDisplayAnalytics] = useState(false);
    const [play, setPlay] = useState(false);
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
    console.log(waveformState)
    /* hook for updating waveform data */
    useEffect(() => {
        if(waveformState.timeSignature === segData[segData.length - 1].finishTime) return;
        //console.log(waveformState)
        let newData = segData.filter(segment => (Math.abs(segment.startTime - waveformState.timeSignature) <= 0.01))
        //console.log(newData);
        setTimeout(() => {
            let barSteps = updateBars(freqBands, waveformState.timeSigData);
            setWaveFormState({
                timeSignature: newData[0].finishTime,
                timeSigData: newData,
                barsConfig: updateBarParams(numBars, barSteps),
            });
            //console.log(newData[0].finishTime - newData[0].startTime)
        }, (newData[0].finishTime - newData[0].startTime) *1000);
    },[waveformState, segData, freqBands]);
    useEffect(() => {
        return () => {
            console.log("Song change")
            setWaveFormState({
                timeSignature: 0,
                timeSigData: timeSigData,
                barsConfig: defaultFreq,
            })
        }
    },[trackURI])
    return (
        <Container>
        <Box sx={{display:"flex", justifyContent:"space-between", paddingBottom:"15vh"}}>
            <Typography gutterBottom variant ="h5" style={{marginLeft:"3",}}>Visualization</Typography>
            {displayAnalytics &&
                <Box className="analytics-container">
                    <Typography gutterBottom variant ="h6" style={{marginLeft:"3",}}>Track Analytics</Typography>
                    <Typography variant="body2" color="text.secondary">Mean Segment Length: {averageDuration(segments) * 1000} msec</Typography>
                    <Typography variant="body2" color="text.secondary">Max Segment Length: {maxDuration(segments) * 1000} msec</Typography>
                    <Typography variant="body2" color="text.secondary">Min Segment Length: {minDuration(segments) * 1000} msec</Typography>
                    <Typography variant="body2" color="text.secondary">Total Segments {segData.length}</Typography>
                </Box>
            }
            <Button variant="contained" color="success" onClick={(e)=> analyticsClickHandler(e)}>{!displayAnalytics? "Show" : "Hide"} Analytics</Button>
        </Box>
        <Box className="visualizer-container" sx={{display:"flex", paddingTop: "1vh", height: "15vh"}}>
            {waveformState.barsConfig ? waveformState.barsConfig.map((bar,index) => (
                <Box key={`bar${index}`} sx={{backgroundColor:"primary.dark", height:bar.height, width:"1vw", marginLeft:"0.125vw"}}></Box>
            )) :
            defaultFreq.forEach(e => (
                <Box sx={{backgroundColor:"primary.dark", height:e, width:"1vw", marginLeft:"0.125vw"}}></Box>
            ) )}
        </Box>
        </Container>
    )
}
