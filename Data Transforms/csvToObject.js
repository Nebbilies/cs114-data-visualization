const fs = require('fs');
const csv = require('csv-parser');

let json = [];
let studentData = [];
const students = JSON.parse(fs.readFileSync('./data/students.json', 'utf8'));
function rawToJson() {
    return new Promise((resolve, reject) => {
        fs.createReadStream('./raw/annonimized.csv')
            .pipe(csv({
                mapHeaders: ({ header, index }) => {
                    switch (index) {
                        case 0:
                            return 'assignmentId';
                        case 1:
                            return 'problemId';
                        case 2:
                            return 'username';
                        case 3:
                            return null; // isFinal
                        case 4:
                            return null; // status
                        case 5:
                            return 'preScore';
                        case 6:
                            return 'coefficient';
                        case 7:
                            return null; //languageId
                        case 8:
                            return 'date';
                        case 9:
                            return null
                        case 10:
                            return 'judgement';
                    }
                }
            }))
            .on('data', (row) => {
                if (row.date) {
                    const parts = row.date.split(' ');
                    if (parts.length === 2) {
                        row.hour = parseInt(parts[1].split(':')[0]);
                        row.date = parts[0];
                    }
                }
                row.preScore = parseFloat(row.preScore);
                row.coefficient = parseFloat(row.coefficient);
                try {
                    row.judgement = JSON.parse(row.judgement);
                } catch (e) {
                    console.error(e);
                }
                if (!studentData.some(student => student.username === row.username)) {
                    studentData.push({
                        username: row.username,
                    });
                }
                json.push(row);
            })
            .on('end', () => {
                console.log(`Total: ${json.length} rows`);
                fs.writeFileSync('./data/students.json', JSON.stringify(json, null, 2));
                fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentData, null, 2));
                resolve(json);
            })
    })
}

function totalStats() {
    let assignmentIds = [];
    let problemIds = [];
    students.forEach(student => {
        if (student.assignmentId && !assignmentIds.includes(student.assignmentId)) {
            assignmentIds.push(student.assignmentId);
        }
        if (student.problemId && !problemIds.includes(student.problemId)) {
            problemIds.push(student.problemId);
        }
    })
    console.log('Total assignments: ', assignmentIds.length);
    console.log('Total problems: ', problemIds.length);
}

const main = async () => {
    try {
        await rawToJson();
        // totalStats();
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

main();



