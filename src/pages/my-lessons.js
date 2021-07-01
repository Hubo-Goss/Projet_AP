import React, { useState, useEffect } from 'react';
import changeDate from '../components/change-date';
import changeDuration from '../components/change-duration';
import axios from 'axios';
import Modal from 'react-modal';
import EditLessons from './edit-lesson';
import { useSelector } from "react-redux"
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

export default function MyLessons() {
    const user = useSelector(state => state.user.userInfo)
    const [lessons, setLessons] = useState([]);
    let lessonNumber = 0
    const [openEdit, isEditOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState('');
    useEffect(() => {
        axios.get('http://localhost:5000/api/lessons/')
            .then(response => {
                setLessons(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function deleteLesson(lessonId) {
        axios.delete(`http://localhost:5000/api/lessons/${lessonId}`)
            .then(res => console.log(res.data));
    }

    const professor = (
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Durée</th>
                        <th scope="col">Classe</th>
                        <th scope="col">Elèves inscrits</th>
                        <th>Editer</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map(lesson => {
                        if (lesson.professorId === user._id) {
                            lessonNumber = lessonNumber + 1
                            return <tr>
                                <th>{lessonNumber}</th>
                                <td>Leçon du {changeDate(lesson.date)}</td>
                                <td>{changeDuration(lesson.duration)}</td>
                                <td>{lesson.classe}</td>
                                <td>0/{lesson.maxStudent}</td>
                                <td><AiFillEdit className='clickable' onClick={() => `${isEditOpen(true)} ${setSelectedLesson(lesson._id)}`} /></td>
                                <td><AiFillDelete className='clickable' onClick={() => { deleteLesson(lesson._id) }} /></td>
                            </tr>
                        } else return ''
                    })}
                </tbody>
            </table>
            <Modal isOpen={openEdit} className="modalContent" overlayClassName="modalOverlay" onRequestClose={() => isEditOpen(false)}>
                {lessons.map(lesson => {
                    if (lesson._id === selectedLesson) {
                        return <EditLessons
                            key={selectedLesson}
                            lessonId={selectedLesson}
                            professorId={lesson.professorId}
                            description={lesson.description}
                            duration={lesson.duration}
                            subject={lesson.subject}
                            classe={lesson.classe}
                            maxStudent={lesson.maxStudent}
                            date={lesson.date}
                            registeredStudents={lesson.registeredStudents}
                        />
                    } else return ' '
                })}
            </Modal>
        </div >
    )


    return (
        <div>
            {user.role === 'Professor' || user.role === 'Admin' ? professor : ''}
        </div>
    )
}