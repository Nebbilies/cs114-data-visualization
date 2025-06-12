const fs = require ('fs');
const studentDates = JSON.parse(fs.readFileSync('./data/studentStatsWithDates.json', 'utf8'));

let maxCount = 0;
studentDates.forEach(student => {
    student.dates.forEach(d => {
        if (d.count > maxCount) {
            maxCount = d.count;
        }
    })
})

console.log(maxCount) //178