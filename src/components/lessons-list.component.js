import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import EditLessons from './edit-lesson.component';

Modal.setAppElement('#root')

export default function LessonsList(props) {
    const [lessons, setLessons] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [open, isOpen] = useState(false);
    const [openEdit, isEditOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [correspondingProfessor, setCorrespondingProfessor] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/lessons/')
            .then(response => {
                setLessons(response.data)
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://localhost:5000/professors/')
            .then(response => {
                setProfessors(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function changeDate(date) {
        let dateArray = date.split("-")
        date = <span>{dateArray[2].substr(0, 2) + '/' + dateArray[1] + '/' + dateArray[0]}</span>
        return date
    }

    function lessonDisplaySize(duration) {
        switch (duration) {
            case 30: return 'lessonSmallFormat thirtyminutesSize';
            case 60: return 'lessonSmallFormat oneHourSize';
            case 90: return 'lessonSmallFormat oneAndHalfHourSize';
            case 120: return 'lessonSmallFormat twoHoursSize';
            default: console.log('trop long');
        }
    }

    function deleteLesson(lessonId) {
        axios.delete(`http://localhost:5000/lessons/${lessonId}`)
            .then(res => console.log(res.data));
        window.location.reload();
    }

    return (
        <div>
            <p>Vous êtes sur la page des AP, voici les leçons disponibles :</p>
            <div>{lessons.map(lesson => {
                return <div className={`${lessonDisplaySize(lesson.duration)} ${lesson.subject}`} onClick={() => (`${isOpen(true)} ${setSelectedLesson(lesson._id)} ${setCorrespondingProfessor(lesson.professorId)}`)} key={lesson._id}>
                    <div className={"subjectSmallFormat"}>{lesson.subject}</div>
                    <span className="professorNameSmallFormat">{professors.map(professor => {
                        if (lesson.professorId === professor._id) {
                            return <div key={professor._id}>{professor.firstName + ' ' + professor.lastName}</div>
                        } else return ' '
                    })}</span>
                    <span className="creationDateSmallFormat">Créé le {changeDate(lesson.createdAt)}</span>
                </div>
            })}</div>
            <Modal isOpen={open} className="modalContent" overlayClassName="modalOverlay" onRequestClose={() => isOpen(false)}>
                <div>{lessons.map(lesson => {
                    if (selectedLesson === lesson._id) {
                        return <div className={`${"lesson"} ${lesson.subject}`} key={lesson._id}>
                            <h3 className="subject">{lesson.subject}<button className="close" onClick={() => isOpen(false)}>x</button></h3>
                            <div><div className="professorName">Professeur : {professors.map(professor => {
                                if (correspondingProfessor === professor._id) {
                                    return <span key={professor._id} value={professor._id}>{professor.firstName + ' ' + professor.lastName}</span>
                                } else return ' '
                            })}</div>
                                <div>Classe : {lesson.classe}</div>
                                <div>Durée : {lesson.duration}min</div>
                                <div>Elèves inscrits : 0/{lesson.maxStudent}</div>
                                <div>Leçon prévue le {changeDate(lesson.date)}</div>
                                <p>Contenu de la leçon : {lesson.description}</p>
                                <button onClick={() => { isEditOpen(true) }}>Edit</button>
                                <button onClick={() => { deleteLesson(selectedLesson) }}>Delete</button>
                                <div className="creationDate">Créé le {changeDate(lesson.createdAt)}</div>
                            </div>
                        </div>
                    } else return ' '
                })}</div>
            </Modal>
            <Modal isOpen={openEdit} className="modalContent" overlayClassName="modalOverlay" onRequestClose={() => isEditOpen(false)}>
                {lessons.map(lesson => {
                    if (lesson._id === selectedLesson) {
                        return <div key="lesson._id">{professors.map(professor => {
                            if (correspondingProfessor === professor._id) {
                                return <EditLessons
                                    key={selectedLesson}
                                    lessonId={selectedLesson}
                                    professorId={correspondingProfessor}
                                    description={lesson.description}
                                    duration={lesson.duration}
                                    subject={lesson.subject}
                                    maxStudent={lesson.maxStudent}
                                    classe={lesson.classe}
                                />
                            } else return ' '
                        })}</div>
                    } else return ' '
                })}
            </Modal>
        </div>
    )
}

