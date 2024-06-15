import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import kma from '~/assets/kma.png';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/" className={cx('logo-link')}>
                    <img src={kma} alt="Logo" className={cx('logo')} />
                </Link>
            </div>
        </header>
    );
}

export default Header;
