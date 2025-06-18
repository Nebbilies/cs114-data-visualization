const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach((student) => {
    let totalSubmissions = 0;
    let totalDays = 0;
    const dates = Object.keys(student.dates || {});

    dates.forEach((date) => {
        if (student.dates[date] > 0) {
            totalSubmissions += student.dates[date];
            totalDays++;
        }
    });

    student.avgSubmissionsPerDay = totalDays > 0 ? (totalSubmissions / totalDays).toFixed(2) : 0;
})

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');