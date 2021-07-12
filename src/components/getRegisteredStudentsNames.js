import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default function GetRegisteredStudentsNames(props) {
    const registeredStudents = (props.registeredStudents)
    const [registeredStudentsName, setRegisteredStudentsName] = useState([]);
    let name = []

    useEffect(() => {
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
    }, [])

    return (
        <div>
            {registeredStudentsName.map(name => {
                return <li key={name}>{name}</li>
            })}
        </div>
    )
}
