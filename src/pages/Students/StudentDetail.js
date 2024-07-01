import React from 'react';
import classNames from 'classnames/bind';
import styles from './StudentDetail.module.scss';
import avatar from '~/assets/avatar.jpg'

const cx = classNames.bind(styles);

function StudentDetail({ student, onClose }) {
    const studentKeys = Object.keys(student).filter(key => key !== 'parent' && key !== 'id');

    return (
        <div className={cx('student-detail')}>
            <h2>Student Details</h2>
            <div className={cx('detail-container')}>
                <div className={cx('photo-section')}>
                    <img src={student.photo || avatar} alt="Student" className={cx('student-photo')} />
                </div>
                <div className={cx('info-section')}>
                    {studentKeys.map((key) => (
                        <div className={cx('detail-group')} key={key}>
                            <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
                            <span>{student[key]}</span>
                        </div>
                    ))}
                </div>
            </div>
            <h3>Parent Information</h3>
            <div className={cx('info-section')}>
                {Object.keys(student.parent).map((key) => (
                    <div className={cx('detail-group')} key={key}>
                        <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
                        <span>{student.parent[key]}</span>
                    </div>
                ))}
            </div>
            <button onClick={onClose} className={cx('close-button')}>Close</button>
        </div>
    );
}

export default StudentDetail;
