import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateOpt } from '../../services';


export default function DateSPicker({handleSelectedDates}:any) {
  const [fdate, setFdate] = useState<DateOpt>({
    date_init: '',
    date_end: ''
  });
  const [error, setError] = useState<any>({
    date_error: ''
  });

  const handleError = (e:any) => {
    if(e == 'invalidDate'){
      setError({...error, date_error: 'data invalida'})
      return;
    }
  }

  const handleChange = (e: any, type: string) => {
    let date = e.$d.toISOString();
    if (type === 'start') {
      handleError(e);
      setFdate({...fdate, date_init: date})
    } else {
      handleError(e);
      setFdate({...fdate, date_end: date})
    }
  }

  useEffect(() => {

    if (fdate.date_init && fdate.date_end) {
      handleSelectedDates([{'init':fdate.date_init, 'end':fdate.date_end}]);
    }
  }, [fdate, handleSelectedDates]);

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        
      <DatePicker
        slotProps={{textField: {size: 'small'}}} 
        label="Date Init" 
        onChange={(e)=>handleChange(e, 'start')}
        onError={handleError}
      />
      <span>{error.date_error}</span>

      <DatePicker
        slotProps={{textField: {size: 'small'}}} 
        label="Data End" 
        onChange={(e) => handleChange(e, 'end')}
        onError={handleError}
      />
      <span>{error.date_error}</span>
        
    </LocalizationProvider>
  );
}


