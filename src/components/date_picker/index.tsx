import { useState, useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { DateOpt, ErrorDate, DateSubmit } from '../../services';
import { isWithin90Days } from '../../utils';
import { MSG_ERRORS } from '../../constants';
export default function ComDatePicker () {
    const [sendData, setSendData] = useState<{dateOpt: DateOpt, errorDate: ErrorDate}>({
        dateOpt: {date_init: '', date_end: ''},
        errorDate: {date_init_error: '', date_end_error: '', date_90_error: ''},
    });

    const handleDate = useCallback((e: any, type: string) => {
        try{

          let date = e.$d.toISOString();
          setSendData((prevState) => ({ ...prevState, dateOpt: { ...prevState.dateOpt, [type]: date } }));
          setSendData((prevState) => ({ ...prevState, errorDate: { date_init_error: '', date_end_error: '' } }));
          
        }catch(e: any){
          setSendData((prevState) => ({ ...prevState, errorDate: { date_init_error: e?.message, date_end_error: e?.message } }));
        }
      }, []);

    // const handleSubmit = (data: any) => {
    //   data.preventDefault();
    //   const { dateOpt } = sendData;
    //   const { isValid } = validateInputs(
    //     dateOpt.date_init,
    //     dateOpt.date_end,
    //   );
    //   if (isValid) {
    //     console.log("Form data is valid, submitting...");
        
    //     const dataSubmit: DateSubmit = {
    //       date_init: dateOpt.date_init,
    //       date_end: dateOpt.date_end,
    //     };
    //     console.log('data submit => ', dataSubmit);
    //     // Do something here to submit the form
    //   } else {
    //     console.log("Form data is invalid, please fix the errors:");
    //   }
    // };
    
    const validateInputs = (date_init: string, date_end: string) => {
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
      
      return { isValid };
    }
    
    return(
        <>
            <Box>
                <Grid container>
                    <Grid xs={12}>

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
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
