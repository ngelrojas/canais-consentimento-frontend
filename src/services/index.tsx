import { Order } from "../constants";

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
    cpfCnpj: string;
    telephone: string;
    dataInicio: string;
    dataFim: string;
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

export interface DataCanais {
    cpfCnpj: string,
    telefone: string,
    dataAtualizacao: string,
    dataCriacao: string,
    sistemaOrigem: string,
    inOptInOut: string,
}

export interface DataImport {
    id?: string,
    cpfCnpj: string,
    telefone: string,
    dataAtualizacao: string,
    dataCriacao: string,
    sistemaOrigem: string,
    inOptInOut: string,
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof DataCanais;
    label: string;
    numeric: boolean;
}

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataCanais) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

export interface EnhancedTableToolbarProps {
    numSelected: number;
}

export interface CanaisStore {
    filterCanais: any;
    setFilterCanais: (data: any) => void;
};

export interface MaskProps {
    mask: string;
    name: any;
    value: any;
    [key: string]: any;
    onChange: (value: any) => void;
}

export interface LoginStore {
    userName: string;
    password: string;
    resp: any;
    setToken: (data: any) => void;
}

export interface TotalRegisters {
    totalIn: number;
    totalOut: number;
    setTotalIn: (data: number) => void;
    setTotalOut: (data: number) => void;
}

export interface nameFileCSV {
    name: string | undefined;
    size: number | undefined;
    type: string | undefined;
    lastModified: number | undefined;
    base64: string | undefined;
}

export interface FileUploadComponentProps {
    handleFileCSV: (file: nameFileCSV) => void;
}

export interface LoginFormValues {
    username: string;
    password: string;
    profile?: [];
}

export interface AuthStore {
    loggedIn: boolean;
    username: string;
    login: (username: string, password: string) => void;
    logout: () => void;
  };