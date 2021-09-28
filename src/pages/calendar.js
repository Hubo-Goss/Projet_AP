import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import changeDate from '../components/change-date';
import changeDuration from '../components/change-duration';
import register from '../components/register';
import SubjectsList from '../components/subjects-list.js';

Modal.setAppElement('#root')

export default function Calendar() {
    const user = useSelector(state => state.user.userInfo)
    const [lessons, setLessons] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [open, isOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState('');
    const [correspondingProfessor, setCorrespondingProfessor] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('DEFAULT');

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

    function onChangeSubject(subject) {
        setSubjectFilter(subject)
    }

    if (!user) return null

    let registerButton = <button onClick={() => { register(selectedLesson, user._id) }}>S'inscrire</button>

    return (
        <div>
            <p>Vous êtes sur la page des AP, voici les leçons disponibles :</p>
            <div>Filtrer par matière : </div><div className="smallSelect"><SubjectsList className="smallSelect" onChange={onChangeSubject} /></div>
            <div>{lessons.map(lesson => {
                if (subjectFilter === "DEFAULT") {
                    //Afficher toutes les leçons (en fonction du user)
                    if ((lesson.classe === user.classe || user.role === "Admin" || user.role === "Professor")) {
                        return <div className={`${lessonDisplaySize(lesson.duration)} ${lesson.subject}`} onClick={() => (`${isOpen(true)} ${setSelectedLesson(lesson._id)} ${setCorrespondingProfessor(lesson.professorId)}`)} key={lesson._id}>
                            <div className={"subjectSmallFormat"}>{lesson.subject}</div>
                            <span className="professorNameSmallFormat">{professors.map(professor => {
                                if (lesson.professorId === professor._id) {
                                    return <div key={professor._id}>{professor.firstName + ' ' + professor.lastName}</div>
                                } else return ' '
                            })}</span>
                            <span className="creationDateSmallFormat">Créé le {changeDate(lesson.createdAt)}</span>
                        </div>
                    } else return ''
                } else {
                    //Affiche seulement les leçons dont la metière correspond au filtre actif
                    if ((lesson.classe === user.classe || user.role === "Admin" || user.role === "Professor") && lesson.subject === subjectFilter) {
                        return <div className={`${lessonDisplaySize(lesson.duration)} ${lesson.subject}`} onClick={() => (`${isOpen(true)} ${setSelectedLesson(lesson._id)} ${setCorrespondingProfessor(lesson.professorId)}`)} key={lesson._id}>
                            <div className={"subjectSmallFormat"}>{lesson.subject}</div>
                            <span className="professorNameSmallFormat">{professors.map(professor => {
                                if (lesson.professorId === professor._id) {
                                    return <div key={professor._id}>{professor.firstName + ' ' + professor.lastName}</div>
                                } else return ' '
                            })}</span>
                            <span className="creationDateSmallFormat">Créé le {changeDate(lesson.createdAt)}</span>
                        </div>
                    } else return ''
                }
            }
            )}</div>
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
                                <div>Elèves inscrits : {lesson.registeredStudents.length}/{lesson.maxStudent}</div>
                                <div>Leçon prévue le {changeDate(lesson.date)}</div>
                                <p>Contenu de la leçon : {lesson.description}</p>
                                {user.role === "Student" || user.role === "Admin" ? registerButton : ''}
                                <div className="creationDate">Créé le {changeDate(lesson.createdAt)}</div>
                            </div>
                        </div>
                    } else return ' '
                })}</div>
            </Modal>
        </div>
    )
}

