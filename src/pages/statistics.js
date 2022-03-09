import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BsDownload } from 'react-icons/bs';
import changeDate from '../components/change-date';

export default function SubjectsManager() {
    const user = useSelector(state => state.user.userInfo);
    const [lessons, setLessons] = useState([]);
    const [professors, setProfessors] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        console.log("useEffect")
        axios.get('http://localhost:5000/api/professors/')
            .then(response => {
                setProfessors(response.data.map(professor => professor))
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://localhost:5000/api/students/')
            .then(response => {
                setStudents(response.data.map(student => student))
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get('http://localhost:5000/api/lessons/')
            .then(response => {
                setLessons(response.data.map(lesson => lesson))
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    function objectToArray(objectTable) {
        return objectTable.map(lesson => {
            var subject = lesson.subject.normalize("NFD").replace(/\p{Diacritic}/gu, "")
            return [changeDate(lesson.date).props.children,
            findProfessorName(lesson.professorId),
                subject,
            lesson.duration + 'min',
            lesson.classe,
            lesson.registeredStudents.length + '/' + lesson.maxStudent + ': ' + findStudentsName(lesson.registeredStudents).map(name => { return ' ' + name })]
        })
    }

    function findProfessorName(professorId) {
        var professorObject = professors.find(professor => professor._id === professorId)
        if (professorObject === undefined) {
            return 'Admin'
        } else {
            return professorObject.firstName + ' ' + professorObject.lastName
        }
    }

    function findStudentsName(registeredStudents) {
        let names = []
        registeredStudents.forEach(registeredStudent => {
            var studentObject = students.find(student => student._id === registeredStudent)
            if (studentObject === undefined) {
                names = [...names, 'Admin']
            } else {
                names = [...names, studentObject.firstName.normalize("NFD").replace(/\p{Diacritic}/gu, "") + ' ' + studentObject.lastName.normalize("NFD").replace(/\p{Diacritic}/gu, "")]
            }
        })
        return names
    }

    function compare(a, b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    }

    function downloadCSV() {
        lessons.sort(compare)
        let data = objectToArray(lessons)
        var csvContent = "data:text/csv;charset=utf-8, Date;Professeur;Matiere;Duree;Classe;Eleves inscrits\n" + data.map(e => e.join(";")).join("\n")
        var encodedUri = encodeURI(csvContent)
        document.getElementById('downloadLink').href = encodedUri
        document.getElementById('downloadLink').download = "statistiques_AP.csv"
    }

    if (!user) return null

    return (
        <div className="box">
            <a id="downloadLink" href="none">
                <button id="downloadButton" onClick={downloadCSV}>
                    <BsDownload />
                    <span>TÉLÉCHARGER</span>
                </button>
            </a>
        </div>
    );
}