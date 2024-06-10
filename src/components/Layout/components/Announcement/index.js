import React from 'react';
import styles from './Announcement.module.scss';
import popup from '~/assets/popUp1.png';

const Announcement = ({ logo, courseName, dayOfWeek, startTime, endTime, startDate }) => {
  return (
    <div className={styles.announcement}>
      <div className={styles.header}>
        <img src={logo} alt="Logo" />
        <div className={styles.title}>
          <h2>NEW ENGLISH COURSE</h2>
          <h1>{courseName}</h1>
        </div>
      </div>
      <div className={styles.content}>
        <h2>Class Schedule:</h2>
        <p><strong>Day of the Week:</strong> {dayOfWeek}</p>
        <p><strong>Time:</strong> {startTime} - {endTime}</p>
        <p><strong>Starting from:</strong> {startDate}</p>
      </div>
      <div className={styles.benefits}>
        <h2>
          WHY TO
          <br />
          <span style={{ color: 'red', marginLeft: '40px', fontSize: '24px' }}>CHOOSE US</span>
        </h2>
        <ul>
          <li>Affordable fee</li>
          <li>Free study materials</li>
          <li>Daily tasks & correction service</li>
          <li>Individual speaking sessions</li>
          <li>Free mock tests</li>
          <li>Well-qualified & experienced teacher</li>
        </ul>
      </div>
      <img className={styles.image} src={popup} alt="Popup Image" />
    </div>
  );
};

export default Announcement;
