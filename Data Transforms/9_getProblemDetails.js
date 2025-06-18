const fs = require('fs');

const submissionData = JSON.parse(fs.readFileSync('./data/students.json', 'utf8'));
const studentProblemSolved = JSON.parse(fs.readFileSync('./data/studentProblemSolved.json', 'utf8'));

function getAllProblems() {
    const allProblems = new Set();
    submissionData.forEach((submission) => {
        if (submission.problemId) {
            allProblems.add(submission.problemId);
        }
    })
    return Array.from(allProblems);
}

function getProblemDetails(problem) {
    const problemDetails = {
        studentsTried: 0,
        studentsSolved: 0,
        totalSubmissions: 0,
        avgSubmissionsToSolve: 0,
        solvedRate: 0,
    }
    let triedStudents = [];
    submissionData.forEach((submission) => {
        if (submission.problemId === problem) {
            problemDetails.totalSubmissions++;
            if (!triedStudents.includes(submission.username)) {
                triedStudents.push(submission.username);
                problemDetails.studentsTried++;
            }
        }
    });
    studentProblemSolved.forEach(student => {
        if (student.problemsSolvedDetails.includes(problem)) {
            problemDetails.studentsSolved++;
        }
    })
    if (problemDetails.studentsSolved > 0) {
        problemDetails.avgSubmissionsToSolve = Math.round(problemDetails.totalSubmissions / problemDetails.studentsSolved * 1000) / 1000;
        problemDetails.solvedRate = Math.round((problemDetails.studentsSolved / problemDetails.studentsTried) * 10000) / 100;
    }
    return problemDetails;
}

function main() {
    const allProblems = getAllProblems();
    const problemDetails = {};
    allProblems.forEach(problem => {
        problemDetails[problem] = getProblemDetails(problem);
    });
    fs.writeFileSync('./data/problemDetails.json', JSON.stringify(problemDetails, null, 2), 'utf8');
}

main();