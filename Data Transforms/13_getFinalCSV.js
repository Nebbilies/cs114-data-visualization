const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

function getDataCSV() {
    const headerNames = ['username', 'total_submissions', 'problem_tried', 'problem_solved', 'avg_completion_rate_delta', 'avg_inverse_solving_rate','qt','th','ck'];
    const header = ['username', 'totalSubmissions', 'problemTried', 'problemSolved', 'avgCompletionRateDelta', 'avgInverseSolvingRate','qt','th','ck'];
    let csv = [
        headerNames.join(','),
        ...studentStats.map(student => {
            if (Object.keys(student).includes('ck')) {
                return header.map(key => JSON.stringify(student[key])).join(',');
            }
        })
    ].join('\r\n');
    const csvLines = csv.split('\n').filter(line => line.trim() !== '');
    csv = csvLines.join('\n');
    fs.writeFileSync('./final/data.csv', csv, 'utf8');
}

function getInputCSV() {
    const headerNames = ['username', 'total_submissions', 'problem_tried', 'problem_solved', 'avg_completion_rate_delta', 'avg_inverse_solving_rate'];
    const header = ['username', 'totalSubmissions', 'problemTried', 'problemSolved', 'avgCompletionRateDelta', 'avgInverseSolvingRate'];
    let csv = [
        headerNames.join(','),
        ...studentStats.map(student => {
            if (!Object.keys(student).includes('ck')) {
                return header.map(key => JSON.stringify(student[key])).join(',');
            }
        })
    ].join('\r\n');
    const csvLines = csv.split('\n').filter(line => line.trim() !== '');
    csv = csvLines.join('\n');
    fs.writeFileSync('./final/input.csv', csv, 'utf8');
}

getDataCSV();
getInputCSV();
