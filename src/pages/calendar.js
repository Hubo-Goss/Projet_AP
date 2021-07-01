import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import changeDate from '../components/change-date';
import changeDuration from '../components/change-duration';

Modal.setAppElement('#root')

export default function Calendar() {
    const [lessons, setLessons] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [open, isOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [correspondingProfessor, setCorrespondingProfessor] = useState('');

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

    function lessonDisplaySize(duration) {
        switch (duration) {
            case 30: return 'lessonSmallFormat thirtyminutesSize';
            case 60: return 'lessonSmallFormat oneHourSize';
            case 90: return 'lessonSmallFormat oneAndHalfHourSize';
            case 120: return 'lessonSmallFormat twoHoursSize';
            default: console.log('trop long');
        }
    }

    // function register() {
    //     return <button onClick={() => {}}></button>
    // }

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
                                <div>Durée : {changeDuration(lesson.duration)}</div>
                                <div>Elèves inscrits : 0/{lesson.maxStudent}</div>
                                <div>Leçon prévue le {changeDate(lesson.date)}</div>
                                <p>Contenu de la leçon : {lesson.description}</p>
                                <div className="creationDate">Créé le {changeDate(lesson.createdAt)}</div>
                            </div>
                        </div>
                    } else return ' '
                })}</div>
            </Modal>
        </div>
    )
}

