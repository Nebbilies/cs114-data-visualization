const fs = require('fs');

const students = JSON.parse(fs.readFileSync('./data/students.json', 'utf8'));
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

function countProblemTriesSolves(student) {
    let totalSubmissions = 0;
    const problemTriesStats = {};
    students.forEach(row => {
        if (row.username === student.username) {
            totalSubmissions++;
            if (!problemTriesStats[row.problemId]) {
                problemTriesStats[row.problemId] = 0;
            }
            if (row.preScore === 10000) {
                problemTriesStats[row.problemId] = 1;
            }
        }
    });
    const tries = Object.keys(problemTriesStats).length;
    const solves = Object.values(problemTriesStats).reduce((total, val) => total + val, 0);
    student.problemTried = tries;
    student.problemSolved = solves;
    student.totalSubmissions = totalSubmissions;
}

function getStudentProblemStats() {
    studentStats.forEach(student => {
        countProblemTriesSolves(student);
    });
    fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2));
}

getStudentProblemStats()

function calculateStats() {

}