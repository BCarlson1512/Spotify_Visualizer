/**
 * Compare callback for objects by frequency
 * @param {*} a object a
 * @param {*} b object b
 * @returns -1 when freq(a) > freq(b) , 1 freq(a) < freq(b), 0 freq(a) === freq(b)
 */
const compare = (a,b) => {
    if(a.frequency > b.frequency) {
        return 1;
    }
    if(a.frequency < b.frequency) {
        return -1;
    }
    return 0;
}
export default compare;