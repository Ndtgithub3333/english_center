import React, { useEffect, useState, useRef } from 'react';
import classNames from "classnames/bind";
import styles from '~/pages/Record/Record.module.scss';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Parent() {
    
  return (
    <div className={cx('Parent')}>
              <li><Link to="/admin/record/student">Student</Link></li>

    </div>
  );
}

export default Parent;
