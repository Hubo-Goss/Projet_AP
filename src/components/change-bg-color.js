export default function changeBgColor(lesson) {
    var date = new Date();
    if (lesson.registeredStudents.length === lesson.maxStudent || new Date(lesson.date) < new Date(date)) {
        return "grey"
    } else {
        switch (lesson.subject) {
            case 'Français':
                return "blue";
            case 'Mathématiques':
                return "orange";
            case 'Histoire':
                return "green";
            case 'Géographie':
                return "lightblue";
            case 'Anglais':
                return "pink";
            case 'Espagnol':
                return ""
            case 'Italien':
                return "";
            case 'Allemand':
                return "";
            case 'Géométrie':
                return "purple";
            default:
                return "";
        }
    }
}