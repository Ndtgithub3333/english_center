// Layouts
import { HeaderOnly } from '~/components/Layout'
import {LoginLayout} from '~/components/Layout'
//Page
import Home from '~/pages/Home'
import Profile from '~/pages/Profile';
import Login from '~/pages/Login'
import Admin from '~/pages/Admin'
import Dashboard from '~/pages/Dashboard';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login',  component: Login, layout: LoginLayout},
    { path: '/admin', component: Admin },
    { path: '/admin/dashboard', component: Dashboard },
    { path: '/admin/classes', component: Dashboard },
    { path: '/admin/teachers', component: Dashboard },
    { path: '/admin/students', component: Dashboard },
    { path: '/admin/record', component: Dashboard },
    { path: '/admin/advertising', component: Dashboard },
    { path: '/profile', component: Profile },
    
]

const privateRoutes = [


]

export { publicRoutes, privateRoutes }