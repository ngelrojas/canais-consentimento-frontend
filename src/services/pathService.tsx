export default interface IPATH {
    name?: string;
    url: string;
    exact: boolean;
    component: React.FC;
}