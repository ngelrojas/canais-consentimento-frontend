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
        name:'Importar',
        url:'/home',
        exact: true,
        component: Home,
    },
    {
        name:'Exportar',
        url:'/search-items',
        exact: true,
        component: SearchItems,
    },
]

export default PATHS;