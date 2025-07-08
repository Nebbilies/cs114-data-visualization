const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

studentStats.forEach((student) => {
    let hourData = Array(24).fill(0);
    Object.entries(student.hours).forEach(([key, value]) => {
        for (let i = 0; i < value; i++) {
            hourData.push((parseInt(key, 10) + 7) % 24);
        }
    });
    if (hourData.length === 0) {
        student.submissionHourVariance = 0;
        return;
    }
    const mean = hourData.reduce((sum, val) => sum + val, 0) / hourData.length;
    const variance = hourData.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / hourData.length;
    student.submissionHourVariance = Math.round(variance * 100) / 100;
});

fs.writeFileSync('./data/studentStats.json', JSON.stringify(studentStats, null, 2), 'utf8');