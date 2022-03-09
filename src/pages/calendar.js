import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';
import { useSelector } from 'react-redux';
import changeDate from '../components/change-date';
import changeDuration from '../components/change-duration';
import register from '../components/register';
import changeBgColor from '../components/change-bg-color';
import { FcCancel } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";

export default function Calendar() {
    const user = useSelector(state => state.user.userInfo)
    const [lessons, setLessons] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [open, isOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [correspondingProfessor, setCorrespondingProfessor] = useState('');

    const events = lessons.map(lesson => {
        const event = {}
        event.backgroundColor = changeBgColor(lesson)
        event.borderColor = 'black'
        event.title = `${lesson.subject}`
        event.start = lesson.date
        event.end = new Date(new Date(lesson.date).setTime(new Date(lesson.date).getTime() + lesson.duration * 60 * 1000))
        event.extendedProps = { lesson: lesson, _id: lesson._id, professorId: lesson.professorId, numberOfStudents: `${lesson.registeredStudents.length}/${lesson.maxStudent}` }
        return event
    })

    useEffect(() => {
        axios.get('http://localhost:5000/api/lessons/')
            .then(response => {
                setLessons(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://localhost:5000/api/professors/')
            .then(response => {
                setProfessors(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (!user) return null

    function GetStatus(lesson) {
        // if student is already registered
        if (lesson.registeredStudents.length !== 0) {
            var index = lesson.registeredStudents.indexOf(user._id)
            if (index === -1) {
                return <FcCancel style={{ verticalAlign: "top" }} />
            } else {
                return <FcOk style={{ verticalAlign: "top" }} />
            }
        };
        // if the maximum amount of students is reached or if the date is already expired
        if (lesson.registeredStudents.length === lesson.maxStudent | new Date() > new Date(lesson.date)) {
            return <FcCancel style={{ verticalAlign: "top" }} />
        }
        // if user can register
        return <FcPlus style={{ verticalAlign: "top" }} />
    }

    let registerButton = <button onClick={() => { register(selectedLesson, user._id) }}>S'inscrire</button>

    const lessonInfo = <div id="lessonInfo">{lessons.map(lesson => {
        if (selectedLesson === lesson._id) {
            return <div className={`${"lesson"} ${lesson.subject}`} key={lesson._id}>
                <h3 className="subject">{lesson.subject}<button className="close" onClick={() => isOpen(false)}>x</button></h3>
                <div><div className="professorName">Professeur : {professors.map(professor => {
                    if (correspondingProfessor === professor._id) {
                        return <span key={professor._id} value={professor._id}>{professor.firstName + ' ' + professor.lastName}</span>
                    } else return ' '
                })}</div>
                    <div>Classe : {lesson.classe}</div>
                    <div>Durée : {changeDuration(lesson.duration)}</div>
                    <div>Elèves inscrits : {lesson.registeredStudents.length}/{lesson.maxStudent}</div>
                    <div>Leçon prévue le {changeDate(lesson.date)}</div>
                    <p>Contenu de la leçon : {lesson.description}</p>
                    {user.role === "Student" || user.role === "Admin" ? registerButton : ''}
                    <div className="creationDate">Créé le {changeDate(lesson.createdAt)}</div>
                </div>
            </div>
        } else return ' '
    })}</div>

    return (
        <div>
            <FullCalendar
                locale={frLocale}
                plugins={[timeGridPlugin]}
                titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
                headerToolbar={{ left: '', center: 'title', right: 'prev,today,next' }}
                initialView="timeGridWeek"
                allDaySlot={false}
                weekends={false}
                slotMinTime="08:00:00"
                slotMaxTime="19:00:00"
                height="auto"
                events={events}
                eventClick={function (info) {
                    setSelectedLesson(info.event._def.extendedProps._id)
                    setCorrespondingProfessor(info.event._def.extendedProps.professorId)
                    isOpen(true)
                }}
                eventContent={function renderEventContent(eventInfo) {
                    return (
                        <div className="container nopadding">
                            <div className="timeStart nopadding">{eventInfo.timeText.split('-')[0]}</div>
                            <div className="status nopadding">{GetStatus(eventInfo.event.extendedProps.lesson)}</div>
                            <div className="title">{eventInfo.event._def.title}</div>
                            <div className="timeEnd nopadding">{eventInfo.timeText.split('-')[1]}</div>
                            <div className="nbStudents nopadding">{eventInfo.event.extendedProps.numberOfStudents}</div>
                        </div>
                    )
                }}
            />
            {open === true ? lessonInfo : null}
        </div >
    )
}