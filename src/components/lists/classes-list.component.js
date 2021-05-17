import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ClassesList(props) {
    const [classe, setClasse] = useState(props.classe || '');
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        // Va chercher les classes existantes.
        axios.get('http://localhost:5000/classes/')
            .then(response => {
                setClasses(response.data.map(classe => classe.classeName));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function onChangeClasse(e) {
        setClasse(e.target.value);
        props.onChange(e.target.value)
    }

    return (
        <select required
            className="form-control"
            value={classe}
            onChange={onChangeClasse}>
            {
                classes.map(classe => {
                    return <option
                        key={classe}
                        value={classe}>{classe}
                    </option>;
                })
            }
        </select>
    )
}