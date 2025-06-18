import Select from "react-select";
import {useState, useMemo, lazy} from "react";

import studentStats from "../../../Data Transforms/data/studentStats_1.json";
import assignmentStats from "../../../Data Transforms/data/assignmentAvgCompletionRates.json";
import TimeDistributionChart from "./TimeDistributionChart.jsx";
import DateHeatmap from "./DateHeatmap.jsx";
import GlobalStats from "./GlobalStats.jsx";

const AssignmentCompletionChart = lazy(() => import('./AssignmentCompletionChart.jsx'));

const studentSelectStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: '#1A1A1A',
        borderColor: '#414141',
        padding: '0.125rem',
        color: 'white'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white'
    }),
    input: (provided) => ({
        ...provided,
        color: 'white'
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#1A1A1A',
        color: 'white',
        fontWeight: 'semibold',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#414141' : '#1A1A1A',
        color: 'white',
        fontWeight: 'semibold',
    }),
}

const studentOptions = [];

function getStudentOptions() {
    studentStats.forEach(student => {
        if (student.ck) {
            studentOptions.push({
                value: student.username,
                label: student.username + ' - CK: ' + student.ck,
                sort: student.ck
            });
        }
    })
    studentOptions.sort((a, b) => b.sort - a.sort);
}

function StudentStats() {
    const [studentUsername, setStudentUsername] = useState('');
    const filteredStudentStats = studentStats.filter(student => student.ck);
    useMemo(
        () => {
            if (studentOptions.length === 0) {
                getStudentOptions();
            }
        }, [studentOptions]
    );

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            setStudentUsername(selectedOption.value);
        } else {
            setStudentUsername('');
        }
        console.log('Selected student:', studentUsername);
    }
    return (
        <>
        <main className='mx-20 border-1 flex flex-col mt-30 p-4 max-h-auto border-[#414141] rounded-lg bg-[#1A1A1A]'>
            <div className={'selector w-full h-full flex flex-col items-center justify-center'}>
                <h1 className='text-4xl text-white mb-4'>Student Statistics</h1>
                <div className='w-1/2 mb-4'>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        value={studentOptions.find(option => option.value === studentUsername) || null}
                        onChange={handleChange}
                        isClearable={true}
                        isSearchable={true}
                        name="color"
                        styles={studentSelectStyles}
                        options={studentOptions}
                    />
                </div>
            </div>
            {studentUsername === '' ? (
                <div
                    className={'w-full text-4xl opacity-50 font-bold text-center mt-4 flex items-center justify-center'}>
                    Select a student to view their statistics
                </div>
            ) : (
                <div className={'w-full text-2xl text-white mt-4 flex items-center justify-center h-auto'}>
                    <div className='flex flex-col items-center w-full'>
                        <h2 className='text-3xl mb-2'>Statistics for {studentUsername}</h2>
                        <div className='text-lg w-full'>
                            {/* Here you can display the statistics for the selected student */}
                            {/* For example, you can fetch and display data from studentStats based on studentUsername */}
                            {studentStats.filter(student => student.username === studentUsername).map((student, index) => (
                                <div className={'stats-container flex justify-center items-center flex-col mt-4 mx-20'}
                                     key={index}>
                                    <div className={'overall-stats flex gap-15 w-full justify-between'}>
                                        <div
                                            className={'flex flex-col items-center justify-center w-1/2 border-1 border-[#414141] rounded-lg p-4 bg-[#2A2A2A]'}>
                                            <h3 className={'text-2xl font-semibold text-green-300'}>Scores</h3>
                                            <div
                                                className="grid grid-cols-3 grid-rows-2 bg-[#3A3A3A] rounded-lg overflow-hidden border border-[#444] w-full justify-items-center mt-4">
                                                <div
                                                    className="py-2 text-2xl font-bold text-white border-b border-r border-[#444] w-full text-center">
                                                    QT
                                                </div>
                                                <div
                                                    className="py-2 text-2xl font-bold text-white border-b border-r border-[#444] w-full text-center">
                                                    TH
                                                </div>
                                                <div
                                                    className="py-2 text-2xl font-bold text-white border-b border-[#444] w-full text-center">
                                                    CK
                                                </div>
                                                <div
                                                    className="py-2 text-2xl text-white border-r border-[#444] w-full text-center">{student.qt}</div>
                                                <div
                                                    className="py-2 text-2xl text-white border-r border-[#444] w-full text-center">{student.th}</div>
                                                <div
                                                    className="py-2 text-2xl text-white w-full text-center">{student.ck}</div>
                                            </div>
                                        </div>
                                        <div
                                            className={'flex flex-col items-center justify-center w-1/2 border-1 border-[#414141] rounded-lg p-4 bg-[#2A2A2A]'}>
                                            <h3 className={'text-2xl font-semibold text-green-300'}>Overall Stats</h3>
                                            <div
                                                className="grid grid-cols-3 grid-rows-2 bg-[#3A3A3A] rounded-lg overflow-hidden border border-[#444] w-full justify-items-center place-items-center mt-4">
                                                <div
                                                    className="py-2 text-xl font-bold text-white border-b border-r border-[#444] w-full text-center">
                                                    Total Submissions
                                                </div>
                                                <div
                                                    className="py-2 text-xl font-bold text-white border-b border-r border-[#444] w-full text-center">
                                                    Problems Tried
                                                </div>
                                                <div
                                                    className="py-2 text-xl font-bold text-white border-b border-[#444] w-full text-center">
                                                    Problems Solved
                                                </div>
                                                <div
                                                    className="py-2 text-2xl text-white border-r border-[#444] w-full text-center">{student.totalSubmissions}</div>
                                                <div
                                                    className="py-2 text-2xl text-white border-r border-[#444] w-full text-center">{student.problemTried}</div>
                                                <div
                                                    className="py-2 text-2xl text-white w-full text-center">{student.problemSolved}</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className={'graph-stats flex gap-15 w-full justify-between'}>
                                        <AssignmentCompletionChart student={student} assignmentStats={assignmentStats}/>
                                        <TimeDistributionChart student={student}/>
                                    </div>
                                    <div className={'w-full'}>
                                        <DateHeatmap username={student.username}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>

                <GlobalStats studentStats={filteredStudentStats}/>

        </>
    );
}

export default StudentStats;