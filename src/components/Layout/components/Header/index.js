import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src="https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN.png" alt="Logo" className={cx('logo')} />
            </div>
        </header>
    );
}

export default Header;
