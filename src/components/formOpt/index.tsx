import { useState, useCallback } from 'react';
import ButtonSubmit from "../button";
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
import { MSG_ERRORS, LABEL_FORM } from '../../constants';
import { AiOutlinePhone, AiOutlinePicRight } from 'react-icons/ai';
import { MsgError, Form, ContainerData } from '../../styles/form.style';
import Button from '@mui/material/Button';
import { useFilterCanais } from '../../hooks';

export default function FormOpt () {
    const [filter, setFilter] = useState<string>('');
    useFilterCanais(filter);
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
      if(!phone_number_bool){
        setErrors((prevState:any) => ({ ...prevState, phoneE: { ...prevState.phoneE, phone_error: phone_number_error, error: phone_number_bool } }));
      }
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
        let dataInicio = '2023-01-01T03:00:00.000Z';
        let dataFim = '2023-03-01T03:00:00.000Z';
        const filter = `dataInicio=${dataInicio}&dataFim=${dataFim}`;
        // const filter = ''
        setFilter(filter);
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

    const handleReset = () => {
      setSendData((prevState) => ({ ...prevState, dateOpt: { ...prevState.dateOpt, date_init: '' } }));
      setSendData((prevState) => ({ ...prevState, dateOpt: { ...prevState.dateOpt, date_end: '' } }));
      setSendData((prevState) => ({ ...prevState, dataOpt: { ...prevState.dataOpt, textmask: '' } }));
      setSendData((prevState) => ({ ...prevState, dataOpt: { ...prevState.dataOpt, numberformat: '' } }));

      setSendData((prevState) => ({ ...prevState, errorDate: { date_init_error: '', date_end_error: '' }}));
      setSendData((prevState) => ({ ...prevState, errorDate: { date_90_error: '' } }));
      setErrors((prevState) => ({ ...prevState, cpfCnpjE: { ...prevState.cpfCnpjE, cpf_cnpj_error: '', error: false } }));
      setErrors((prevState:any) => ({ ...prevState, phoneE: { ...prevState.phoneE, phone_error: '', error: false } }));
    }
    
    return(
        <>
          <Box>
              <ContainerData>
                <Grid container spacing={4}>
                  <Form onSubmit={handleSubmit}>
                    <Box  sx={{
                      display: 'flex',
                      '& > :not(style) + :not(style)': {
                        ml: 8,
                      },
                    }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid xs={12} md={4}>
                          <FormControl  variant="standard">
                              <DatePicker
                                value={sendData.dateOpt.date_init || null}
                                slotProps={{textField: {size: 'small'}}} 
                                label={LABEL_FORM.data_init}
                                onChange={(e)=>handleDate(e, 'date_init')}
                              />
                              {sendData.errorDate.date_init_error ? <MsgError>{sendData.errorDate.date_init_error}</MsgError>: ''}
                              
                              {sendData.errorDate.date_90_error ? 
                              <MsgError>{sendData.errorDate.date_90_error}</MsgError>: ''}
                          </FormControl>
                        </Grid>
                        
                        <Grid xs={12} md={4}>
                          <FormControl variant="standard">
                              <DatePicker
                                value={sendData.dateOpt.date_end || null}
                                slotProps={{textField: {size: 'small'}}} 
                                label={LABEL_FORM.data_end}
                                onChange={(e) => handleDate(e, 'date_end')}
                              />
                              {sendData.errorDate.date_end_error ? <MsgError>{sendData.errorDate.date_end_error}</MsgError>: ''}
                              
                          </FormControl>
                        </Grid>
                      </LocalizationProvider>
                                     
                      <Grid xs={12} md={4}>
                        <FormControl variant="standard">
                            <TextField
                                size='small'
                                label={LABEL_FORM.cpf_cnpj}
                                value={sendData.dataOpt.textmask || ''}
                                onChange={handleCpfCnpj}
                                name="textmask"
                                id="cpf-cnpj-opt"
                                InputProps={{
                                  endAdornment: <AiOutlinePicRight size={25} />
                                }}
                                error={errors.cpfCnpjE.error}
                            />
                            {errors.cpfCnpjE.error ? <MsgError>{errors.cpfCnpjE.cpf_cnpj_error}</MsgError>: ''}
                            
                        </FormControl>
                      </Grid>

                      <Grid xs={12} md={4}>
                        <FormControl variant="standard">  
                            <TextField
                                size='small'
                                label={LABEL_FORM.phone}
                                value={sendData.dataOpt.numberformat || null}
                                onChange={handleTelephone}
                                name="numberformat"
                                id="telefone-opt"
                                InputProps={{
                                    inputComponent: MaskCustom as any,
                                    inputProps: { mask: '(00)000-000-000' },
                                    endAdornment: <AiOutlinePhone size={25} />
                                }}

                                error={errors.phoneE.error}
                            />
                            {errors.phoneE.error ? <MsgError>{errors.phoneE.phone_error}</MsgError>: ''}
                            
                        </FormControl>
                      </Grid>
                              
                  </Box>

                  <Box sx={{display: 'flex', justifyContent: 'center', mt: 5}}>
                    <ButtonSubmit />
                    <Button type='reset' onClick={handleReset} >{LABEL_FORM.clear}</Button>
                  </Box>
              </Form>
            </Grid>
          </ContainerData>
        </Box>
      </>
    )
}
