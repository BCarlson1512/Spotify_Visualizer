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
export default averageDuration;