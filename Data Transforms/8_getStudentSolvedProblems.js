const fs = require('fs');
const studentData = JSON.parse(fs.readFileSync('./data/students.json', 'utf8'));
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));
const studentProblemSolved = [];

studentStats.forEach(student => {
    let problemSolvedDetails = [];
    const username = student.username;
    studentData.forEach(submission => {
        if (submission.username === username && submission.preScore === 10000) {
            if (!problemSolvedDetails.includes(submission.problemId))
                problemSolvedDetails.push(submission.problemId);
        }
    })
    studentProblemSolved.push({
        username: username,
        problemsSolved: problemSolvedDetails.length,
        problemsSolvedDetails: problemSolvedDetails
    });
})

fs.writeFileSync('./data/studentProblemSolved.json', JSON.stringify(studentProblemSolved, null, 2), 'utf8');

