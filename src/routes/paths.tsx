import Home from "../pages/home/Home";

interface IPath {
    path: string;
    exact: boolean;
    component: React.FC;
}

const PATHS: IPath[] = [
    {
        path:'/',
        exact: true,
        component: Home,
    }
]

export default PATHS;