import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';
export function isWithin90Days(init: Date, end: Date): boolean {
    const diffMs = Math.abs(end.getTime() - init.getTime());
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays <= 90;
}

export function FormatPhone (phone_number_unformat: any) {
    let remove_chars = phone_number_unformat.replace(/[^a-zA-Z0-9,;\-.!?]/g, "");
    let phone_number = remove_chars.replace(/-/g, "");
    return phone_number;
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
