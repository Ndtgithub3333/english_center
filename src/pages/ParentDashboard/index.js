import React, { useEffect, useState } from 'react';
import styles from './ParentDashboard.module.scss'; // Import SCSS styles

function ParentDashboard({ parentId }) {
  const [parentData, setParentData] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [error, setError] = useState('');
  const [amountLeft, setAmountLeft] = useState(0); // State to track amount left to pay

  useEffect(() => {
    fetchParentData(parentId);
  }, [parentId]);

  const fetchParentData = async (parentId) => {
    try {
      // Example of fake data (replace with actual data fetching logic):
      const fakeParentData = {
        parentName: 'John Doe',
        children: [
          {
            id: 'S001',
            name: 'Alice Johnson',
            discount: 10, // Discount percentage
            classes: [
              {
                id: 'C001',
                name: 'Mathematics',
                teacher: 'Mr. Smith',
                sessionsAttended: 15,
                sessionsMissed: 3,
                fee: 1000000,
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
    const amountLeftToPay = (selectedClassInfo.fee * (1 - child.discount / 100)) - selectedClassInfo.amountPaid;
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
            <p>Discount: {child.discount}%</p>
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
          <ul>
            {parentData.children.find(child => child.id === selectedChild).classes.find(cls => cls.id === selectedClass).attendances.map((attendance, index) => (
              <li key={index}>
                <span>{attendance.date}:</span>
                <span>{attendance.status}</span>
              </li>
            ))}
          </ul>
          <div>
            <h5>Payment Information:</h5>
            <p>Fee: {parentData.children.find(child => child.id === selectedChild).classes.find(cls => cls.id === selectedClass).fee.toLocaleString()} VND</p>
            <p>Discount: {parentData.children.find(child => child.id === selectedChild).discount}%</p>
            <p>Amount Paid: {parentData.children.find(child => child.id === selectedChild).classes.find(cls => cls.id === selectedClass).amountPaid.toLocaleString()} VND</p>
            <p>
              Remaining Amount: 
              <span className={`${styles.remainingAmount} ${amountLeft === 0 ? styles.paid : ''}`}>
                {amountLeft.toLocaleString()} VND
              </span>
            </p>
            <input 
              type="number"
              value={paymentAmount}
              onChange={handlePaymentChange}
              placeholder="Enter payment amount"
            />
            <button onClick={handlePaymentSubmit}>Submit Payment</button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
          <div>
            <h5>Payment History:</h5>
            <ul className={styles.paymentHistory}>
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
    </div>
  );
}

export default ParentDashboard;
