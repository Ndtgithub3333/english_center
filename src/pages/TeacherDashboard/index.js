import React, { useEffect, useState } from 'react';
import styles from '~/pages/TeacherDashboard/TeacherDashboard.module.scss';

function TeacherDashboard({ teacherId }) {
    const [teacherData, setTeacherData] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [takingAttendance, setTakingAttendance] = useState(false);
    const [attendanceDate, setAttendanceDate] = useState('');
    const [attendanceData, setAttendanceData] = useState({});
    const [attendanceRecords, setAttendanceRecords] = useState({});
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTeacherData(teacherId);
    }, [teacherId]);

    const fetchTeacherData = async (teacherId) => {
        try {
            const fakeTeacherData = {
                teacherName: 'Mr. Smith',
                classes: [
                    {
                        id: 'C001',
                        name: 'Mathematics',
                        projectedSessions: 30,
                        sessionsTaught: 20,
                        students: [
                            { id: 'S001', name: 'Alice Johnson', email: 'alice@mail.com', phone: '123-456-7890', attended: 18, missed: 2 },
                            { id: 'S002', name: 'Bob Brown', email: 'bob@mail.com', phone: '123-456-7891', attended: 17, missed: 3 },
                            { id: 'S003', name: 'Charlie Green', email: 'charlie@mail.com', phone: '123-456-7892', attended: 20, missed: 0 },
                            { id: 'S004', name: 'Diana Prince', email: 'diana@mail.com', phone: '123-456-7893', attended: 15, missed: 5 },
                            { id: 'S005', name: 'Eve Black', email: 'eve@mail.com', phone: '123-456-7894', attended: 19, missed: 1 }
                        ]
                    },
                    {
                        id: 'C002',
                        name: 'Science',
                        projectedSessions: 25,
                        sessionsTaught: 18,
                        students: [
                            { id: 'S006', name: 'Frank White', email: 'frank@mail.com', phone: '123-456-7895', attended: 18, missed: 0 },
                            { id: 'S007', name: 'Grace Kelly', email: 'grace@mail.com', phone: '123-456-7896', attended: 16, missed: 2 },
                            { id: 'S008', name: 'Hank Red', email: 'hank@mail.com', phone: '123-456-7897', attended: 17, missed: 1 },
                            { id: 'S009', name: 'Ivy Blue', email: 'ivy@mail.com', phone: '123-456-7898', attended: 14, missed: 4 },
                            { id: 'S010', name: 'Jack Green', email: 'jack@mail.com', phone: '123-456-7899', attended: 15, missed: 3 }
                        ]
                    }
                ]
            };

            setTimeout(() => {
                setTeacherData(fakeTeacherData);
            }, 1000);

        } catch (ex) {
            alert(`Failed to fetch teacher data: ${ex.message}`);
        }
    };

    const handleClassClick = (classId) => {
        setSelectedClass(classId);
        setTakingAttendance(false);
    };

    const handleAttendanceClick = () => {
        setTakingAttendance(true);
        setAttendanceData({});
        setAttendanceDate('');
    };

    const handleCheckboxChange = (studentId) => {
        setAttendanceData((prevData) => ({
            ...prevData,
            [studentId]: !prevData[studentId]
        }));
    };

    const handleSaveAttendance = () => {
        if (!attendanceDate) {
            alert('Please select a date for attendance.');
            return;
        }

        const classAttendance = attendanceRecords[selectedClass] || {};
        classAttendance[attendanceDate] = attendanceData;
        setAttendanceRecords({ ...attendanceRecords, [selectedClass]: classAttendance });
        setTakingAttendance(false);
    };

    const handleViewAttendance = (date) => {
        setAttendanceDate(date);
        const classAttendance = attendanceRecords[selectedClass] || {};
        setAttendanceData(classAttendance[date] || {});
        setTakingAttendance(true);
    };

    const getAttendanceRecord = (classId, date) => {
        const classAttendance = attendanceRecords[classId] || {};
        return date ? classAttendance[date] || {} : classAttendance;
    };

    const filterStudents = (students) => {
        return students.filter(student => {
            const isPresent = attendanceData[student.id];
            if (filter === 'all') return true;
            if (filter === 'present') return isPresent;
            if (filter === 'absent') return !isPresent;
            return true;
        });
    };

    if (!teacherData) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <div className={styles.teacherDashboard}>
            <h1>Welcome, {teacherData.teacherName}!</h1>
            <h2>Your Classes:</h2>
            <div className={styles.classInformation}>
                {teacherData.classes && teacherData.classes.map((classInfo) => (
                    <div
                        key={classInfo.id}
                        className={`${styles.classInfo} ${selectedClass === classInfo.id ? styles.selectedClass : ''}`}
                        onClick={() => handleClassClick(classInfo.id)}
                    >
                        <p>Class: {classInfo.name}</p>
                        <p>Projected Sessions: {classInfo.projectedSessions}</p>
                        <p>Sessions Taught: {classInfo.sessionsTaught}</p>
                    </div>
                ))}
            </div>
            {selectedClass && (
                <div className={styles.studentListContainer}>
                    <h3 className={styles.studentListHeader}>
                        Students in {teacherData.classes.find(c => c.id === selectedClass).name}
                    </h3>
                    {!takingAttendance ? (
                        <div>
                            <ul className={styles.studentList}>
                                {teacherData.classes.find(c => c.id === selectedClass).students.map((student) => (
                                    <li key={student.id} className={styles.studentInfo}>
                                        <p>Name: {student.name}</p>
                                        <p>Email: {student.email}</p>
                                        <p>Phone: {student.phone}</p>
                                        <p>Attended: {student.attended}</p>
                                        <p>Missed: {student.missed}</p>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={handleAttendanceClick}>Take Attendance</button>
                            <h3>Past Attendance Records</h3>
                            <ul className={styles.attendanceRecordList}>
                                {Object.keys(getAttendanceRecord(selectedClass)).map((date) => (
                                    <li key={date} className={styles.attendanceRecord}>
                                        <button onClick={() => handleViewAttendance(date)}>View Attendance for {date}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className={styles.attendanceForm}>
                            <input
                                type="date"
                                value={attendanceDate}
                                onChange={(e) => setAttendanceDate(e.target.value)}
                                className={styles.datePicker}
                            />
                            <div className={styles.filterContainer}>
                                <label>
                                    Filter:
                                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                        <option value="all">All</option>
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                    </select>
                                </label>
                            </div>
                            <ul className={styles.attendanceList}>
                                {filterStudents(teacherData.classes.find(c => c.id === selectedClass).students).map((student) => (
                                    <li key={student.id} className={styles.attendanceItem}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={attendanceData[student.id] || false}
                                                onChange={() => handleCheckboxChange(student.id)}
                                            />
                                            {student.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={handleSaveAttendance}>Save Attendance</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default TeacherDashboard;
