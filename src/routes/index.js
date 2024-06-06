// Layouts
import { HeaderOnly } from '~/components/Layout'
import {LoginLayout} from '~/components/Layout'
//Page
import Home from '~/pages/Home'
import Following from "~/pages/Following";
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Login from '~/pages/Login'

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login',  component: Login, layout: LoginLayout},
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
]

const privateRoutes = [


]

export { publicRoutes, privateRoutes }