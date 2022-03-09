import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentsList(props) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Va chercher les étudiants existants parmis les users.
        axios.get('http://localhost:5000/api/students/')
            .then(response => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function onChangeStudentId(e) {
        if (props.onChange) props.onChange(e.target.value)
    }

    return (
        <select required
            className="form-control"
            onChange={onChangeStudentId}>
            <option value="DEFAULT" hidden>Choisissez un élève</option>
            {
                students.map(student => {
                    return <option
                        key={student._id}
                        value={student._id}>{student.firstName + ' ' + student.lastName}
                    </option>;
                })
            }
        </select>
    )
}