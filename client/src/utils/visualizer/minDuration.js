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
export default minDuration;