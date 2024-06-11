// Home.jsx

import React, { useState } from 'react';
import Announcement from '~/components/Layout/components/Announcement';
import Popup from '~/components/Layout/components/Popup';
import homeImg from '~/assets/home.jpg';
import styles from './Home.module.scss'; // Import file scss

const logoUrl = 'https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN.png';
const courseName = 'Advanced English Speaking';
const dayOfWeek = 'Monday';
const startTime = '2PM';
const endTime = '4PM';
const startDate = '1st July 2024';

function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className={styles.Home}>
      <div className={styles.background}>
        <img src={homeImg} alt="" />
      </div>
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

export default Home;
