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

export interface DataOpt {
    textmask: string;
    numberformat: string;
}

export interface ErrorDate{
    date_init_error?: string;
    date_end_error?: string;
    date_90_error?: string;
}

// export interface DateSPickerProps{
//     handleSelectedDates: (dates: Array<{init: string; end: string}>) => void;
//     handleErrors?: (error: string) => void;
// }

export interface ErrorPhone{
    phone_error: string;
    error: boolean;
}

export interface ErrorCpfCnpj{
    cpf_cnpj_error: string;
    error: boolean;
}

export interface DataSubmit {
    cpf_cnpj: string;
    telefone: string;
    date_init: string;
    date_end: string;
}