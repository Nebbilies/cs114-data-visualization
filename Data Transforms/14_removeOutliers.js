const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach((student, index) => {
    if (student.th) {
        if (student.totalSubmissions < Math.floor(student.th * 10)) {
            studentStats.splice(index, 1);
        }
    }
})

fs.writeFileSync('./data/studentStats_1.json', JSON.stringify(studentStats, null, 2), 'utf8');