const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach((student) => {
    student.problemSolvedRate = student.problemTried > 0 ? Math.round((student.problemSolved / student.problemTried) * 10000) / 100 : 0;
});

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');