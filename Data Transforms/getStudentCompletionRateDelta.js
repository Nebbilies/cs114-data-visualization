const fs = require('fs');

const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));
const assignmentStats = JSON.parse(fs.readFileSync('./data/assignmentAvgCompletionRates.json', 'utf8'));

studentStats.forEach(student => {
    let sum = 0;
    let avg = 0;
    const username = student.username;
    const studentAssignments =  student.assignmentDetails.assignments;
    Object.entries(studentAssignments).forEach(([assignment, details]) => {
      sum += details.percentageSolved - assignmentStats[assignment].avgCompletionRate;
    })
    if (Object.keys(studentAssignments).length > 0) {
        avg = sum / Object.keys(studentAssignments).length;
    }
    student.totalCompletionRateDelta = sum;
    student.avgCompletionRateDelta = Math.round(avg * 1000) / 1000;
})

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');