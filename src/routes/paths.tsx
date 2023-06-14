import Home from "../pages/home";
import { IPATH } from '../services';

const PATHS: IPATH[] = [
    {
        url:'/home',
        exact: true,
        component: Home,
    },
    {
        name:'Importar',
        url:'/home',
        exact: true,
        component: Home,
    },
]

export default PATHS;