import React from 'react';
import styles from './Announcement.module.scss';

const Announcement = ({ logo, courseName, dayOfWeek, startTime, endTime, startDate }) => {
  return (
    <div className={styles.announcement}>
      <div className={styles.header}>
        <img src={logo} alt="Logo" />
        <h1>NEW ENGLISH COURSE: {courseName}</h1>
      </div>
      <div className={styles.content}>
        <h2>Class Schedule:</h2>
        <p><strong>Day of the Week:</strong> {dayOfWeek}</p>
        <p><strong>Time:</strong> {startTime} - {endTime}</p>
        <p><strong>Starting from:</strong> {startDate}</p>
      </div>
      <div className={styles.benefits}>
        <h2>WHY TO CHOOSE US:</h2>
        <ul>
          <li>Affordable fee</li>
          <li>Free study materials</li>
          <li>Daily tasks & correction service</li>
          <li>Individual speaking sessions</li>
          <li>Free mock tests</li>
          <li>Well-qualified & experienced teacher</li>
        </ul>
      </div>
    </div>
  );
};

export default Announcement;
