const fs = require('fs');

const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));
studentStats.forEach((student) => {
    const dateArr = [];
    Object.entries(student.dates).forEach(([date, count]) => {
        const [month, day] = date.split('-');
        const  year = 2024;
        dateArr.push({
            date: new Date(year, month - 1, day),
            count: count
        });
    })
    student.dates = dateArr;
    delete student.hours;
    delete student.assignmentDetails;
    delete student.ck;
    delete student.th;
    delete student.qt;
    delete student.totalSubmissions;
    delete student.problemSolved;
    delete student.problemTried;
})

fs.writeFileSync('./data/studentStatsWithDates.json', JSON.stringify(studentStats, null, 2), 'utf8')