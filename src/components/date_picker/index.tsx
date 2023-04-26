import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { ContainerDatePicker } from './styled';

export default function DateSPicker({handleDateInit, handleDateEnd}:any) {

  const handleChangeInit = (e: any) => {
    let date_init = e.$d.toISOString();
    handleDateInit(date_init);
  }
  
  const handleChangeEnd = (e: any) => {
    let date_end = e.$d.toISOString();
    handleDateEnd(date_end);
  }

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        
      <DatePicker 
        slotProps={{textField: {size: 'small'} }} 
        label="Date Init" 
        onChange={handleChangeInit}
        
      />

      <DatePicker 
        slotProps={{textField: {size: 'small'}}} 
        label="Data End" 
        onChange={handleChangeEnd}
      />
        
    </LocalizationProvider>
  );
}