import React, { useEffect, useState, useRef } from 'react';
import classNames from "classnames/bind";
import Chart from 'chart.js/auto';
import styles from './Dashboard.module.scss'; // Adjust import path according to your project structure

const cx = classNames.bind(styles);

const Dashboard = () => {
    const [totalStudents, setTotalStudents] = useState(1000);
    const [studentsThisMonth, setStudentsThisMonth] = useState(50);
    const [totalTeachers, setTotalTeachers] = useState(50);
    const [studentStatistics, setStudentStatistics] = useState([
        { className: 'Class 1', count: 30 },
        { className: 'Class 2', count: 50 },
        { className: 'Class 3', count: 20 },
        { className: 'Class 4', count: 40 },
        { className: 'Class 5', count: 60 },
    ]);
    const [revenue, setRevenue] = useState([5000, 8000, 6000]);
    const [monthlyStudentChanges, setMonthlyStudentChanges] = useState([]);
    const [quarterlyStudentChanges, setQuarterlyStudentChanges] = useState([]);
    const [yearlyStudentChanges, setYearlyStudentChanges] = useState([]);
    const [timeRange, setTimeRange] = useState('month'); // State for time range selection
    const [startDate, setStartDate] = useState(null); // State for start date filter
    const [endDate, setEndDate] = useState(null); // State for end date filter

    const studentsLineChartRef = useRef(null);
    const revenueChartRef = useRef(null);

    // Function to generate fake data
    const generateFakeData = () => {
        let fakeData = {};

        // Fake data for students
        fakeData.totalStudents = 1200;
        fakeData.totalTeachers = 55;
        fakeData.studentsPerClass = [
            { class_name: 'Class 1', total_students: 30 },
            { class_name: 'Class 2', total_students: 50 },
            { class_name: 'Class 3', total_students: 20 },
            { class_name: 'Class 4', total_students: 40 },
            { class_name: 'Class 5', total_students: 60 },
        ];

        // Fake data for revenue
        switch (timeRange) {
            case 'month':
                fakeData.totalPaidSalary = 7000;
                fakeData.totalExpectedMoney = 9000;
                fakeData.totalCollectedMoney = 7500;
                break;
            case 'quarter':
                fakeData.totalPaidSalary = 21000; // Sum of 3 months
                fakeData.totalExpectedMoney = 27000; // Sum of 3 months
                fakeData.totalCollectedMoney = 22500; // Sum of 3 months
                break;
            case 'year':
                fakeData.totalPaidSalary = 84000; // Sum of 12 months
                fakeData.totalExpectedMoney = 108000; // Sum of 12 months
                fakeData.totalCollectedMoney = 90000; // Sum of 12 months
                break;
            default:
                fakeData.totalPaidSalary = 0;
                fakeData.totalExpectedMoney = 0;
                fakeData.totalCollectedMoney = 0;
                break;
        }

        // Fake data for student changes
        fakeData.monthlyStudentChanges = [
            { month: 'Jan', value: 100 },
            { month: 'Feb', value: 120 },
            { month: 'Mar', value: 90 },
            { month: 'Apr', value: 110 },
            { month: 'May', value: 130 },
            { month: 'Jun', value: 95 },
            { month: 'Jul', value: 105 },
            { month: 'Aug', value: 115 },
            { month: 'Sep', value: 85 },
            { month: 'Oct', value: 125 },
            { month: 'Nov', value: 135 },
            { month: 'Dec', value: 100 },
        ];

        fakeData.quarterlyStudentChanges = [
            { quarter: 'Q1', value: 310 },
            { quarter: 'Q2', value: 350 },
            { quarter: 'Q3', value: 320 },
            { quarter: 'Q4', value: 330 },
        ];

        fakeData.yearlyStudentChanges = [
            { year: 2020, value: 1200 },
            { year: 2021, value: 1300 },
            { year: 2022, value: 1400 },
            { year: 2023, value: 1500 },
            { year: 2024, value: 1600 },
        ];

        return fakeData;
    };

    // Function to handle fetching dashboard data based on time range and date filter
    const handleFetchDashboard = () => {
        const fakeData = generateFakeData();

        setTotalStudents(fakeData.totalStudents);
        setTotalTeachers(fakeData.totalTeachers);
        setStudentStatistics(fakeData.studentsPerClass.map((ele) => ({
            className: ele.class_name,
            count: ele.total_students
        })));
        setRevenue([
            fakeData.totalPaidSalary,
            fakeData.totalExpectedMoney,
            fakeData.totalCollectedMoney
        ]);

        // Update data based on selected time range
        switch (timeRange) {
            case 'month':
                setMonthlyStudentChanges(fakeData.monthlyStudentChanges);
                break;
            case 'quarter':
                setQuarterlyStudentChanges(fakeData.quarterlyStudentChanges);
                break;
            case 'year':
                setYearlyStudentChanges(fakeData.yearlyStudentChanges);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        handleFetchDashboard();
    }, [timeRange, startDate, endDate]); // Include startDate and endDate in dependency array

    // Effect to update charts whenever time range or financial data changes
    useEffect(() => {
        if (studentsLineChartRef.current) {
            studentsLineChartRef.current.destroy();
        }

        const ctx = document.getElementById('studentsLineChart').getContext('2d');
        studentsLineChartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: getTimeRangeData().map((item) => item.label),
                datasets: [{
                    label: 'Student Changes',
                    data: getTimeRangeData().map((item) => item.value),
                    fill: false,
                    borderColor: '#36a2eb',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: getTimeRangeTitle()
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Students'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `Number of Students: ${context.raw}`;
                            }
                        }
                    }
                }
            }
        });

        if (revenueChartRef.current) {
            revenueChartRef.current.destroy();
        }

        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        revenueChartRef.current = new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Paid to Teachers', 'Expected from Students', 'Collected from Students'],
                datasets: [{
                    label: 'Revenue',
                    data: [revenue[0], revenue[1], revenue[2]],
                    backgroundColor: ['#ffcd56', '#36a2eb', '#ff6384']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Revenue'
                    }
                }
            }
        });
    }, [timeRange, revenue, startDate, endDate]); // Include startDate and endDate in dependency array

    // Function to get data based on selected time range and date filter for the chart
    const getTimeRangeData = () => {
        let filteredData = [];

        // Filter data based on time range and date filter
        switch (timeRange) {
            case 'month':
                filteredData = monthlyStudentChanges.filter((item) => {
                    const month = item.month.toLowerCase();
                    const startDateMonth = startDate ? startDate.toLocaleString('default', { month: 'short' }).toLowerCase() : '';
                    const endDateMonth = endDate ? endDate.toLocaleString('default', { month: 'short' }).toLowerCase() : '';
                    return (!startDate || month >= startDateMonth) && (!endDate || month <= endDateMonth);
                }).map((item) => ({ label: item.month, value: item.value }));
                break;
            case 'quarter':
                filteredData = quarterlyStudentChanges.map((item) => ({ label: item.quarter, value: item.value }));
                break;
            case 'year':
                filteredData = yearlyStudentChanges.map((item) => ({ label: item.year.toString(), value: item.value }));
                break;
            default:
                break;
        }

        return filteredData;
    };

    // Function to get title based on selected time range for the chart
    const getTimeRangeTitle = () => {
        switch (timeRange) {
            case 'month':
                return 'Monthly Student Changes';
            case 'quarter':
                return 'Quarterly Student Changes';
            case 'year':
                return 'Yearly Student Changes';
            default:
                return 'Student Changes';
        }
    };

    // Function to handle time range change
    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
    };

    // Function to handle start date change
    const handleStartDateChange = (event) => {
        const date = new Date(event.target.value);
        setStartDate(date);
    };

    // Function to handle end date change
    const handleEndDateChange = (event) => {
        const date = new Date(event.target.value);
        setEndDate(date);
    };

    return (
        <div className={cx('dashboard')}>
            <h1>Dashboard</h1>

            <div className={cx('top-row')}>
                <div className={cx('info-box')}>
                    <h2>Total Students</h2>
                    <p>{totalStudents}</p>
                </div>
                <div className={cx('info-box')}>
                    <h2>Students This Month</h2>
                    <p>{studentsThisMonth}</p>
                </div>
                <div className={cx('info-box')}>
                    <h2>Total Teachers</h2>
                    <p>{totalTeachers}</p>
                </div>
            </div>
            <div className={cx('controls')}>
                <h2>Time Range</h2>
                <button className={cx('time-button', { active: timeRange === 'month' })} onClick={() => handleTimeRangeChange('month')}>Month</button>
                <button className={cx('time-button', { active: timeRange === 'quarter' })} onClick={() => handleTimeRangeChange('quarter')}>Quarter</button>
                <button className={cx('time-button', { active: timeRange === 'year' })} onClick={() => handleTimeRangeChange('year')}>Year</button>
            </div>

            {/* Date range filter */}
            {timeRange === 'month' && (
                <div className={cx('date-range')}>
                    <label>Start Date:</label>
                    <input type="date" onChange={handleStartDateChange} />
                    <label>End Date:</label>
                    <input type="date" onChange={handleEndDateChange} />
                </div>
            )}

            <div className={cx('chart-container')}>
                <div className={cx('chart')}>
                    <canvas id="studentsLineChart" />
                </div>
                <div className={cx('chart')}>
                    <canvas id="revenueChart" />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
