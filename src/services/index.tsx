export interface IPATH {
    name?: string;
    url: string;
    exact: boolean;
    component: React.FC;
}

export interface DateOpt{
    date_init: string,
    date_end: string
}

export interface MaskProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    mask: string;
}

export interface MaskState {
    textmask: string;
    numberformat: string;
}