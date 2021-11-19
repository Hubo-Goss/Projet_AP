import React, { useState } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import ClassesList from '../components/classes-list';
import SubjectsList from '../components/subjects-list';
import changeDate from '../components/change-date';
import getHour from '../components/get-hour';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import Snackbar from '@material-ui/core/Snackbar';
import Button from "react-bootstrap/button";
import CloseButton from "react-bootstrap/closebutton";
import Alert from '@material-ui/lab/Alert';
import { useSelector } from "react-redux"


export default function CreateLesson() {
    const user = useSelector(state => state.user.userInfo)

    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [subject, setSubject] = useState('');
    const [classe, setClasse] = useState('');
    const [maxStudent, setMaxStudent] = useState('');
    const [dateToAdd, setDateToAdd] = useState(new Date());
    const [dates, setDates] = useState([]);
    const [open, setOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarText, setSnackbarText] = useState('Lesson created!');
    const registeredStudents = [];

    registerLocale('fr', fr)

    if (!user) return null
    const professorId = (user._id);

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

    function onChangeDateToAdd(date) {
        setDateToAdd(date);
        console.log(date)
    }

    function addDate() {
        setDates([...dates, new Date(dateToAdd)])
    }

    function sortArray() {
        function compare(a, b) {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }

        dates.sort(compare)
    }

    function removeDate(date) {
        console.log(dates)
        dates.splice(dates.indexOf(date), 1)
        setDates(dates)
        console.log(dates)
        document.getElementById('datesList').removeChild(document.getElementById(`${changeDate(date.toISOString()).props.children} ${getHour(date)}`))
    }

    function handleClose() {
        setOpen(false)
    }

    function changeSnackbar(severity) {
        setSnackbarSeverity(severity)
        if (severity === "error")
            setSnackbarText("Accès non autorisé.")
        else
            setSnackbarText("Leçon(s) créée(s)!")
    }

    function onSubmit(e) {
        e.preventDefault();
        dates.forEach(date => {
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
        })
    }

    return (
        <div className="box">
            <h3>Créer une séance d'AP</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Matière : </label>
                    <SubjectsList onChange={onChangeSubject} subject='Sélectionnez une matière' props="defaultHidden" />
                </div>
                <div className="form-group">
                    <label>Durée de l'AP : </label>
                    <select
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}>
                        <option value="DEFAULT" hidden>Choisissez une durée</option>
                        <option value="60">1 H 00</option>
                        <option value="90">1 H 30</option>
                        <option value="120">2 H 00</option>
                    </select>
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
                    <label>Description : </label>
                    <textarea type="text"
                        id="noResize"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                        rows="5"
                        placeholder="Décrivez ce que vous allez voir pendant l'AP"
                    />
                </div>
                <div className="form-group">
                    <label>Date(s) : </label>
                    <div>
                        <DatePicker selected={dateToAdd} onChange={onChangeDateToAdd} showTimeInput locale='fr' inline />
                        <Button type="button" className="btn btn-light" onClick={addDate}>Ajouter</Button>
                        <ul id="datesList" className="list-group container">
                            {sortArray()}
                            {console.log(dates)}
                            {dates.map(date => {
                                return <li
                                    id={`${changeDate(date.toISOString()).props.children} ${getHour(date)}`}
                                    className="li row"
                                    key={`${changeDate(date.toISOString()).props.children} ${getHour(date)}`}>
                                    <span className="col-10">
                                        <span>{changeDate(date.toISOString())}</span>
                                        <span> à {getHour(date)}</span>
                                    </span>
                                    <CloseButton className="col-2" onClick={() => { removeDate(date) }} />
                                </li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Créer la séance" className="btn btn-primary" />
                </div>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarSeverity}>
                    {snackbarText}
                </Alert>
            </Snackbar>
        </div>
    )

}