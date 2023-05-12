import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MSG_TABLE_FILTER } from '../../constants';

export default function CheckOpt({handleCheckOut}:any) {
  
  const handleChangeInOut = (event: React.ChangeEvent<HTMLInputElement>) => {
    const elIn = event.target.ariaLabel === 'opt-in';
    const elOut = event.target.ariaLabel === 'opt-out';
    const elValue = event.target.checked;
    
    if(elIn && elValue){
      handleCheckOut(elIn, elOut, elValue);
    }else if(elOut && elValue){
        handleCheckOut(elIn, elOut, elValue);
    }else{
        handleCheckOut(false, false, false);
    }
  }
  
  return (
    <Box  sx={{
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      '& > :not(style) + :not(style)': {
        ml: 1,
      },
    }}>
        <FormControlLabel control={
            <Checkbox
            onChange={handleChangeInOut} 
            inputProps={{'aria-label': 'opt-in'}} />} label={MSG_TABLE_FILTER.opt_in} />
        <FormControlLabel control={
            <Checkbox
            onChange={handleChangeInOut} 
            inputProps={{'aria-label': 'opt-out'}} />} label={MSG_TABLE_FILTER.opt_out} />
    </Box>
  );
}