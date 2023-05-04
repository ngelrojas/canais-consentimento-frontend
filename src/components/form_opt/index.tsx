import { useState, useCallback } from 'react';
import BasicButtons from "../../components/button";
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
// import DateSPicker from "../../components/date_picker";
// import InputOpt from '../input_opt';
import { DateOpt, MaskState, MsgError } from '../../services';
import TextField from '@mui/material/TextField';
import  MaskCustom  from '../../components/input_opt/mask_opt';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';
// import { ButtonBase } from '@mui/material';

export default function FormOpt () {
    const [sendData, setSendData] = useState<{Ddate: DateOpt, Tdata: MaskState}>({
        Ddate: {date_init: '', date_end: ''},
        Tdata: {textmask: '', numberformat: ''}
    });    

    const [msgError, setMsgError] = useState<MsgError>({
      errorTxt: '',
      errorBool: false
    });

    const handleChange = (event: any) => {
      
      setSendData((prevState) => ({ ...prevState, Tdata: { ...prevState.Tdata, numberformat: event.target.value } }));
    };

    const isCpfCnpjValid = (value: string) => {
      const onlyNumbers = value.replace(/\D/g, '');
      
      if (onlyNumbers.length === 11) {
        return cpfValidator.isValid(onlyNumbers);
      } else if (onlyNumbers.length === 14) {
        return cnpjValidator.isValid(onlyNumbers);
      }
      return false;
    };
    
    const handleCpfCnpjChange = (event: any) => {
      
      setSendData((prevState) => ({ ...prevState, Tdata: { ...prevState.Tdata, textmask: event.target.value } }));
      if (isCpfCnpjValid(event.target.value)) {
        setMsgError({...msgError, errorTxt: '', errorBool: false});
      } else {
        setMsgError({...msgError, errorTxt: 'CPF/CNPJ inválido', errorBool: true});
      }
    };

    const handleChangeT = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('event for both data => ', event.target.name);
      // save data CPF/CNPJ
      if(event.target.name == 'textmask'){
        handleCpfCnpjChange(event);
      } 

      if(event.target.name == 'numberformat'){
        handleChange(event);
      }
      // save data PHONE
    }

    const handleChangeD = useCallback((e: any, type: string) => {
        try{

          let date = e.$d.toISOString();
          
          if (type === "start") {
            setSendData((prevState) => ({ ...prevState, Ddate: { ...prevState.Ddate, date_init: date } }));
            setSendData((prevState) => ({ ...prevState, error: { date_error: '' } }));
          } else {
            setSendData((prevState) => ({ ...prevState, Ddate: { ...prevState.Ddate, date_end: date } }));
            setSendData((prevState) => ({ ...prevState, error: { date_error: '' } }));
          }
        }catch(e: any){
          setSendData((prevState) => ({ ...prevState, error: { date_error: e?.message } }));
        //   handleDataErrors(e?.message);
        }
      }, []);

    const handleSubmit = (data: any) => {
      data.preventDefault();
      console.log('handle submit => ',sendData);
      const { Ddate, Tdata } = sendData;
      const { isValid, errorMessages } = validateInputs(
        Ddate.date_init,
        Ddate.date_end,
        Tdata.textmask,
        Tdata.numberformat
      );
      if (isValid) {
        console.log("Form data is valid, submitting...");
        // Do something here to submit the form
      } else {
        console.log("Form data is invalid, please fix the errors:");
        console.log(errorMessages);
      }
    };
    
    
    const validateInputs = (date_init: string, date_end: string, cpf_cnpj: string, telefone: string) => {
      let isValid = true;
      let errorMessages: string[] = [];
      console.log('data init', date_init);
      // Validate DATE_INIT and DATE_END
      if (!date_init.trim()) {
        errorMessages.push("Date Init is required");
        isValid = false;
      }
      if (!date_end.trim()) {
        errorMessages.push("Date End is required");
        isValid = false;
      }
      if (date_init && date_end && new Date(date_end) < new Date(date_init)) {
        errorMessages.push("Date End should not be less than Date Init");
        isValid = false;
      }
    
      // Validate CPF/CNPJ
      if (!cpf_cnpj.trim()) {
        errorMessages.push("CPF/CNPJ is required");
        isValid = false;
      }
      if (cpf_cnpj && !isCpfCnpjValid(cpf_cnpj)) {
        errorMessages.push("CPF/CNPJ is invalid");
        isValid = false;
      }
    
      // Validate TELEFONE
      if (!telefone.trim()) {
        errorMessages.push("Telefone is required");
        isValid = false;
      }
      // You can add your own validation logic for telefone here
      
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
                                    // onError={(e) => handleDataErrors(e?.message)}
                                    />
                                    {/* <MsgError>{state.error.date_error}</MsgError> */}
                                </FormControl>    

                                <FormControl variant="standard">
                                    <DatePicker
                                    slotProps={{textField: {size: 'small'}}} 
                                    label="Data End" 
                                    onChange={(e) => handleChangeD(e, 'end')}
                                    />
                                    {/* <MsgError>{state.error.date_error}</MsgError> */}
                                </FormControl>
                                    
                            </LocalizationProvider>
                            <FormControl variant="standard">
                                <TextField
                                    label="CPF/CNPJ"
                                    value={sendData.Tdata.textmask}
                                    onChange={handleChangeT}
                                    name="textmask"
                                    id="cpf-cnpj-opt"
                                    error={msgError.errorBool}
                                />
                                <span>{msgError.errorTxt}</span>
                            </FormControl>

                            <FormControl variant="standard">  
                                <TextField
                                    label="TELEFONE"
                                    value={sendData.Tdata.numberformat}
                                    onChange={handleChangeT}
                                    name="numberformat"
                                    id="telefone-opt"
                                    InputProps={{
                                        inputComponent: MaskCustom as any,
                                        inputProps: { mask: '(00)000-000-000' },
                                    }}
                                    // error={msgError.errorBool}
                                />
                            </FormControl>
                            
                            <BasicButtons />
                        </form>

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
