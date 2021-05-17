import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ProfessorsList from './lists/professors-list.component';
import ClassesList from './lists/classes-list.component';
import SubjectsList from './lists/subjects-list.component';


export default function CreateLesson(props) {
    const [professorId, setProfessorId] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [subject, setSubject] = useState('');
    const [classe, setClasse] = useState('');
    const [maxStudent, setMaxStudent] = useState('');
    const [date, setDate] = useState(new Date());

    function onChangeProfessorId(id) {
        setProfessorId(id);
        console.log(id)
    }

    function onChangeDescription(e) {
        setDescription(e.target.value);
        console.log(e.target.value)
    }

    function onChangeDuration(e) {
        setDuration(e.target.value);
        console.log(e.target.value)
    }

    function onChangeSubject(subject) {
        setSubject(subject);
        console.log(subject)
    }

    function onChangeClasse(classe) {
        setClasse(classe);
        console.log(classe)
    }

    function onChangeMaxStudent(e) {
        setMaxStudent(e.target.value);
        console.log(e.target.value)
    }

    function onChangeDate(date) {
        setDate(date);
        console.log(date)
    }

    function onSubmit(e) {
        e.preventDefault();
        const lesson = {
            professorId: professorId,
            description: description,
            duration: duration,
            subject: subject,
            classe: classe,
            maxStudent: maxStudent,
            date: date
        };
        axios.post('http://localhost:5000/lessons/add', lesson)
            .then(res => console.log(res.data));
    }

    return (
        <div>
            <h3>Créer une séance d'AP</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Professeur : </label>
                    <ProfessorsList onChange={onChangeProfessorId} />
                </div>
                <div className="form-group">
                    <label>Description : </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Durée de l'AP : </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Matière : </label>
                    <SubjectsList onChange={onChangeSubject} />
                </div>
                <div className="form-group">
                    <label>Classe(s) : </label>
                    <ClassesList onChange={onChangeClasse} />
                </div>
                <div className="form-group">
                    <label>Nombre d'élèves maximum : </label>
                    <input
                        type="text"
                        className="form-control"
                        value={maxStudent}
                        onChange={onChangeMaxStudent}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker selected={date} onChange={onChangeDate} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Créer la séance" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )

}