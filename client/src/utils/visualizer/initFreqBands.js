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
export default initFreqBands;