const fs = require('fs');

const studentProblemSolved = JSON.parse(fs.readFileSync('./data/studentProblemSolved.json', 'utf8'));
const problemDetails = JSON.parse(fs.readFileSync('./data/problemDetails.json', 'utf8'));
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach(student => {
    const username = student.username;
    const problemsSolvedDetails = studentProblemSolved.find(s => s.username === username).problemsSolvedDetails;
    let sumInverseSolvingRate = 0;
    let count = 0;
    problemsSolvedDetails.forEach(problemId => {
        const problemInfo = problemDetails[problemId];
        if (problemInfo.studentsTried > 25) {
            const inverseSolvingRate = 100 - problemInfo.solvedRate;
            sumInverseSolvingRate += inverseSolvingRate;
            count++;
        }
    });
    student.avgInverseSolvingRate = count > 0 ? (sumInverseSolvingRate / count) : 0;
})

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');