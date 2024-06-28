import React, { useEffect, useState, useRef } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Record/Record.module.scss';
import Chart from 'chart.js/auto';

const cx = classNames.bind(styles);

function Student() {
    
  return (
    <div className={cx('Class')}>
      <h1>Student</h1>
    </div>
  );
}

export default Student;
