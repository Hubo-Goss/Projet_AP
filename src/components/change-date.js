import React from 'react';

export default function changeDate(date) {
    let dateArray = date.split("-")
    return <span>{dateArray[2].substr(0, 2) + '/' + dateArray[1] + '/' + dateArray[0]}</span>
}