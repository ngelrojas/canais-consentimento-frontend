import { useState, useCallback } from 'react';
import BasicButtons from "../../components/button";
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { DateOpt, DataOpt, 
  ErrorPhone, ErrorCpfCnpj, ErrorDate, DataSubmit } from '../../services';
import TextField from '@mui/material/TextField';
import  MaskCustom  from '../../components/input_opt/mask_opt';
import { isWithin90Days, FormatPhone, isCpfCnpjValid } from '../../utils';
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

    const IsTelefone = (phone_number: any, phone_number_unformat: any) => {
      let p_number = phone_number.length > 0 && phone_number.length <= 11 ? phone_number_unformat : '';
      setSendData((prevState) => ({ ...prevState, dataOpt: { ...prevState.dataOpt, numberformat: p_number }}));
      
      let p_number_error = p_number ? '' : 'Telefono inválido';
      let p_number_bool = p_number ? false : true;
      setErrors((prevState) => ({ ...prevState, phoneE: { ...prevState.phoneE, phone_error: p_number_error, error: p_number_bool } }));

    }

    const handleTelefone = (event: React.ChangeEvent<HTMLInputElement>) => {
      let phone_number_unformat = event.target.value;
      let phone_number = FormatPhone(event.target.value);
      IsTelefone(phone_number, phone_number_unformat);
    };
    // TODO: Refactor this function
    const IsCpjCnpj = (event: any) => {
      if (isCpfCnpjValid(event)) {
        setErrors((prevState) => ({ ...prevState, cpfCnpjE: { ...prevState.cpfCnpjE, cpf_cnpj_error: '', error: false } }));
      } else {
        setErrors((prevState) => ({ ...prevState, cpfCnpjE: { ...prevState.cpfCnpjE, cpf_cnpj_error: 'CPF/CNPJ inválido', error: true } }));
      }
    }
    
    const handleCpfCnpj = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSendData((prevState) => ({ ...prevState, dataOpt: { ...prevState.dataOpt, textmask: event.target.value } }));
      IsCpjCnpj(event.target.value);
    };

    const handleChangeD = useCallback((e: any, type: string) => {
        try{

          let date = e.$d.toISOString();
          
          if (type === "start") {
            setSendData((prevState) => ({ ...prevState, dateOpt: { ...prevState.dateOpt, date_init: date } }));
            setSendData((prevState) => ({ ...prevState, errorDate: { date_init_error: '', date_end_error: '' } }));
          } else {
            setSendData((prevState) => ({ ...prevState, dateOpt: { ...prevState.dateOpt, date_end: date } }));
            setSendData((prevState) => ({ ...prevState, errorDate: { date_init_error: '', date_end_error: '' } }));
          }
        }catch(e: any){
          setSendData((prevState) => ({ ...prevState, errorDate: { date_init_error: e?.message, date_end_error: e?.message } }));
        }
      }, []);

    const handleSubmit = (data: any) => {
      data.preventDefault();
      const { dateOpt, dataOpt } = sendData;
      const { isValid, errorMessages } = validateInputs(
        dateOpt.date_init,
        dateOpt.date_end,
        dataOpt.textmask,
        dataOpt.numberformat
      );
      if (isValid) {
        console.log("Form data is valid, submitting...");
        let formatPhone = FormatPhone(dataOpt.numberformat);
        const dataSubmit: DataSubmit = {
          date_init: dateOpt.date_init,
          date_end: dateOpt.date_end,
          cpf_cnpj: dataOpt.textmask,
          telefone: formatPhone,
        };
        console.log('data submit => ', dataSubmit);
        // Do something here to submit the form
      } else {
        console.log("Form data is invalid, please fix the errors:");
        console.log(errorMessages);
      }
    };
    
    const validateInputs = (date_init: string, date_end: string, cpf_cnpj: string, telefone: string) => {
      let isValid = true;
      let errorMessages: string[] = [];

      // Validate DATE_INIT and DATE_END
      if (!date_init.trim()) {
        errorMessages.push("Date Init is required");
        // setSendData((prevState) => ({ ...prevState, errorDate: { date_error: 'Date Init is required' } }));
        setSendData((prevState) => ({ ...prevState, errorDate: { date_init_error: errorMessages[0], date_end_error: errorMessages[1] } }));
        isValid = false;
      }
      if (!date_end.trim()) {
        errorMessages.push("Date End is required");
        setSendData((prevState) => ({ ...prevState, errorDate: { date_init_error: errorMessages[0], date_end_error: errorMessages[1] } }));
        // setSendData((prevState) => ({ ...prevState, errorDate: { date_error: 'Date End is required' } }));
        isValid = false;
      }
      if (date_init && date_end && new Date(date_end) < new Date(date_init)) {
        errorMessages.push("Date End should not be less than Date Init");
        setSendData((prevState) => ({ ...prevState, errorDate: { date_90_error: errorMessages[0] } }));
        isValid = false;
      }
      if(date_init && date_end && !isWithin90Days(new Date(date_init), new Date(date_end))){
        errorMessages.push("Date End should not be more than 90 days from Date Init");
        setSendData((prevState) => ({ ...prevState, errorDate: { date_90_error: errorMessages[0] } }));
        isValid = false;
      }
    
      // Validate CPF/CNPJ
      if (!cpf_cnpj.trim()) {
        errorMessages.push("CPF/CNPJ is required");
        IsCpjCnpj('');
        isValid = false;
      }
      if (cpf_cnpj && !isCpfCnpjValid(cpf_cnpj)) {
        errorMessages.push("CPF/CNPJ is invalid");
        isValid = false;
      }
    
      // Validate TELEFONE
      if (!telefone.trim()) {
        errorMessages.push("Telefone is required");
        IsTelefone('','');
        isValid = false;
      }
      
      return { isValid, errorMessages };
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
                                  onChange={(e)=>handleChangeD(e, 'start')}
                                  />
                                  <span>{sendData.errorDate.date_init_error}</span>
                              </FormControl>    
                              <FormControl variant="standard">
                                  <DatePicker
                                  slotProps={{textField: {size: 'small'}}} 
                                  label="Data End" 
                                  onChange={(e) => handleChangeD(e, 'end')}
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
                                    onChange={handleTelefone}
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
