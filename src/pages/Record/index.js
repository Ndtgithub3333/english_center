import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '~/pages/Record/Record.module.scss';

const cx = classNames.bind(styles);

function Record() {
  return (
    <div className={cx('Record')}>
      <h1>Record</h1>
      <ul className={cx('submenu')}>
        <li><Link to="/admin/record/class">Class</Link></li>
        <li><Link to="/admin/record/teacher">Teacher</Link></li>
        <li><Link to="/admin/record/student">Student</Link></li>
        <li><Link to="/admin/record/parent">Parent</Link></li>
      </ul>
    </div>
  );
}

export default Record;
