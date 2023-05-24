import { ConstErrorMsg, HeadCell } from "../services";

export const MSG_ERRORS:ConstErrorMsg = {
    date_init_error: 'data inicio e requerido',
    date_end_error: 'data de fim e requerido',
    date_between_error: 'Data de fim nao deberia ser menor a data de inicio',
    date_90_error: 'as datas entre data inicio e data fim nao deberiam ser mas de 90 dias',
    cpf_cnpj_required: 'CPF/CNPJ e requiredio',
    cpf_cnpj_invalid: 'CPF/CNPJ e invalido',
    phone_error: 'Telefone/Celular e invalido',
    msg_bool: true
}

export const MSG_TABLETOOLBAR = {
    selected: 'selecionado(s)',
}

export const MSG_TABLE_FILTER = {
    search: 'PESQUISAR POR CPF/CNPJ OU TELEFONE',
    opt_in: 'OPT IN',
    opt_out: 'OPT OUT',
    dense: 'Cumprido',
}

export const HEADCELLS: readonly HeadCell[] =[
    {
        id: 'cpfCnpj',
        numeric: false,
        disablePadding: true,
        label: 'CPF/CNPJ',
    },
    {
        id: 'telefone',
        numeric: true,
        disablePadding: false,
        label: 'Telefone',
    },
    {
        id: 'dataAtualizacao',
        numeric: true,
        disablePadding: false,
        label: 'Ultima Atualização',
    },
    {
        id: 'dataCriacao',
        numeric: true,
        disablePadding: false,
        label: 'Primeiro Consentimento',
    },
    {
        id: 'sistemaOrigem',
        numeric: true,
        disablePadding: false,
        label: 'Canal',
    },
    {
        id: 'inOptInOut',
        numeric: true,
        disablePadding: false,
        label: 'Opção',
    },
]

export type Order = 'asc' | 'desc';

export const MSG_MENUBAR = {
    titleImport: 'Importar',
    titleExport: 'Exportar',
    titleMailing: 'Mailing',
    titleCenter: 'Gestão de OPT IN/OUT',
    close: 'Fechar',
    titleUploadFile: 'Selecionar arquivo',
}

export const LABEL_FORM = {
    data_init: 'DATA INÍCIO',
    data_end: 'DATA FIM',
    cpf_cnpj: 'CPF/CNPJ',
    phone: 'TELEFONE',
    clear: 'LIMPAR'
}

export const LABEL_HOME = {
    titleRegister: 'TOTAL DE REGISTROS',
    titleOptIn: 'TOTAL REGISTROS OPT IN',
    titleOptOut: 'TOTAL REGISTROS OPT OUT',
}

export const PATH = {
    urlLogin: '/oauth/login?APP_NAME=cg-user-app',
    urlAPI: '/api/canais-consentimento/search',
}

export const CREDENTIALS = {
    userName: import.meta.env.VITE_APP_USERNAME,
    password: import.meta.env.VITE_APP_PASSWORD,
}

export const MODAL_MSG = {
    alertMsg: 'Nenhum dado selecionado para exportação',
    btnMsg: 'DESCARREGAR'
}