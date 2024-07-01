import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import Chart from 'chart.js/auto'; // Importing 'chart.js/auto' to utilize the new modular version
import styles from './Dashboard.module.scss';
import 'chartjs-adapter-date-fns'; // Importing 'chartjs-adapter-date-fns' for date formatting in Chart.js
import { getApi } from '~/utils/fetchData';

const cx = classNames.bind(styles);

const Dashboard = () => {
    const [totalStudents, setTotalStudents] = useState(0);
    const [studentsThisMonth, setStudentsThisMonth] = useState(0);
    const [totalTeachers, setTotalTeachers] = useState(0);
    const [revenueData, setRevenueData] = useState([]);
    const [studentChangesData, setStudentChangesData] = useState([]);
    const [timeRange, setTimeRange] = useState('month'); // Default to quarter view
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-03-31');

    const studentsLineChartRef = useRef(null);
    const revenueChartRef = useRef(null);

    const handleFetchDashboard = async() => {
        const res = await getApi('dashboard');
        const data = res.data
        setTotalStudents(data.totalStudents);
        setTotalTeachers(data.totalTeachers);
        switch (timeRange) {
            case 'month':
                setStudentChangesData(data.totalStudentsJoinedByMonth);
                break;
            case 'quarter':
                setStudentChangesData(data.totalStudentsJoinedByQuarter);
                break;
            case 'year':
                setStudentChangesData(data.totalStudentsJoinedByYear);
                break;
        }
        const currentMonth = new Date().getMonth() + 1;
        if(data.totalStudentsJoinedByMonth.find(item => item.date === currentMonth)) {
            setStudentsThisMonth(data.totalStudentsJoinedByMonth.find(item => item.date === currentMonth).value)
        } else {
            setStudentsThisMonth(0);
        }
    }

    const handleFetchRevenue = async() => {
        const res = await getApi(`dashboard/money-chart?startDate=${startDate}&endDate=${endDate}`);
        const data = res.data
        console.log(data)
        setRevenueData(Array.from({ length: data.length }, (_, index) => {
            const date = data[index].date;
            return {
                date,
                paidToTeachers: data[index].totalPaidSalary,
                collectedFromStudents: data[index].totalMoneyCollected, 
                expectedFromStudents: data[index].totalMoneyExpected
            };
        }));
    }

    // Effect to fetch dashboard data initially and on changes to start/end dates or time range
    useEffect(() => {
        handleFetchDashboard();
    }, [timeRange]);


    useEffect(() => {
        handleFetchRevenue();
    }, [])

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
                }, 
                {
                    label: 'Expected from Students',
                    data: revenueData.map(item => item.expectedFromStudents),
                    borderColor: '#36a2eb',
                    tension: 0.1,
                    fill: false
                },
                 {
                    label: 'Collected from Students',
                    data: revenueData.map(item => item.collectedFromStudents),
                    borderColor: '#ff6384',
                    tension: 0.1,
                    fill: false
                }
            ]
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
    }, [revenueData]);

    // Function to handle time range changes
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
