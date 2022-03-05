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
export default maxDuration;