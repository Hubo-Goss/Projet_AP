// Change date format (Thu Nov 25 2021 16:06:53 GMT+0100 (heure normale d’Europe centrale)) to this format : HHhMM
export default function getHour(date) {
    let dateArray = date.toString().split(" ")
    let timeArray = dateArray[4].split(":")

    return `${timeArray[0] + 'h' + timeArray[1]}`
}