import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ClassesList(props) {
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        // Va chercher les roles existantes.
        axios.get('http://localhost:5000/roles/')
            .then(response => {
                setRoles(response.data.map(role => role.description));
                setRole(response.data[0].description);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    function onChangeRole(e) {
        setRole(e.target.value);
        props.onChange(e.target.value)
    }

    return (
        <select required
            className="form-control"
            value={role}
            onChange={onChangeRole}>
            {
                roles.map(role => {
                    return <option
                        key={role}
                        value={role}>{role}
                    </option>;
                })
            }
        </select>
    )
}