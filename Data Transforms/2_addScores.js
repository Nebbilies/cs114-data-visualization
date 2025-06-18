const csv = require("csv-parser");
const fs = require("fs");
const studentStats = require("./data/studentStats.json");

function addScores(filePath, headerName, rawHeaderName) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const matchingStudent = studentStats.find(student => student.username === row.hash);
                if (matchingStudent) {
                    matchingStudent[headerName] = parseFloat(row[rawHeaderName]);
                }
            })
            .on('end', () => {
                console.log(`Added scores from ${filePath}`);
                resolve();
            })
    })
}

async function getScores() {
    try {
        await addScores('./raw/ck-public.csv', 'ck', 'CK');
        await addScores('./raw/qt-public.csv', 'qt', 'diemqt');
        await addScores('./raw/th-public.csv', 'th', 'TH');
        fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2));
    } catch (error) {
        console.error('Error adding scores:', error);
    }
}

getScores()


