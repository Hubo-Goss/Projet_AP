import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

export default function FrenchDatePicker(props) {
    const [date, setDate] = useState(props.date);

    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    const days = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']

    const locale = {
        localize: {
            month: n => months[n],
            day: n => days[n]
        },
        formatLong: {}
    }

    function onChangeDate(date) {
        setDate(date);
        console.log(date)
    }

    return <DatePicker selected={date} onChange={onChangeDate} locale={locale} inline />
}




