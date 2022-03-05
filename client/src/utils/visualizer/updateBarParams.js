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

export default updateBarParams;