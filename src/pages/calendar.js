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
// import { Tooltip } from 'bootstrap';

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
        event.extendedProps = { _id: lesson._id, professorId: lesson.professorId, numberOfStudents: `${lesson.registeredStudents.length}/${lesson.maxStudent}` }
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
                eventContent={function (arg) {
                    let title = document.createElement('div')
                    let numberOfStudents = document.createElement('div')

                    title.innerHTML = arg.event.title
                    numberOfStudents.innerHTML = arg.event.extendedProps.numberOfStudents

                    let arrayOfDomNodes = [title, numberOfStudents]
                    return { domNodes: arrayOfDomNodes }
                }
                }
            // slotLabelContent={
            //     function (level) {
            //         var hours = ["08h05", "09h00", "09h55", "11h05", "12h00", "13h10", "14h05", "14h00", "15h10", "16h05", "17h00", "17h55"]
            //         return hours[level]
            //     }
            // }
            />
            {open === true ? lessonInfo : null}
        </div >
    )
}