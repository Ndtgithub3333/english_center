import React, { useState } from 'react';
import Popup from '~/components/Layout/components/Popup';
import Announcement from '~/components/Layout/components/Announcement';
import logo from '~/assets/kma.png';
import styles from '~/pages/Advertising/Advertising.module.scss';

const Advertising = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    logo: logo,
    courseName: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    startDate: ''
  });

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Lưu dữ liệu vào localStorage hoặc gửi đến API
    localStorage.setItem('announcement', JSON.stringify(formData));
    alert('Announcement saved successfully!');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>Edit Announcement</h1>
        <form className={styles.form}>
          <label>
            Course Name:
            <input type="text" name="courseName" value={formData.courseName} onChange={handleChange} />
          </label>
          <label>
            Day of the Week:
            <input type="text" name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} />
          </label>
          <label>
            Start Time:
            <input type="text" name="startTime" value={formData.startTime} onChange={handleChange} />
          </label>
          <label>
            End Time:
            <input type="text" name="endTime" value={formData.endTime} onChange={handleChange} />
          </label>
          <label>
            Start Date:
            <input type="text" name="startDate" value={formData.startDate} onChange={handleChange} />
          </label>
          <div className={styles.buttons}>
            <button type="button" onClick={handleOpenPopup}>Preview Announcement</button>
            <button type="button" onClick={handleSave}>Save Announcement</button>
          </div>
        </form>
        {isPopupOpen && (
          <Popup onClose={handleClosePopup}>
            <Announcement
              logo={formData.logo}
              courseName={formData.courseName}
              dayOfWeek={formData.dayOfWeek}
              startTime={formData.startTime}
              endTime={formData.endTime}
              startDate={formData.startDate}
            />
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Advertising;


