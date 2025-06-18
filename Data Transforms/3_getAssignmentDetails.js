const fs = require('fs');

const students = JSON.parse(fs.readFileSync('./data/students.json', 'utf8'));
const studentsStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

function getAssignmentDetails() {
    let assignmentDetails = {};
    students.forEach(student => {
        if (!assignmentDetails[student.assignmentId]) {
            assignmentDetails[student.assignmentId] = [];
        }
        if (!assignmentDetails[student.assignmentId].includes(student.problemId)) {
            assignmentDetails[student.assignmentId].push(student.problemId);
        }
    });
    return Object.entries(assignmentDetails).map(([assignmentId, problems]) => {
        return {
            assignmentId: assignmentId,
            problems: problems,
            totalProblems: problems.length,
            totalStudents: studentsStats.filter(student => student.assignmentDetails && student.assignmentDetails.assignments[assignmentId]).length
        };
    });
}

fs.writeFileSync('./data/assignmentDetails.json', JSON.stringify(getAssignmentDetails(), null, 2));