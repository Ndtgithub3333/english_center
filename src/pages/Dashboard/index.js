import React, { useEffect, useState, useRef } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Dashboard/Dashboard.module.scss';
import Chart from 'chart.js/auto';

const cx = classNames.bind(styles);

function Dashboard() {
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
    const chartRef = useRef(null);
    const revenueChartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('studentsChart').getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: studentStatistics.map(stat => stat.className),
                datasets: [{
                    label: 'Students',
                    data: studentStatistics.map(stat => stat.count),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
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
                            text: 'Class Names'
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
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.dataset.label}: ${context.raw}`;
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
            type: 'pie',
            data: {
                labels: ['Paid to Teachers', 'Expected from Students', 'Collected from Students'],
                datasets: [{
                    label: 'Revenue',
                    data: [5000, 8000, 6000],
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
    }, [studentStatistics]);

    return (
        <div className={cx('dashboard')}>
            <h1>Dashboard</h1>
            <div className={cx('top-row')}>
                <div className={cx('info-box')}>
                    <h2>Total Students</h2>
                    <i className="icon-class-name" />
                    <p>{totalStudents}</p>
                    <div className={cx('info-footer')}>
                        <span>This Month</span>
                        <span>{studentsThisMonth}</span>
                    </div>
                </div>
                <div className={cx('info-box')}>
                    <h2>Total Teachers</h2>
                    <i className="icon-class-name" />
                    <p>{totalTeachers}</p>
                    <div className={cx('info-footer')}>
                        <span>This Month</span>
                        <span>45</span>
                    </div>
                </div>
                <div className={cx('info-box')}>
                    <h2>Revenue</h2>
                    <div className="chart-container">
                        <canvas id="revenueChart"></canvas>
                    </div>
                </div>
            </div>
            <div className={cx('bottom-row')}>
                <h2>Students Statistics</h2>
                <canvas id="studentsChart"></canvas>
            </div>
        </div>
    );
}

export default Dashboard;
