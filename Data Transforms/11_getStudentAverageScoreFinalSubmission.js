const fs = require('fs');
const studentData =  JSON.parse(fs.readFileSync('./data/students.json', 'utf8'));
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach(student => {
    let problems = new Set();
    let sumScore = 0;
    const username = student.username;

    studentData.forEach(submission => {
        if (submission.username === username && submission.isFinal === "1") {
            if (!problems.has(submission.problemId)) {
                problems.add(submission.problemId);
                sumScore += submission.preScore;
            }
        }
    });
    student.avgScoreFinalSubmission = problems.size > 0 ? (Math.round((sumScore / problems.size) * 1000) / 1000) : 0;
})

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');