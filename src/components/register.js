import axios from 'axios';

export default function register(lessonId, userId) {
    axios.get(`http://localhost:5000/api/lessons/${lessonId}`)
        .then(response => {
            if (response.data.registeredStudents.length < response.data.maxStudent) {
                if (response.data.registeredStudents.find(element => element === userId) === userId) {
                    console.log("User already registered")
                } else {
                    let updatedRegisteredStudents = [...response.data.registeredStudents, userId]

                    const lesson = {
                        registeredStudents: updatedRegisteredStudents
                    };
                    axios.put(`http://localhost:5000/api/lessons/update/${lessonId}`, lesson)
                        .then(res => console.log(res.data));
                }
            } else { return console.log('Maximum number of students reached') }
        });
}