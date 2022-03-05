import compare from "./compare";

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
export default updateBars;