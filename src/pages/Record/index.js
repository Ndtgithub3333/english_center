import React, { useEffect, useState, useRef } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Record/Record.module.scss';
import Chart from 'chart.js/auto';

const cx = classNames.bind(styles);

function Record() {
    
  return (
    <div className={cx('Record')}>
      <h1>Record</h1>
    </div>
  );
}

export default Record;
