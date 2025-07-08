const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach((student) => {
    let activitySpan = 0;
    const dates = Object.keys(student.dates);

    if (dates.length > 0) {
        const firstMonth = dates[0].split('-')[0];
        const firstDay = dates[0].split('-')[1];
        let firstYear = 2024;
        if (firstMonth <= 6) {
            firstYear = 2025;
        }
        const firstDate = new Date (firstYear, firstMonth - 1, firstDay);
        const lastMonth = dates[dates.length - 1].split('-')[0];
        const lastDay = dates[dates.length - 1].split('-')[1];
        let lastYear = 2024;
        if (lastMonth <= 6) {
            lastYear = 2025;
        }
        const lastDate = new Date (lastYear, lastMonth - 1, parseInt(lastDay));
        activitySpan = Math.round((lastDate - firstDate) / (1000 * 60 * 60 * 24));
    }

    student.activitySpan = activitySpan;
})

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');

