// Đường dẫn
import { HeaderOnly } from '~/components/Layout'
import { LoginLayout } from '~/components/Layout'

// Các trang
import Home from '~/pages/Home'
import Profile from '~/pages/Profile'
import Login from '~/pages/Login'
import Admin from '~/pages/Admin'
import Dashboard from '~/pages/Dashboard'
import Classes from '~/pages/Classes'
import Advertising from '~/pages/Advertising'
import Teachers from '~/pages/Teachers'

// Các tuyến đường công khai
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: LoginLayout },
    { path: '/admin', component: Admin },
    { path: '/admin/dashboard', component: Dashboard },
    { path: '/admin/classes', component: Classes },
    { path: '/admin/teachers', component: Teachers },
    { path: '/admin/students', component: Dashboard },
    { path: '/admin/record', component: Dashboard },
    { path: '/admin/advertising', component: Advertising },
    { path: '/profile', component: Profile },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
