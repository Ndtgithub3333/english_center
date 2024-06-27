// Home.jsx

import React, { useEffect, useState } from 'react';
import Announcement from '~/components/Layout/components/Announcement';
import Popup from '~/components/Layout/components/Popup';
import homeImg from '~/assets/home.jpg';
import styles from './Home.module.scss'; // Import file scss
import { getApi } from '~/utils/fetchData';


function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
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
    handleFetchAnnouncement();
  }, []);

  const { logoUrl, courseName, dayOfWeek, startTime, endTime, startDate } = announcement;

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
