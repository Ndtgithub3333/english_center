import { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

function Sidebar() {
    const [isRecordOpen, setIsRecordOpen] = useState(false);

    const toggleRecord = () => {
        setIsRecordOpen(!isRecordOpen);
    };

    return (
        <aside className={cx('wrapper')}>
            <ul>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/classes">Classes</Link></li>
                <li><Link to="/admin/teachers">Teachers</Link></li>
                <li><Link to="/admin/students">Students</Link></li>
                <li className={cx('has-submenu')}>
                    <div className={cx('parent-link')} onClick={toggleRecord}>
                        <span style={{ flex: 1 }}>Record</span>
                        <span className={cx('toggle-icon')}>
                            {isRecordOpen ? '-' : '+'}
                        </span>
                    </div>
                    {isRecordOpen && (
                        <ul className={cx('submenu')}>
                            <li><Link to="/admin/record/class">Class</Link></li>
                            <li><Link to="/admin/record/teacher">Teacher</Link></li>
                            <li><Link to="/admin/record/student">Student</Link></li>
                            <li><Link to="/admin/record/parent">Parent</Link></li>
                        </ul>
                    )}
                </li>
                <li><Link to="/admin/advertising">Advertising</Link></li>
            </ul>
        </aside>
    );
}

export default Sidebar;
