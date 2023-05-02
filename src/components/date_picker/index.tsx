import { useState, useEffect, useCallback } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateOpt, ErrorState, DateSPickerProps } from '../../services';
import { MsgError } from './styled';

export default function DateSPicker({handleSelectedDates}: DateSPickerProps) {
  const [state, setState] = useState<{ Fdate: DateOpt; error: ErrorState }>({
    Fdate: { date_init: "", date_end: "" },
    error: { date_error: "" },
  });

  const handleError = useCallback((e: any) => {
    if (e == "invalidDate") {
      setState((prevState) => ({ ...prevState, error: { date_error: "data invalida" } }));
      return;
    }
  }, []);
  
  const handleChange = useCallback((e: any, type: string) => {
    let date = e.$d.toISOString();
    if (type === "start") {
      handleError(e);
      setState((prevState) => ({ ...prevState, Fdate: { ...prevState.Fdate, date_init: date } }));
    } else {
      handleError(e);
      setState((prevState) => ({ ...prevState, Fdate: { ...prevState.Fdate, date_end: date } }));
    }
  }, [handleError]);

  useEffect(() => {
    if (state.Fdate.date_init && state.Fdate.date_end) {
      handleSelectedDates([{ init: state.Fdate.date_init, end: state.Fdate.date_end }]);
    }
  }, [state.Fdate, handleSelectedDates]);

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        
      <DatePicker
        slotProps={{textField: {size: 'small'}}} 
        label="Date Init" 
        onChange={(e)=>handleChange(e, 'start')}
        onError={handleError}
      />
      <MsgError>{state.error.date_error}</MsgError>

      <DatePicker
        slotProps={{textField: {size: 'small'}}} 
        label="Data End" 
        onChange={(e) => handleChange(e, 'end')}
        onError={handleError}
      />
      <MsgError>{state.error.date_error}</MsgError>
        
    </LocalizationProvider>
  );
}


