import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

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
    <Grid2 >
        <FormControl variant="standard">
        <FormControlLabel control={
            <Checkbox
            onChange={handleChangeInOut} 
            inputProps={{'aria-label': 'opt-in'}} />} label="OPT IN" />
        <FormControlLabel control={
            <Checkbox
            onChange={handleChangeInOut} 
            inputProps={{'aria-label': 'opt-out'}} />} label="OPT OUT" />
        </FormControl>
    </Grid2>
  );
}