import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import kma from '~/assets/kma.png';
import LogoutButton from '~/components/Layout/components/Logout/LogoutButton';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/" className={cx('logo-link')}>
                    <img src={kma} alt="Logo" className={cx('logo')} />
                </Link>
                <div className={cx('navigation')}>
                    <nav>
                        <ul className={cx('nav-list')}>
                            {/* Add any navigation links here */}
                        </ul>
                    </nav>
                    <LogoutButton /> {/* Include LogoutButton component here */}
                </div>
            </div>
        </header>
    );
}

export default Header;
