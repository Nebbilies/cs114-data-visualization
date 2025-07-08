//higher -> more focused in certain hours
const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach(student => {
    const hours = student.hours || {};
    const sortedHours = Object.entries(hours)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);
    const topHoursSubmissions = sortedHours.reduce((sum, [hour, count]) => sum + count, 0);
    const totalSubmissions = student.totalSubmissions || 1;
    const focusIndex = Math.round((topHoursSubmissions / totalSubmissions) * 10000) / 100;
    student.focusIndex = focusIndex;
})

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');