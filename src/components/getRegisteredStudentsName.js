import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default function GetRegisteredStudentsName(props) {
    const registeredStudents = (props.registeredStudents)
    const [registeredStudentsName, setRegisteredStudentsName] = useState([]);

    useEffect(() => {
        let name = []
        registeredStudents.forEach(element => {
            axios.get(`http://localhost:5000/api/users/${element}`)
                .then(response => {
                    name = [...name, `${response.data.firstName} ${response.data.lastName}`]
                    setRegisteredStudentsName(name)
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        // console.log(registeredStudentsName)
    }, [registeredStudents])

    return (
        <div>
            {registeredStudentsName.map(name => {
                return <li key={name}>{name}</li>
            })}
        </div>
    )
}
