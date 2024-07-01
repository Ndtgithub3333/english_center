import { HeaderOnly, LoginLayout } from '~/components/Layout';

// Import all your pages here
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import Admin from '~/pages/Admin';
import Dashboard from '~/pages/Dashboard';
import Classes from '~/pages/Classes';
import Advertising from '~/pages/Advertising';
import Teachers from '~/pages/Teachers';
import Students from '~/pages/Students';
import Record from '~/pages/Record';
import RecordClass from '~/pages/Record/Class';
import RecordClassDetail from '~/pages/Record/ClassDetail';
import RecordTeacherDetail from '~/pages/Record/TeacherDetail';
import RecordStudentDetail from '~/pages/Record/StudentDetail';
import RecordTeacher from '~/pages/Record/Teacher';
import RecordStudent from '~/pages/Record/Student';
import RecordParent from '~/pages/Record/Parent';
import StudentDashboard from '~/pages/StudentDashboard';
import ParentDashboard from '~/pages/ParentDashboard';


// Define public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: LoginLayout },
    { path: '/admin', component: Admin },
    { path: '/admin/dashboard', component: Dashboard },
    { path: '/admin/classes', component: Classes },
    { path: '/admin/teachers', component: Teachers },
    { path: '/admin/students', component: Students }, // Check if this is intended
    { path: '/admin/record', component: Record },
    { path: '/admin/record/class', component: RecordClass },
    { path: '/admin/record/teacher', component: RecordTeacher },
    { path: '/admin/record/teacher/:id', component: RecordTeacherDetail }, // Correct route for teacher detail
    { path: '/admin/record/class/:id', component: RecordClassDetail }, // Correct route for class detail
    { path: '/admin/record/student/:id', component: RecordStudentDetail }, // Correct route for class detail
    { path: '/admin/record/student', component: RecordStudent },
    { path: '/admin/record/parent', component: RecordParent },
    { path: '/admin/advertising', component: Advertising },
    { path: '/student-dashboard', component: StudentDashboard, layout: HeaderOnly },
    {path: '/parent-dashboard', component: ParentDashboard, layout: HeaderOnly},
    { path: '/profile', component: Profile },
];

// Define private routes if needed
const privateRoutes = [];

export { publicRoutes, privateRoutes };
