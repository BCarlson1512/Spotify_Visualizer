const maxFreq = (segments) => {
    let max = -1;
    for(const segment of segments) {
        if(segment.frequency > max){
            max = segment.frequency;
        }
    }
    return max;
}
export default maxFreq;