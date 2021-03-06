import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SubjectsList(props) {
    const [subject, setSubject] = useState(props.subject || 'DEFAULT');
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        // Va chercher les matières existantes.
        axios.get('http://localhost:5000/api/subjects/')
            .then(response => {
                setSubjects(response.data.map(subject => subject.subjectName));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function onChangeSubject(e) {
        setSubject(e.target.value);
        if (props.onChange) props.onChange(e.target.value);
    }

    function compare(a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    }

    subjects.sort(compare)

    if (props.props === "defaultHidden") {
        return (
            <select required
                className="form-control"
                value={subject}
                onChange={onChangeSubject}>
                <option value="DEFAULT" hidden>Choisissez une matière</option>
                {
                    subjects.map(subject => {
                        return <option
                            key={subject}
                            value={subject}>{subject}
                        </option>;
                    })
                }
            </select>
        )
    } else {
        return (
            <select required
                className="form-control"
                value={subject}
                onChange={onChangeSubject}>
                <option value="DEFAULT">Pas de filtre</option>
                {
                    subjects.map(subject => {
                        return <option
                            key={subject}
                            value={subject}>{subject}
                        </option>;
                    })
                }
            </select>
        )
    }
}