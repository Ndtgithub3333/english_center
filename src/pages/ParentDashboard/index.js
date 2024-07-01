import React, { useEffect, useState } from 'react';
import Announcement from '~/components/Layout/components/Announcement';
import Popup from '~/components/Layout/components/Popup';
import styles from './ParentDashboard.module.scss'; // Import SCSS styles
import { getApi } from '~/utils/fetchData';

function ParentDashboard({ parentId }) {
  const [parentData, setParentData] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [error, setError] = useState('');
  const [amountLeft, setAmountLeft] = useState(0); // State to track amount left to pay
  const [isPopupOpen, setIsPopupOpen] = useState(true); // State to manage Popup visibility
  const [announcement, setAnnouncement] = useState({
    logoUrl: 'https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN.png',
    courseName: 'Advanced English Speaking',
    dayOfWeek: 'Monday',
    startTime: '2PM',
    endTime: '4PM',
    startDate: '1st July 2024',
  });

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const fetchParentData = async (parentId) => {
    try {
      // Example of fake data (replace with actual data fetching logic):
      const fakeParentData = {
        parentName: 'John Doe',
        children: [
          {
            id: 'S001',
            name: 'Alice Johnson',
            classes: [
              {
                id: 'C001',
                name: 'Mathematics',
                teacher: 'Mr. Smith',
                sessionsAttended: 15,
                sessionsMissed: 3,
                fee: 1000000,
                discount: 10,
                amountPaid: 800000,
                paymentHistory: [],
                attendances: [
                  { date: '2024-06-01', status: 'Present' },
                  { date: '2024-06-03', status: 'Absent' },
                  { date: '2024-06-05', status: 'Present' },
                ],
              },
              {
                id: 'C002',
                name: 'Science',
                teacher: 'Ms. Jones',
                sessionsAttended: 12,
                sessionsMissed: 1,
                fee: 1200000,
                discount: 15,
                amountPaid: 1000000,
                paymentHistory: [],
                attendances: [
                  { date: '2024-06-02', status: 'Present' },
                  { date: '2024-06-04', status: 'Present' },
                  { date: '2024-06-06', status: 'Absent' },
                ],
              },
            ],
          },
          {
            id: 'S002',
            name: 'Bob Johnson',
            classes: [
              {
                id: 'C003',
                name: 'History',
                teacher: 'Mr. Brown',
                sessionsAttended: 10,
                sessionsMissed: 2,
                fee: 900000,
                discount: 5,
                amountPaid: 500000,
                paymentHistory: [],
                attendances: [
                  { date: '2024-06-02', status: 'Present' },
                  { date: '2024-06-05', status: 'Present' },
                  { date: '2024-06-07', status: 'Absent' },
                ],
              },
            ],
          },
        ],
      };

      // Simulate API response delay with setTimeout
      setTimeout(() => {
        setParentData(fakeParentData);
      }, 1000); // Simulate 1 second delay

      // Replace with actual API call:
      // const res = await getApi(`parents/${parentId}`);
      // if (res.status === 200) {
      //     setParentData(res.data);
      // } else {
      //     setError('Failed to fetch parent data');
      // }

    } catch (ex) {
      setError(`Failed to fetch parent data: ${ex.message}`);
    }
  };

  const handleFetchAnnouncement = async () => {
    try {
      const res = await getApi('announcement');
      const data = res.data;
      setAnnouncement({
        ...announcement, 
        courseName: data.course_name, 
        dayOfWeek: data.day_of_the_week,
        startTime: data.start_time,
        endTime: data.end_time,
        startDate: data.start_date
      })
    } catch(e) {
      alert(`Failed to fetch announcement data: ${e.message}`)
    }
  };
  
  useEffect(() => {
    fetchParentData(parentId);
    handleFetchAnnouncement(); // Call fetchAdvertisementData when component mounts
  }, [parentId]);

  const { logoUrl, courseName, dayOfWeek, startTime, endTime, startDate } = announcement;

  const handleChildClick = (childId) => {
    setSelectedChild(childId);
    setSelectedClass(null); // Reset selected class when changing child
    setPaymentAmount('');
    setError('');
  };

  const handleClassClick = (classId) => {
    setSelectedClass(classId);
    setPaymentAmount('');
    setError('');

    // Calculate amount left to pay for the selected class
    const child = parentData.children.find(c => c.id === selectedChild);
    const selectedClassInfo = child.classes.find(c => c.id === classId);
    const amountLeftToPay = (selectedClassInfo.fee * (1 - selectedClassInfo.discount / 100)) - selectedClassInfo.amountPaid;
    setAmountLeft(amountLeftToPay);
  };

  const handlePaymentChange = (event) => {
    setPaymentAmount(event.target.value);
  };

  const handlePaymentSubmit = () => {
    if (paymentAmount <= 0 || paymentAmount > amountLeft) {
      setError('Invalid payment amount');
      return;
    }

    // Update the amount paid
    const child = parentData.children.find(c => c.id === selectedChild);
    const selectedClassInfo = child.classes.find(c => c.id === selectedClass);
    selectedClassInfo.amountPaid += parseFloat(paymentAmount);

    // Save the payment history
    const paymentTime = new Date().toLocaleString();
    selectedClassInfo.paymentHistory.push({
      amount: parseFloat(paymentAmount),
      date: paymentTime,
    });

    setPaymentAmount('');
    setError('');

    // Update the state with the new amountPaid and paymentHistory
    setParentData({
      ...parentData,
      children: parentData.children.map(c => {
        if (c.id === selectedChild) {
          return {
            ...c,
            classes: c.classes.map(cls => {
              if (cls.id === selectedClass) {
                return selectedClassInfo;
              }
              return cls;
            }),
          };
        }
        return c;
      }),
    });

    // Update amount left after payment
    const amountLeftAfterPayment = amountLeft - parseFloat(paymentAmount);
    setAmountLeft(amountLeftAfterPayment);
  };

  if (!parentData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.parentDashboard}>
      <h1>Welcome, {parentData.parentName}!</h1>
      <h2>Children Information:</h2>
      <div className={styles.childrenInformation}>
        {parentData.children.map((child) => (
          <div
            key={child.id}
            className={`${styles.childInfo} ${selectedChild === child.id ? styles.selectedChild : ''}`}
            onClick={() => handleChildClick(child.id)}
          >
            <p>Name: {child.name}</p>
          </div>
        ))}
      </div>
      {selectedChild && (
        <div className={styles.childDetails}>
          <h3>Class Information:</h3>
          {parentData.children.find(child => child.id === selectedChild).classes.map((classInfo) => (
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
      )}
      {selectedClass && (
        <div className={styles.classDetails}>
          <h4>Class Details:</h4>
          <ul style={{listStyle: 'none'}}>
            {parentData.children.find(child => child.id === selectedChild).classes.find(cls => cls.id === selectedClass).attendances.map((attendance, index) => (
              <li key={index}>
                <span>{attendance.date}:</span>
                <span>{attendance.status}</span>
              </li>
            ))}
          </ul>
          <div>
            <h4>Payment Details:</h4>
            <p>Fee: {parentData.children.find(child => child.id === selectedChild).classes.find(cls => cls.id === selectedClass).fee.toLocaleString()} VND</p>
            <p>Discount: {parentData.children.find(child => child.id === selectedChild).classes.find(cls => cls.id === selectedClass).discount}%</p>
            <p>Amount Paid: {parentData.children.find(child => child.id === selectedChild).classes.find(cls => cls.id === selectedClass).amountPaid.toLocaleString()} VND</p>
            <p>Amount Left: <span style={{color: amountLeft === 0 ? 'green' : 'red'}}>{amountLeft.toLocaleString()} VND</span></p>
            <input
              type="number"
              placeholder="Enter payment amount"
              value={paymentAmount}
              onChange={handlePaymentChange}
            />
            <button style={{backgroundColor: '#0aa3dd', color: '#fff'}} onClick={handlePaymentSubmit}>Submit Payment</button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
          <div className={styles.paymentHistory}>
            <h4>Payment History:</h4>
            <ul>
              {parentData.children.find(child => child.id === selectedChild).classes.find(cls => cls.id === selectedClass).paymentHistory.map((payment, index) => (
                <li key={index}>
                  <span>{payment.date}:</span>
                  <span>{payment.amount.toLocaleString()} VND</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Popup Announcement */}
      {isPopupOpen && (
        <Popup onClose={togglePopup}>
          <Announcement
            logo={logoUrl}
            courseName={courseName}
            dayOfWeek={dayOfWeek}
            startTime={startTime}
            endTime={endTime}
            startDate={startDate}
          />
        </Popup>
      )}
    </div>
  );
}

export default ParentDashboard;
