const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

function getWeekdayDistribution(dates) {
    const weekdays = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
    Object.entries(dates).forEach(([dateStr, count]) => {
        const [month, day] = dateStr.split('-').map(Number);
        const monthIndex = month - 1;
        const year = monthIndex >= 7 ? 2024 : 2025;
        const date = new Date(year, monthIndex, day);
        const weekday = date.getDay();
        weekdays[weekday] += count;
    });

    return weekdays;
}

studentStats.forEach(student => {
    const dates = student.dates || {};
    const weekdayDistribution = getWeekdayDistribution(dates);
    student.weekdayDistribution = weekdayDistribution;
    const weekendSubmissions = weekdayDistribution[0] + weekdayDistribution[6];
    const totalSubmissions = student.totalSubmissions;
    student.weekendSubmissionRatio = totalSubmissions > 0 ? Math.round((weekendSubmissions / totalSubmissions) * 10000) / 100 : 0;
})

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');

module.exports = {
    getWeekdayDistribution
}