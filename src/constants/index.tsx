import { ConstErrorMsg } from "../services";

export const MSG_ERRORS:ConstErrorMsg = {
    date_init_error: 'data init is required',
    date_end_error: 'data end is required',
    date_between_error: 'Date End should not be less than Date Init',
    date_90_error: 'Date End should not be more than 90 days from Date Init',
    cpf_cnpj_required: 'CPF/CNPJ is required',
    cpf_cnpj_invalid: 'CPF/CNPJ is invalid',
    phone_error: 'Phone is required',
    msg_bool: true
}