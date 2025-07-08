const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach(student => {
    const assignmentScores = Object.values(student.assignmentDetails.assignments).map(assignment => assignment.percentageSolved || 0);
    if (assignmentScores.length === 0) {
        student.avgAssignmentScore = 0;
        student.assignmentScoreVariance = 0;
        return;
    }
    const mean = assignmentScores.reduce((sum, score) => sum + score, 0) / assignmentScores.length;
    const variance = assignmentScores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / assignmentScores.length;
    student.avgAssignmentScore = Math.round(mean * 100) / 100;
    student.assignmentScoreVariance = Math.round(variance * 100) / 100;
})

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');