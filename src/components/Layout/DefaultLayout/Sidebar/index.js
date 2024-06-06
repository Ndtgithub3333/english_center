import classNames from "classnames/bind";
import { Link } from "react-router-dom"; // Import the Link component from the appropriate library
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles)


function Sidebar() {
    return <aside className={cx('wrapper')}>
         <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/classes">Classes</Link></li>
                <li><Link to="/admin/teachers">Teachers</Link></li>
                <li><Link to="/admin/students">Students</Link></li>
                <li><Link to="/admin/record">Record</Link></li>
                <li><Link to="/admin/advertising">Advertising</Link></li>
    </aside>;
}

export default Sidebar;