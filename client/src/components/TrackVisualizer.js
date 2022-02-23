import { Container, Box } from '@mui/material';
import React, { useState } from 'react'

const groupPitches = (pitch) => {

}

const averageDuration = (segments) => {
    let averageDuration = 0;
    for(const segment of segments) {
        averageDuration += segment.duration;
    }
    return averageDuration / segments.length;
}

const maxDuration = (segments) => {
    let max = -1;
    for(const segment of segments) {
        if (max < segment.duration) {
            max = segment.duration;
        }
    }
    return max;
}

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
    //console.log(props)
    const {beats} = props;
    const {bars} = props;
    const {sections} = props;
    const {segments} = props;
    const {tatums} = props;
    const {track_key} = props;
    console.log(track_key);
    let segmentAvg = 0;
    let numSegments = 0;
    return (
        <Container>TrackVisualizer Avg: {averageDuration(segments)} Max: {maxDuration(segments)} Min: {minDuration(segments)}</Container>
    )
}
