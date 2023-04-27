import { useState } from 'react';
import BasicButtons from "../../components/button";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import DateSPicker from "../../components/date_picker";
import InputOpt from '../input_opt';

export default function FormOpt () {

    const handleSelectedDates = (date_opt: any) => {
        console.log('DATES: ', date_opt[0].init);
        console.log('DATES: ', date_opt[0].end);
    }

    const handleInput = (event: any) => {
        console.log('cpf/cpnj: ',event.textmask);
        console.log('telefone: ',event.numberformat);
    }

    return(
        <>
            <Box>
                <Grid container>
                    <Grid xs={12}>
                        <DateSPicker 
                            handleSelectedDates={handleSelectedDates}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <InputOpt handleInput={handleInput} />
                    </Grid>
                    
                </Grid>
            </Box>
        </>
    )
}
