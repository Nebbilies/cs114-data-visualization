const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

function getAssignmentAvgCompletionRate(assignmentId) {
    let totalCompletionRate = 0;
    let totalStudents = 0;

    studentStats.forEach(student => {
        if (student.assignmentDetails && student.assignmentDetails.assignments[assignmentId]) {
            const assignment = student.assignmentDetails.assignments[assignmentId];
            totalCompletionRate += assignment.percentageSolved;
            totalStudents++;
        }
    });

    if (totalStudents === 0) {
        return 0;
    }

    return totalCompletionRate / totalStudents;
}

const allAssignments = {};
const assignmentDetails = JSON.parse(fs.readFileSync('./data/assignmentDetails.json', 'utf8'));
assignmentDetails.forEach(assignment => {
    allAssignments[assignment.assignmentId] = {
        assignmentId: assignment.assignmentId,
        avgCompletionRate: getAssignmentAvgCompletionRate(assignment.assignmentId),
        totalProblems: assignment.totalProblems,
        totalStudents: assignment.totalStudents
    };
});

fs.writeFileSync('./data/assignmentAvgCompletionRates.json', JSON.stringify(allAssignments, null, 2));