import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ClassesList from '../components/classes-list';
import SubjectsList from '../components/subjects-list';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from "react-redux"


export default function CreateLesson() {
    const user = useSelector(state => state.user)

    const professorId = (user.userInfo._id);
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [subject, setSubject] = useState('');
    const [classe, setClasse] = useState('');
    const [maxStudent, setMaxStudent] = useState('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarText, setSnackbarText] = useState('Lesson created!');
    const registeredStudents = [];


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

    function handleClose() {
        setOpen(false)
    }

    function changeSnackbar(severity) {
        setSnackbarSeverity(severity)
        if (severity === "error")
            setSnackbarText("Unauthorized access.")
        else
            setSnackbarText("Lesson created!")
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
            date: date,
            registeredStudents: registeredStudents
        };
        axios.post('http://localhost:5000/api/lessons/add', lesson, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                if (res.data === "Unauthorized")
                    changeSnackbar("error")
                else
                    changeSnackbar("success")
                setOpen(true)
            });
    }

    return (
        <div>
            <h3>Créer une séance d'AP</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Matière : </label>
                    <SubjectsList onChange={onChangeSubject} subject='Sélectionnez une matière' />
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
                    <label>Classe(s) : </label>
                    <ClassesList onChange={onChangeClasse} classe='Sélectionnez la classe concernée' />
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
            <button onClick={(req, res) => console.log(`${user.userInfo.firstName} ${user.userInfo.lastName}`)}>user</button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarSeverity}>
                    {snackbarText}
                </Alert>
            </Snackbar>
        </div>
    )

}