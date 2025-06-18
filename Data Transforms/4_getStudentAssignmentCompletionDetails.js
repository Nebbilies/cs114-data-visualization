const { readFileSync, writeFileSync } = require('fs');
const students = JSON.parse(readFileSync('./data/students.json', 'utf8'));
const studentStats = JSON.parse(readFileSync('./data/studentStats.json', 'utf8'));
const assignmentDetails = JSON.parse(readFileSync('./data/assignmentDetails.json', 'utf8'));

function getStudentAssignmentCompletionDetails(student) {
    let assignments = {};
    let problems = [];
    students.forEach(row => {
        // '1bec7c0b6a9bd8f556a8554c5012dcb778460bac' is prob a practice assignment (README.md)
        if (row.assignmentId !== '1bec7c0b6a9bd8f556a8554c5012dcb778460bac') {
            if (row.username === student.username) {
                if (!assignments[row.assignmentId]) {
                    assignments[row.assignmentId] = {
                        problemsSolved: 0,
                        percentageSolved: 0,
                    }
                }
                currentAssignment = assignments[row.assignmentId];
                if (row.preScore === 10000 && !problems.includes(row.problemId)) {
                    currentAssignment.problemsSolved++
                    problems.push(row.problemId);
                }
            }
        }

    })
    Object.keys(assignments).forEach(assignmentId => {
        const assignment = assignments[assignmentId];
        assignment.percentageSolved = (assignment.problemsSolved / assignmentDetails.find(a => a.assignmentId === assignmentId).totalProblems) * 100;
    });
    student.assignmentDetails = {
        assignments: assignments,
        participatedAssignments: Object.keys(assignments).length,
    }
}

function getAllStudentsAssignmentCompletionDetails() {
    studentStats.forEach(student => {
        getStudentAssignmentCompletionDetails(student);
    });
    writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2));
}

getAllStudentsAssignmentCompletionDetails();