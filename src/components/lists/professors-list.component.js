import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfessorsList(props) {
    const [professors, setProfessors] = useState([]);

    useEffect(() => {
        // Va chercher les professeurs existants parmis les users.
        axios.get('http://localhost:5000/professors/')
            .then(response => {
                setProfessors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function onChangeProfessorId(e) {
        if (props.onChange) props.onChange(e.target.value)
    }

    return (
        <select required
            className="form-control"
            onChange={onChangeProfessorId}>
            {
                professors.map(professor => {
                    return <option
                        key={professor._id}
                        value={professor._id}>{professor.firstName + ' ' + professor.lastName}
                    </option>;
                })
            }
        </select>
    )
}