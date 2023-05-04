import { useState, useEffect, useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateOpt, ErrorState, DateSPickerProps } from '../../services';
import { MsgError } from './styled';

export default function DateSPicker({handleSelectedDates, handleErrors}: DateSPickerProps) {
  const [state, setState] = useState<{ Fdate: DateOpt; error: ErrorState }>({
    Fdate: { date_init: "", date_end: "" },
    error: { date_error: "" },
  });
  
  const handleDataErrors = useCallback((error: string) => {
    if(error){
      setState((prevState) => ({ ...prevState, error: { date_error: error } }));
      
    }
  },[]);

  const handleChange = useCallback((e: any, type: string) => {
    try{

      let date = e.$d.toISOString();
      
      if (type === "start") {
        setState((prevState) => ({ ...prevState, Fdate: { ...prevState.Fdate, date_init: date } }));
        setState((prevState) => ({ ...prevState, error: { date_error: '' } }));
      } else {
        setState((prevState) => ({ ...prevState, Fdate: { ...prevState.Fdate, date_end: date } }));
        setState((prevState) => ({ ...prevState, error: { date_error: '' } }));
      }
    }catch(e: any){
      setState((prevState) => ({ ...prevState, error: { date_error: e?.message } }));
      handleDataErrors(e?.message);
    }
  }, []);

  useEffect(() => {
    if (state.Fdate.date_init && state.Fdate.date_end) {
      handleSelectedDates([{ init: state.Fdate.date_init, end: state.Fdate.date_end }]);
    }
  }, [state.Fdate, handleSelectedDates]);

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <FormControl variant="standard">
        <DatePicker
          slotProps={{textField: {size: 'small'}}} 
          label="Date Init" 
          onChange={(e)=>handleChange(e, 'start')}
          onError={(e) => handleDataErrors(e?.message)}
        />
        <MsgError>{state.error.date_error}</MsgError>
      </FormControl>    

      <FormControl variant="standard">
        <DatePicker
          slotProps={{textField: {size: 'small'}}} 
          label="Data End" 
          onChange={(e) => handleChange(e, 'end')}
        />
        <MsgError>{state.error.date_error}</MsgError>
      </FormControl>
        
    </LocalizationProvider>
  );
}


