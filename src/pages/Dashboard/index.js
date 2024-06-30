import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import Chart from 'chart.js/auto'; // Importing 'chart.js/auto' to utilize the new modular version
import styles from './Dashboard.module.scss';
import 'chartjs-adapter-date-fns'; // Importing 'chartjs-adapter-date-fns' for date formatting in Chart.js

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
    const [revenueData, setRevenueData] = useState([]);
    const [studentChangesData, setStudentChangesData] = useState([]);
    const [timeRange, setTimeRange] = useState('quarter'); // Default to quarter view
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const studentsLineChartRef = useRef(null);
    const revenueChartRef = useRef(null);

    // Function to generate fake data based on the selected time range
    const generateFakeData = () => {
        const totalStudents = Math.floor(Math.random() * 2000) + 500;
        const totalTeachers = Math.floor(Math.random() * 100) + 20;
        let studentStatistics = [];
        let studentChangesData = [];
        let revenueData = [];

        switch (timeRange) {
            case 'month':
                // Generate data for the current month
                const currentMonth = new Date().getMonth() + 1;
                const daysInMonth = new Date(new Date().getFullYear(), currentMonth, 0).getDate();

                studentChangesData = Array.from({ length: daysInMonth }, (_, index) => ({
                    date: `${currentMonth}/${index + 1}`,
                    value: Math.floor(Math.random() * 50),
                }));

                revenueData = Array.from({ length: daysInMonth }, (_, index) => {
                    const date = new Date(new Date().getFullYear(), currentMonth - 1, index + 1);
                    return {
                        date: date.toISOString().slice(0, 10),
                        paidToTeachers: Math.floor(Math.random() * 10000) + 5000,
                        expectedFromStudents: Math.floor(Math.random() * 20000) + 10000,
                        collectedFromStudents: Math.floor(Math.random() * 15000) + 5000,
                    };
                });
                break;
            case 'quarter':
                // Generate data for the last 4 quarters
                for (let i = 0; i < 4; i++) {
                    const quarter = Math.ceil((new Date().getMonth() + 1) / 3) - i;
                    const value = Math.floor(Math.random() * 50);
                    studentChangesData.push({
                        date: `Q${quarter}`,
                        value,
                    });
                }

                revenueData = Array.from({ length: 30 }, (_, index) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (30 - index));
                    return {
                        date: date.toISOString().slice(0, 10),
                        paidToTeachers: Math.floor(Math.random() * 10000) + 5000,
                        expectedFromStudents: Math.floor(Math.random() * 20000) + 10000,
                        collectedFromStudents: Math.floor(Math.random() * 15000) + 5000,
                    };
                });
                break;
            case 'year':
                // Generate data for the current year
                const currentYear = new Date().getFullYear();

                studentStatistics = [
                    { className: 'Class 1', count: Math.floor(Math.random() * 50) + 10 },
                    { className: 'Class 2', count: Math.floor(Math.random() * 50) + 10 },
                    { className: 'Class 3', count: Math.floor(Math.random() * 50) + 10 },
                    { className: 'Class 4', count: Math.floor(Math.random() * 50) + 10 },
                    { className: 'Class 5', count: Math.floor(Math.random() * 50) + 10 },
                ];

                studentChangesData = Array.from({ length: 12 }, (_, index) => ({
                    date: `${index + 1}`,
                    value: Math.floor(Math.random() * 50),
                }));

                revenueData = Array.from({ length: 12 }, (_, index) => {
                    const date = new Date(currentYear, index, 1);
                    return {
                        date: date.toISOString().slice(0, 10),
                        paidToTeachers: Math.floor(Math.random() * 10000) + 5000,
                        expectedFromStudents: Math.floor(Math.random() * 20000) + 10000,
                        collectedFromStudents: Math.floor(Math.random() * 15000) + 5000,
                    };
                });
                break;
            default:
                break;
        }

        return {
            totalStudents,
            totalTeachers,
            studentStatistics,
            revenueData,
            studentChangesData,
        };
    };

    // Function to fetch and update dashboard data based on selected time range and dates
    const handleFetchDashboard = () => {
        const fakeData = generateFakeData();

        setTotalStudents(fakeData.totalStudents);
        setTotalTeachers(fakeData.totalTeachers);
        setStudentStatistics(fakeData.studentStatistics);

        setStudentsThisMonth(fakeData.studentChangesData.reduce((acc, data) => acc + data.value, 0));
        setStudentChangesData(fakeData.studentChangesData);

        const filteredRevenueData = fakeData.revenueData.filter(item => {
            if (startDate && endDate) {
                const itemDate = new Date(item.date);
                return itemDate >= startDate && itemDate <= endDate;
            }
            return true; // No filter applied if startDate or endDate is null
        });
        setRevenueData(filteredRevenueData);
    };

    // Effect to fetch dashboard data initially and on changes to start/end dates or time range
    useEffect(() => {
        handleFetchDashboard();
    }, [startDate, endDate, timeRange]);

    // Effect to update the student changes chart when data or time range changes
    useEffect(() => {
        if (studentsLineChartRef.current) {
            const ctxStudentsLineChart = studentsLineChartRef.current.getContext('2d');

            if (studentsLineChartRef.current.chart) {
                studentsLineChartRef.current.chart.destroy();
            }

            const chartData = {
                labels: studentChangesData.map(item => item.date),
                datasets: [{
                    label: 'Student Changes',
                    data: studentChangesData.map(item => item.value),
                    fill: false,
                    borderColor: '#36a2eb',
                    tension: 0.1
                }]
            };

            studentsLineChartRef.current.chart = new Chart(ctxStudentsLineChart, {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'category',
                            title: {
                                display: true,
                                text: timeRange === 'year' ? 'Month' : 'Quarter'
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
        }
    }, [studentChangesData, timeRange]);

    // Effect to update the revenue chart when data or time range changes
    useEffect(() => {
        if (revenueChartRef.current) {
            const ctxRevenueChart = revenueChartRef.current.getContext('2d');

            if (revenueChartRef.current.chart) {
                revenueChartRef.current.chart.destroy();
            }

            const chartData = {
                labels: revenueData.map(item => item.date),
                datasets: [{
                    label: 'Paid to Teachers',
                    data: revenueData.map(item => item.paidToTeachers),
                    borderColor: '#ffcd56',
                    tension: 0.1,
                    fill: false
                }, {
                    label: 'Expected from Students',
                    data: revenueData.map(item => item.expectedFromStudents),
                    borderColor: '#36a2eb',
                    tension: 0.1,
                    fill: false
                }, {
                    label: 'Collected from Students',
                    data: revenueData.map(item => item.collectedFromStudents),
                    borderColor: '#ff6384',
                    tension: 0.1,
                    fill: false
                }]
            };

            revenueChartRef.current.chart = new Chart(ctxRevenueChart, {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: timeRange === 'year' ? 'month' : 'day',
                                displayFormats: {
                                    day: 'MMM d',
                                    month: 'MMM'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Amount'
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
                                label: function (tooltipItem) {
                                    return tooltipItem.dataset.label + ': $' + tooltipItem.raw;
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [revenueData, timeRange]);

    // Function to handle time range changes
    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
        setStartDate(null);
        setEndDate(null);
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

            <div className={cx('chart-container')}>
                <div className={cx('controls')}>
                    <h2>Time Range</h2>
                    <button className={cx('time-button', { active: timeRange === 'month' })} onClick={() => handleTimeRangeChange('month')}>
                        Month
                    </button>
                    <button className={cx('time-button', { active: timeRange === 'quarter' })} onClick={() => handleTimeRangeChange('quarter')}>
                        Quarter
                    </button>
                    <button className={cx('time-button', { active: timeRange === 'year' })} onClick={() => handleTimeRangeChange('year')}>
                        Year
                    </button>
                </div>

                <div className={cx('chart')}>
                    <canvas id="studentsLineChart" ref={studentsLineChartRef}></canvas>
                </div>

                { (
                    <div className={cx('date-range')}>
                        <label>Start Date:</label>
                        <input style={{marginRight: '10px'}} type="date" onChange={handleStartDateChange} />
                        <label>End Date:</label>
                        <input type="date" onChange={handleEndDateChange} />
                    </div>
                )}

                <div className={cx('chart')}>
                    <canvas id="revenueChart" ref={revenueChartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
