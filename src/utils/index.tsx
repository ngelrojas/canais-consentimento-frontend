import { cpf as cpfValidator, cnpj as cnpjValidator, cpf } from 'cpf-cnpj-validator';
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
    let p_number_error = p_number ? '' : 'Telefono inválido';
    let p_number_bool = p_number ? false : true;

    return {
        phone_number: p_number, 
        phone_number_error: p_number_error,
        phone_number_bool: p_number_bool
    };
}