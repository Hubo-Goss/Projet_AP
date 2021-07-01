import React, { useState, useEffect } from 'react';
import changeDate from '../components/change-date';
import axios from 'axios';
import { useSelector } from "react-redux"

export default function MyLessons() {
    const user = useSelector(state => state.user.userInfo)
    const [lessons, setLessons] = useState([]);
    let lessonNumber = 0

    useEffect(() => {
        axios.get('http://localhost:5000/api/lessons/')
            .then(response => {
                setLessons(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
                    </tr>
                </thead>
                <tbody>
                    {lessons.map(lesson => {
                        if (lesson.professorId === user._id) {
                            lessonNumber = lessonNumber + 1
                            return <tr>
                                <th>{lessonNumber}</th>
                                <td>Leçon du {changeDate(lesson.date)}</td>
                                <td>{lesson.duration}</td>
                                <td>{lesson.classe}</td>
                                <td>0/{lesson.maxStudent}</td>
                            </tr>
                        } else return ''
                    })}
                </tbody>
            </table>
        </div >
    )


    return (
        <div>
            {user.role === 'Professor' || user.role === 'Admin' ? professor : ''}
        </div>
    )
}