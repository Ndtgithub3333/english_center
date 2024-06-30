import React, { useEffect, useState } from 'react';
import styles from './StudentDashboard.module.scss'; // Import SCSS styles

function StudentDashboard({ studentId }) {
    const [studentData, setStudentData] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        fetchStudentData(studentId);
    }, [studentId]);

    const fetchStudentData = async (studentId) => {
        try {
            // Example of fake data (replace with actual data fetching logic):
            const fakeStudentData = {
                studentName: 'Alice Johnson',
                classes: [
                    { 
                        id: 'C001', 
                        name: 'Mathematics', 
                        teacher: 'Mr. Smith', 
                        sessionsAttended: 15, 
                        sessionsMissed: 3,
                        attendances: [
                            { date: '2024-06-01', status: 'Present' },
                            { date: '2024-06-03', status: 'Absent' },
                            { date: '2024-06-05', status: 'Present' }
                        ]
                    },
                    { 
                        id: 'C002', 
                        name: 'Science', 
                        teacher: 'Ms. Jones', 
                        sessionsAttended: 12, 
                        sessionsMissed: 1,
                        attendances: [
                            { date: '2024-06-02', status: 'Present' },
                            { date: '2024-06-04', status: 'Present' },
                            { date: '2024-06-06', status: 'Absent' }
                        ]
                    },
                    { 
                        id: 'C003', 
                        name: 'Science', 
                        teacher: 'Ms. Jones', 
                        sessionsAttended: 12, 
                        sessionsMissed: 1,
                        attendances: [
                            { date: '2024-06-02', status: 'Present' },
                            { date: '2024-06-04', status: 'Present' },
                            { date: '2024-06-06', status: 'Absent' }
                        ]
                    },
                    { 
                        id: 'C004', 
                        name: 'Science', 
                        teacher: 'Ms. Jones', 
                        sessionsAttended: 12, 
                        sessionsMissed: 1,
                        attendances: [
                            { date: '2024-06-02', status: 'Present' },
                            { date: '2024-06-04', status: 'Present' },
                            { date: '2024-06-06', status: 'Absent' }
                        ]
                    },{ 
                        id: 'C005', 
                        name: 'Science', 
                        teacher: 'Ms. Jones', 
                        sessionsAttended: 12, 
                        sessionsMissed: 1,
                        attendances: [
                            { date: '2024-06-02', status: 'Present' },
                            { date: '2024-06-04', status: 'Present' },
                            { date: '2024-06-06', status: 'Absent' }
                        ]
                    }
                ]
            };

            // Simulate API response delay with setTimeout
            setTimeout(() => {
                setStudentData(fakeStudentData);
            }, 1000); // Simulate 1 second delay

            // Replace with actual API call:
            // const res = await getApi(`students/${studentId}`);
            // if (res.status === 200) {
            //     setStudentData(res.data);
            // } else {
            //     alert('Failed to fetch student data');
            // }

        } catch (ex) {
            alert(`Failed to fetch student data: ${ex.message}`);
        }
    };

    const handleClassClick = (classId) => {
        setSelectedClass(classId);
    };

    if (!studentData) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.studentDashboard}>
            <h1>Welcome, {studentData.studentName}!</h1>
                <h2>Class Information:</h2>
            <div className={styles.classInformation}>
                {studentData.classes && studentData.classes.map((classInfo) => (
                    <div
                        key={classInfo.id}
                        className={`${styles.classInfo} ${selectedClass === classInfo.id ? styles.selectedClass : ''}`}
                        onClick={() => handleClassClick(classInfo.id)}
                    >
                        <p>Class: {classInfo.name}</p>
                        <p>Teacher: {classInfo.teacher}</p>
                        <p>Sessions Attended: {classInfo.sessionsAttended}</p>
                        <p>Sessions Missed: {classInfo.sessionsMissed}</p>
                    </div>
                ))}
            </div>
            {selectedClass && (
                <div className={styles.attendanceContainer}>
                    <h3 className={styles.attendanceHeader}>Attendance Record for {studentData.classes.find(c => c.id === selectedClass).name}</h3>
                    <ul className={styles.attendanceList}>
                        {studentData.classes.find(c => c.id === selectedClass).attendances.map((attendance, index) => (
                            <li key={index}>
                                <span className={styles.date}>{attendance.date}:</span>
                                <span className={styles.status}>{attendance.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default StudentDashboard;