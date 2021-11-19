import React from 'react';

// Change ISO-8601 format date (YYYY-MM-DDTHH:MM:SS) to this format : DD/MM/YYYY
export default function changeDate(date) {
    let dateArray = date.split("-")
    return <span>{dateArray[2].substr(0, 2) + '/' + dateArray[1] + '/' + dateArray[0]}</span>
}