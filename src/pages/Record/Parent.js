import React, { useEffect, useState, useRef } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Record/Record.module.scss';
import Chart from 'chart.js/auto';

const cx = classNames.bind(styles);

function Parent() {
    
  return (
    <div className={cx('Parent')}>
      <h1>Parent</h1>
    </div>
  );
}

export default Parent;
