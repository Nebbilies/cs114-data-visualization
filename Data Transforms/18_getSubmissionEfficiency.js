const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach(student => {
    const totalSubmissions = student.totalSubmissions || 0;
    const problemSolved = student.problemSolved || 0;
    const submissionEfficiency = totalSubmissions > 0 ? (problemSolved / totalSubmissions) * 100 : 0;
    student.submissionEfficiency = Math.round(submissionEfficiency * 100) / 100;
})

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');