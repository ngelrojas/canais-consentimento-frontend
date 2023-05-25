import { cpf as cpfValidator, cnpj as cnpjValidator, cpf } from 'cpf-cnpj-validator';
import { MSG_ERRORS} from '../constants';
export function isWithin90Days(init: Date, end: Date): boolean {
    const diffMs = Math.abs(end.getTime() - init.getTime());
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays <= 90;
}

export function FormatPhone (phone_number_unformat: any) {
    const phone_number = phone_number_unformat.replace(/[^a-zA-Z0-9,;\-.!?]/g, "").replace(/-/g, "");
    return phone_number;
}

export function FormatCpfCnpj(cpf_cnpj: any){
    let cpf_cnpj_format = cpf_cnpj.replace(/[-.]/g, "").replace(/\//g, "");
    return cpf_cnpj_format;
}

export function isCpfCnpjValid (value: string) {
    const onlyNumbers = value.replace(/\D/g, '');

    if ( onlyNumbers && onlyNumbers.length === 11) {
        return cpfValidator.isValid(onlyNumbers);
    } else if (onlyNumbers.length === 14) {
        return cnpjValidator.isValid(onlyNumbers);
    }
    return false;
};

export function isTelephone (phone_number: any, phone_number_unformat: any) {
    let p_number = phone_number.length > 0 && phone_number.length <= 11 ? phone_number_unformat : '';
    let p_number_error = p_number ? '' : MSG_ERRORS.phone_error;
    let p_number_bool = p_number ? false : true;

    return {
        phone_number: p_number, 
        phone_number_error: p_number_error,
        phone_number_bool: p_number_bool
    };
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';
export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
    ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
        return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export function handleSendData (date_init: any, date_end: any, cpf_cnpj: string, telefone: string) {
    let filter = '';
    if(date_init && date_end && cpf_cnpj && telefone){
      return filter = `dataInicio=${date_init}&dataFim=${date_end}&cpfCnpj=${cpf_cnpj}&telefone=${telefone}`
    }else if(date_init && date_end && cpf_cnpj){
      return filter = `dataInicio=${date_init}&dataFim=${date_end}&cpfCnpj=${cpf_cnpj}`
    }else if(date_init && date_end && telefone){
      return filter = `dataInicio=${date_init}&dataFim=${date_end}&telefone=${telefone}`
    }else if(date_init && date_end){
      return filter = `dataInicio=${date_init}&dataFim=${date_end}`
    }else if(cpf_cnpj){
      return filter = `cpfCnpj=${cpf_cnpj}`
    }else if(telefone){
      return filter = `telefone=${telefone}`
    }else{
        return filter = ''
    }
}

export function getCurrentDateTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();
    const dateString = `${year}-${month}-${date}`; 

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const timeString = `${hours}:${minutes}:${seconds}`; 

    const currentDateTimeString = `${dateString} ${timeString}`;
    return currentDateTimeString;
}