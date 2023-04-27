import Home from "../pages/home";
import SearchItems from "../pages/search-items/";
import { IPATH } from '../services';

const PATHS: IPATH[] = [
    {
        url:'/',
        exact: true,
        component: Home,
    },
    {
        name:'home',
        url:'/home',
        exact: true,
        component: Home,
    },
    {
        name:'search items',
        url:'/search-items',
        exact: true,
        component: SearchItems,
    },
]

export default PATHS;