import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import InputGroup from "react-bootstrap/inputgroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/button";
import ListGroup from "react-bootstrap/listgroup";
import CloseButton from "react-bootstrap/closebutton";

export default function SubjectsManager() {
    const user = useSelector(state => state.user.userInfo)
    const [subjectToAdd, setSubjectToAdd] = useState([]);
    const [newSubject, setNewSubject] = useState([]);
    const [deletedSubject, setDeletedSubject] = useState([]);
    const [subjects, setSubjects] = useState([]);


    useEffect(() => {
        // Va chercher les matières existantes.
        console.log("useEffect")
        axios.get('http://localhost:5000/api/subjects/')
            .then(response => {
                setSubjects(response.data.map(subject => subject));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [newSubject, deletedSubject])

    function compare(a, b) {
        if (a.subjectName < b.subjectName) {
            return -1;
        }
        if (a.subjectName > b.subjectName) {
            return 1;
        }
        return 0;
    }

    subjects.sort(compare)

    function onChangeSubject(e) {
        setSubjectToAdd(e.target.value)
    }

    function handleKeypress(e) {
        if (e.charCode === 13) {
            addSubject();
        }
    };

    function addSubject() {
        const subject = {
            subjectName: subjectToAdd.charAt(0).toUpperCase() + subjectToAdd.slice(1)
        }

        axios.post('http://localhost:5000/api/subjects/add', subject, { withCredentials: true })
            .then(res => {
                console.log(res.data)
            });

        document.getElementById('subjectInput').value = ''

        setNewSubject(subject)
    }

    function deleteSubject(id) {
        console.log(id)
        axios.delete(`http://localhost:5000/api/subjects/${id}`, { withCredentials: true })
            .then(res => console.log(res.data));

        setDeletedSubject(id)
    }

    if (!user) return null

    return (
        <div className="subjectManagerBox">
            <InputGroup className="mb-3">
                <FormControl
                    id="subjectInput"
                    placeholder="Matière"
                    aria-label="Matière"
                    aria-describedby="basic-addon2"
                    onChange={onChangeSubject}
                    onKeyPress={(e) => handleKeypress(e)}
                />
                <Button variant="primary" id="button-addon2" onClick={addSubject}>
                    Ajouter
                </Button>
            </InputGroup>
            <div>
                <ListGroup>
                    {subjects.map(subject => {
                        return <ListGroup.Item key={subject._id} onClick={() => console.log(subject._id)}>
                            {subject.subjectName}
                            <CloseButton onClick={() => { deleteSubject(subject._id) }} />
                        </ListGroup.Item>
                    })}
                </ListGroup>
            </div>
        </div>
    );
}