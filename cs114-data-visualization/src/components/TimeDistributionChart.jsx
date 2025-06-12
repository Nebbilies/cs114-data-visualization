import {Chart as ReactChartJs} from "react-chartjs-2";
import {useState, useEffect} from "react";

function TimeDistributionChart({student}) {
    const hoursDistribution = Array(24).fill(0);
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
                        callback: (value) => value,
                        color: '#b5b5b5',
                        font: {
                            size: 14,
                        }
                    }
                },
                x: {
                    ticks: {
                        color: '#b5b5b5',
                        font: {
                            size: 14,
                        }
                    }
                }
            }
        }
    }
    useEffect(() => {
        const hour = student.hours;
        if (!hour) return;
        hoursDistribution.forEach((value, index) => {
            hoursDistribution[(index + 7) % 24] = hour[(index)] || 0;
        })
        setChartData({
            labels: Array.from({length: 24}, (_, i) => `${i}:00`),
            datasets: [
                {
                    label: '# of Submissions',
                    data: hoursDistribution,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }
            ]
        })
    },[student])
    return (
        <>
            {chartData && (
                <div
                    className={'flex flex-col items-center justify-center w-1/2 p-3 border-1 border-[#414141] rounded-lg p-4 bg-[#2A2A2A] mt-6'}>
                    <h2 className={'text-2xl font-semibold text-green-300'}>Time Distribution Stats</h2>
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

export default TimeDistributionChart;