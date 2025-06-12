const fs = require('fs');
const students = JSON.parse(fs.readFileSync('./data/students.json', 'utf8'));
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

function getStudentDatesHours(student) {
    let dates = {};
    let hours = {};
    students.forEach(row => {
        if (row.username === student.username) {
            const date = row.date
            const hour = row.hour

            if (!dates[date]) {
                dates[date] = 0;
            }
            dates[date]++;

            if (!hours[hour]) {
                hours[hour] = 0;
            }
            hours[hour]++;
        }
    });
    student.dates = dates;
    student.hours = hours;
}

function getAllStudentsDatesHours() {
    studentStats.forEach(student => {
        getStudentDatesHours(student);
    });
    fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2));
}

getAllStudentsDatesHours();