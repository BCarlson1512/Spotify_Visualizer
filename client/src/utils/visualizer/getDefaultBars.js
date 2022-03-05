/** Setup default bar heights, in the event empty data is passed along */
const getDefaultBars = (barsLength) => {
    let i = 0;
    const bars = [];
    for(i = 0; i < barsLength; i++) {
        bars.push(1);
    }
    return bars;
};
export default getDefaultBars;