export default function changeDuration(duration) {
    let finalDuration = ''
    switch (duration) {
        case 30:
            finalDuration = '00h30'
            break;
        case 60:
            finalDuration = '01h00'
            break;
        case 90:
            finalDuration = '01h30'
            break;
        case 120:
            finalDuration = '02h00'
            break;
        default:
            finalDuration = duration
    }

    return finalDuration
}