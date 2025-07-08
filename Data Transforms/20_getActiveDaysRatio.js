const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach((student) => {
    const activeDays = Object.keys(student.dates).filter((key) => student.dates[key] > 0).length;
    const activitySpan = student.activitySpan || 1;
    student.activeDays = activeDays;
    student.activeRatio = Math.round((activeDays / activitySpan) * 10000) / 100;
})

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');