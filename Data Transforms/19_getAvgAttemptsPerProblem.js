const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach(student => {
    const totalSubmissions = student.totalSubmissions || 0;
    const problemTried = student.problemTried || 0;
    const avgAttemptsPerProblem = problemTried > 0 ? (totalSubmissions / problemTried) : 0;
    student.avgAttemptsPerProblem = Math.round(avgAttemptsPerProblem * 100) / 100;
})

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');