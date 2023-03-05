export default function useFormatTime(date){
    const hour24 = date.getHours()
    const minute = date.getMinutes()
    const ampm = hour24 >= 12 ? 'pm' : 'am'
    let hour12 = hour24 % 12;
    hour12 = hour12 ? hour12 : 12
    return hour12 + ':' + minute + ' ' + ampm

}