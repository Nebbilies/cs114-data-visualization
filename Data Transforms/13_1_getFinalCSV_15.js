const fs = require('fs');
const studentStats = JSON.parse(fs.readFileSync('./data/studentStats.json', 'utf8'));

function getDataCSV() {
    const headerNames = ['username', 'total_submissions', 'problem_tried', 'problem_solved', 'avg_completion_rate_delta', 'avg_inverse_solving_rate', 'avg_submissions_per_day', 'activity_span', 'percentage_submissions_night_hours', 'percentage_submissions_study_hours', 'submission_hour_variance', 'submission_efficiency', 'avg_attempts_per_problem', 'active_days',  'active_ratio', 'avg_assignment_score', 'qt','th','ck'];
    const header = ['username', 'totalSubmissions', 'problemTried', 'problemSolved', 'avgCompletionRateDelta', 'avgInverseSolvingRate', 'avgSubmissionsPerDay', 'activitySpan', 'percentageSubmissionsNightHours', 'percentageSubmissionsStudyHours', 'submissionHourVariance','submissionEfficiency', 'avgAttemptsPerProblem', 'activeDays', 'activeRatio', 'avgAssignmentScore', 'qt','th','ck'];
    let csv = [
        headerNames.join(','),
        ...studentStats.map(student => {
            if (Object.keys(student).includes('ck')) {
                return header.map(key => JSON.stringify(student[key])).join(',');
            }
        })
    ].join('\r\n');
    const csvLines = csv.split('\n').filter(line => line.trim() !== '');
    csv = csvLines.join('\n');
    fs.writeFileSync('./final/data_15.csv', csv, 'utf8');
}

function getInputCSV() {
    const headerNames = ['username', 'total_submissions', 'problem_tried', 'problem_solved', 'avg_completion_rate_delta', 'avg_inverse_solving_rate', 'avg_submissions_per_day', 'activity_span', 'percentage_submissions_night_hours', 'percentage_submissions_study_hours', 'submission_hour_variance', 'submission_efficiency', 'avg_attempts_per_problem', 'active_days',  'active_ratio', 'avg_assignment_score'];
    const header = ['username', 'totalSubmissions', 'problemTried', 'problemSolved', 'avgCompletionRateDelta', 'avgInverseSolvingRate', 'avgSubmissionsPerDay', 'activitySpan', 'percentageSubmissionsNightHours', 'percentageSubmissionsStudyHours', 'submissionHourVariance', 'submissionEfficiency', 'avgAttemptsPerProblem', 'activeDays', 'activeRatio', 'avgAssignmentScore'];
    let csv = [
        headerNames.join(','),
        ...studentStats.map(student => {
            if (!Object.keys(student).includes('ck')) {
                return header.map(key => JSON.stringify(student[key])).join(',');
            }
        })
    ].join('\r\n');
    const csvLines = csv.split('\n').filter(line => line.trim() !== '');
    csv = csvLines.join('\n');
    fs.writeFileSync('./final/input_15.csv', csv, 'utf8');
}

getDataCSV();
getInputCSV();
