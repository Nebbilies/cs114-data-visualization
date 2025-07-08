const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach((student) => {
    let hoursCount = 0;
    let nightHoursCount = 0;
    let studyHoursCount = 0;

    Object.entries(student.hours).forEach(([key, value]) => {
        if (value > 0) {
            const hour = (parseInt(key, 10) + 7) % 24;
            if ((hour >= 0 && hour <= 6) || (hour === 23)) {
                nightHoursCount += value;
            }
            if ((hour >= 7 && hour <= 11) || (hour >= 13 && hour <= 17)) {
                studyHoursCount += value;
            }
            hoursCount += value;
        }

    })
    student.percentageSubmissionsNightHours = Math.round((nightHoursCount / hoursCount) * 10000) / 100;
    student.percentageSubmissionsStudyHours = Math.round((studyHoursCount / hoursCount) * 10000) / 100;
});

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');