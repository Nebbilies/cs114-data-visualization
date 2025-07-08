const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach((student) => {
    const assignments = Object.values(student.assignmentDetails.assignments);
    const completedAssignments = assignments.filter(assignment => assignment.percentageSolved >= 100);
    const totalAssignments = assignments.length || 1;
    const completionRate = Math.round((completedAssignments.length / totalAssignments) * 10000) / 100;
    student.assignmentCompletionRate = completionRate;
});

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');