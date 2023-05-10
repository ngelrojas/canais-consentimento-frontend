import { useState, useCallback } from 'react';
import BasicButtons from "../button";
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { 
  DateOpt, DataOpt, 
  ErrorPhone, ErrorCpfCnpj, 
  ErrorDate, DataSubmit
} from '../../services';
import TextField from '@mui/material/TextField';
import  MaskCustom  from '../inputOpt/mask_opt';
import { isWithin90Days, FormatPhone, FormatCpfCnpj, isCpfCnpjValid, isTelephone } from '../../utils';
import { MSG_ERRORS } from '../../constants';
import ComDatePicker from '../datePicker';

export default function FormOpt () {
    const [sendData, setSendData] = useState<{dateOpt: DateOpt, dataOpt: DataOpt, errorDate: ErrorDate}>({
        dateOpt: {date_init: '', date_end: ''},
        dataOpt: {textmask: '', numberformat: ''},
        errorDate: {date_init_error: '', date_end_error: '', date_90_error: ''},
    });

    const [errors, setErrors] = useState<{cpfCnpjE: ErrorCpfCnpj, phoneE: ErrorPhone}>({
      cpfCnpjE: {cpf_cnpj_error: '', error: false},
      phoneE: {phone_error: '', error: false}
    })

    const handleTelephone = (event: React.ChangeEvent<HTMLInputElement>) => {
      let phone_number_unformat = event.target.value;
      let _phone_number = FormatPhone(event.target.value);
      const {phone_number, phone_number_error, phone_number_bool} = isTelephone(_phone_number, phone_number_unformat);
      setSendData((prevState:any) => ({ ...prevState, dataOpt: { ...prevState.dataOpt, numberformat: phone_number }}));
      setErrors((prevState:any) => ({ ...prevState, phoneE: { ...prevState.phoneE, phone_error: phone_number_error, error: phone_number_bool } }));
    };
    
    const IsCpjCnpj = (cpf_cnpj: any) => {
      let msg_error = isCpfCnpjValid(cpf_cnpj) ? '' : MSG_ERRORS.cpf_cnpj_invalid;
      let msg_error_bool = isCpfCnpjValid(cpf_cnpj) ? false : true;
      setErrors((prevState) => ({ ...prevState, cpfCnpjE: { ...prevState.cpfCnpjE, cpf_cnpj_error: msg_error, error: msg_error_bool } }));
    }
    
    const handleCpfCnpj = (event: React.ChangeEvent<HTMLInputElement>) => {
      let cpf_cnpj = event.target.value;
      setSendData((prevState) => ({ ...prevState, dataOpt: { ...prevState.dataOpt, textmask: cpf_cnpj } }));
      IsCpjCnpj(cpf_cnpj);
    };

    const handleDate = useCallback((e: any, type: string) => {
        try{

          let date = e.$d.toISOString();
          setSendData((prevState) => ({ ...prevState, dateOpt: { ...prevState.dateOpt, [type]: date } }));
          setSendData((prevState) => ({ ...prevState, errorDate: { date_init_error: '', date_end_error: '' } }));
        }catch(e: any){
          setSendData((prevState) => ({ ...prevState, errorDate: { date_init_error: e?.message, date_end_error: e?.message } }));
        }
      }, []);

    const handleSubmit = (data: any) => {
      data.preventDefault();
      const { dateOpt, dataOpt } = sendData;
      const { isValid } = validateInputs(
        dateOpt.date_init,
        dateOpt.date_end,
        dataOpt.textmask,
        dataOpt.numberformat
      );
      if (isValid) {
        console.log("Form data is valid, submitting...");
        let formatPhone = FormatPhone(dataOpt.numberformat);
        let formatCpfCnpj = FormatCpfCnpj(dataOpt.textmask);
        
        const dataSubmit: DataSubmit = {
          date_init: dateOpt.date_init,
          date_end: dateOpt.date_end,
          cpf_cnpj: formatCpfCnpj,
          telephone: formatPhone,
        };
        console.log('data submit => ', dataSubmit);
        // Do something here to submit the form
      } else {
        console.log("Form data is invalid, please fix the errors:");
      }
    };
    
    const validateInputs = (date_init: string, date_end: string, cpf_cnpj: string, telefone: string) => {
      let isValid = true;

      // Validate DATE_INIT and DATE_END
      if (!date_init.trim() || !date_end.trim()) {
        setSendData((prevState) => ({ ...prevState, errorDate: { date_init_error: MSG_ERRORS.date_init_error, date_end_error: MSG_ERRORS.date_end_error }}));
        isValid = false;
      }

      if (date_init && date_end && new Date(date_end) < new Date(date_init)) {
        setSendData((prevState) => ({ ...prevState, errorDate: { date_90_error: MSG_ERRORS.date_between_error } }));
        isValid = false;
      }

      if(date_init && date_end && !isWithin90Days(new Date(date_init), new Date(date_end))){
        setSendData((prevState) => ({ ...prevState, errorDate: { date_90_error: MSG_ERRORS.date_90_error } }));
        isValid = false;
      }
    
      // Validate CPF/CNPJ
      if (!cpf_cnpj.trim()) {
        setErrors((prevState) => ({ ...prevState, cpfCnpjE: { ...prevState.cpfCnpjE, cpf_cnpj_error: MSG_ERRORS.cpf_cnpj_required, error: MSG_ERRORS.msg_bool } }));
        isValid = false;
      }
      if (cpf_cnpj && !isCpfCnpjValid(cpf_cnpj)) {
        setErrors((prevState) => ({ ...prevState, cpfCnpjE: { ...prevState.cpfCnpjE, cpf_cnpj_error: MSG_ERRORS.cpf_cnpj_invalid, error: MSG_ERRORS.msg_bool } }));
        isValid = false;
      }
    
      // Validate TELEFONE
      if (!telefone.trim()) {
        setErrors((prevState:any) => ({ ...prevState, phoneE: { ...prevState.phoneE, phone_error: MSG_ERRORS.phone_error, error: MSG_ERRORS.msg_bool } }));
        isValid = false;
      }
      
      return { isValid };
    }
    
    return(
        <>
            <Box>
                <Grid container>
                    <Grid xs={12}>

                        <form onSubmit={handleSubmit} method='post'>
                            
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
                              <FormControl variant="standard">
                                  <DatePicker
                                  slotProps={{textField: {size: 'small'}}} 
                                  label="Date Init" 
                                  onChange={(e)=>handleDate(e, 'date_init')}
                                  />
                                  <span>{sendData.errorDate.date_init_error}</span>
                              </FormControl>    
                              <FormControl variant="standard">
                                  <DatePicker
                                  slotProps={{textField: {size: 'small'}}} 
                                  label="Data End" 
                                  onChange={(e) => handleDate(e, 'date_end')}
                                  />
                                  <span>{sendData.errorDate.date_end_error}</span>
                              </FormControl>
                              <span>{sendData.errorDate.date_90_error}</span>     

                            </LocalizationProvider>

                            <FormControl variant="standard">
                                <TextField
                                    label="CPF/CNPJ"
                                    value={sendData.dataOpt.textmask}
                                    onChange={handleCpfCnpj}
                                    name="textmask"
                                    id="cpf-cnpj-opt"
                                    error={errors.cpfCnpjE.error}
                                />
                                <span>{errors.cpfCnpjE.cpf_cnpj_error}</span>
                            </FormControl>

                            <FormControl variant="standard">  
                                <TextField
                                    label="TELEFONE"
                                    value={sendData.dataOpt.numberformat}
                                    onChange={handleTelephone}
                                    name="numberformat"
                                    id="telefone-opt"
                                    InputProps={{
                                        inputComponent: MaskCustom as any,
                                        inputProps: { mask: '(00)000-000-000' },
                                    }}
                                    error={errors.phoneE.error}
                                />
                                <span>{errors.phoneE.phone_error}</span>
                            </FormControl>
                            
                            <BasicButtons />
                        </form>

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
