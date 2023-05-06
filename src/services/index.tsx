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

export interface DateSubmit {
    date_init: string;
    date_end: string;    
}

export interface DataSubmit {
    cpf_cnpj: string;
    telephone: string;
    date_init: string;
    date_end: string;
}

export interface ConstErrorMsg {
    readonly date_init_error: string;
    readonly date_end_error: string;
    readonly date_between_error: string;
    readonly date_90_error: string;
    readonly cpf_cnpj_required: string;
    readonly cpf_cnpj_invalid: string;
    readonly phone_error: string;
    readonly msg_bool: boolean;
}