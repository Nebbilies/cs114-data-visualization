import {Chart as ReactChartJs} from 'react-chartjs-2';
import {useState, useEffect} from "react";

function AssignmentCompletionChart({student, assignmentStats}) {
    const [chartData, setChartData] = useState(null);
    const chartOptions = {
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    display: true,
                    labels: {
                        font: {
                            size: 16,
                            family: 'Torus Pro',
                        },
                        color: 'white',
                    }
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => value + '%',
                        color: '#b5b5b5',
                        font: {
                            size: 14,
                        }
                    }
                },
            }
        }
    }
    useEffect(() => {
        if (!student || !assignmentStats) return;

        const studentAssignmentLabels = Object.keys(student.assignmentDetails.assignments);
        const studentCompletionRate = studentAssignmentLabels.map(label => student.assignmentDetails.assignments[label].percentageSolved);
        const avgCompletionRate = studentAssignmentLabels.map(label => assignmentStats[label].avgCompletionRate);
        const truncatedLabels = studentAssignmentLabels.map(label => label.length > 10 ? label.substring(0, 10) + '...' : label);
        setChartData({
            labels: truncatedLabels,
            datasets: [
                {
                    label: 'Student Completion Rate',
                    data: studentCompletionRate,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Average Completion Rate',
                    data: avgCompletionRate,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderWidth: 1
                }
            ]
        });
    }, [student, assignmentStats]);
    return (
        <>
            {chartData && (
                <div
                    className={'flex flex-col items-center justify-center w-1/2 p-3 border-1 border-[#414141] rounded-lg p-4 bg-[#2A2A2A] mt-6'}>
                    <h2 className={'text-2xl font-semibold text-green-300'}>Assignment Completion
                        Stats</h2>
                    <ReactChartJs
                        type='bar'
                        data={chartData}
                        options={chartOptions.options}
                        className={'mt-12 h-auto'}
                    />
                </div>
            )}
        </>
    )
}

export default AssignmentCompletionChart;