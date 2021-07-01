import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ProfessorsList from '../components/professors-list';
import ClassesList from '../components/classes-list';
import SubjectsList from '../components/subjects-list';


export default function EditLessons(props) {
    const lessonId = props.lessonId
    const [professorId, setProfessorId] = useState(props.professorId);
    const [description, setDescription] = useState(props.description);
    const [duration, setDuration] = useState(props.duration);
    const [subject, setSubject] = useState(props.subject);
    const [classe, setClasse] = useState(props.classe);
    const [maxStudent, setMaxStudent] = useState(props.maxStudent);
    const [date, setDate] = useState(new Date());

    function onChangeProfessorId(id) {
        setProfessorId(id);
    }

    function onChangeDescription(e) {
        setDescription(e.target.value);
    }

    function onChangeDuration(e) {
        setDuration(e.target.value);
    }

    function onChangeSubject(subject) {
        setSubject(subject);
    }

    function onChangeClasse(classe) {
        setClasse(classe);
    }

    function onChangeMaxStudent(e) {
        setMaxStudent(e.target.value)
    }

    function onChangeDate(date) {
        setDate(date);
    }

    function onSubmit(e) {
        const lesson = {
            professorId: professorId,
            description: description,
            duration: duration,
            subject: subject,
            classe: classe,
            maxStudent: maxStudent,
            date: date
        };
        axios.post(`http://localhost:5000/api/lessons/update/${lessonId}`, lesson)
            .then(res => console.log(res.data));
    }

    return (
        <div>
            <h3>Editer la séance d'AP</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Professeur : </label>
                    <ProfessorsList onChange={onChangeProfessorId} professorId={professorId} />
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
                    <SubjectsList onChange={onChangeSubject} subject={subject} />
                </div>
                <div className="form-group">
                    <label>Classe(s) : </label>
                    <ClassesList onChange={onChangeClasse} classe={classe} />
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
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Editer" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )

}