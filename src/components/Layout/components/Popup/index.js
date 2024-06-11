import React from 'react';
import styles from './Popup.module.scss';

const Popup = ({ children, onClose }) => {
  return (
    <div className={styles.popup} onClick={onClose}>
      <div className={styles.popupInner} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
