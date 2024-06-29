import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Student.module.scss';

// Mock data for student records
const fakeStudentData = [
  {
    id: 1,
    studentName: 'Student A',
    className: 'Class X',
    attendances: 20,
    absents: 5,
    paidFee: 150,
    discountPercent: 0,
    parentPaidAmount: 150,
  },
  {
    id: 2,
    studentName: 'Student B',
    className: 'Class Y',
    attendances: 18,
    absents: 2,
    paidFee: 120,
    discountPercent: 10,
    parentPaidAmount: 100,
  },
  // Add more fake student data as needed
];

function RecordStudent() {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    // Simulate an API call to fetch student data
    setTimeout(() => {
      setStudentList(fakeStudentData);
    }, 1000); // Simulate a delay
  }, []);

  return (
    <div className={styles.studentContainer}>
      <h1>Students Records</h1>
      <div className={styles.totalFees}>
        <h3>Tuition Fees Students Paid:</h3>
        <p>${calculateTotalPaidFee(studentList)}</p>
      </div>
      <table className={styles.studentTable}>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Attendances</th>
            <th>Absents</th>
            <th>Total Payable Fee</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentList.length > 0 ? (
            studentList.map((student, index) => {
              const totalPayableFee = calculateTotalPayableFee(student.paidFee, student.discountPercent);
              const remainingFee = totalPayableFee - student.parentPaidAmount;
              const paymentStatus = remainingFee <= 0 ? 'Paid in Full' : `$${remainingFee.toFixed(2)} remaining`;
              const paymentStatusClass = remainingFee <= 0 ? styles.paidInFull : styles.remaining;

              return (
                <tr key={index}>
                  <td>{student.studentName}</td>
                  <td>{student.className}</td>
                  <td>{student.attendances}</td>
                  <td>{student.absents}</td>
                  <td>${totalPayableFee.toFixed(2)}</td>
                  <td className={`${styles.paymentStatus} ${paymentStatusClass}`}>
                    {paymentStatus}
                  </td>
                  <td className={styles.actions}>
                    <Link to={`/admin/record/student/${student.id}`} className={styles.link}>
                      <span className={styles.icon} title={`Detail ${student.studentName}`}>🔍</span>
                    </Link>
                    <span className={styles.icon} title={`Edit ${student.studentName}`}>✏️</span>
                    <span className={styles.icon} title={`Delete ${student.studentName}`}>🗑️</span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className={styles.loading}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function calculateTotalPaidFee(students) {
  return students.reduce((total, student) => total + student.paidFee, 0);
}

function calculateTotalPayableFee(paidFee, discountPercent) {
  const discountAmount = (discountPercent / 100) * paidFee;
  return paidFee - discountAmount;
}

export default RecordStudent;
