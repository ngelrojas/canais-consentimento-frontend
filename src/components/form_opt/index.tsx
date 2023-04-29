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

    const handleSubmit = (data: any) => {
        console.log('SEND DATA: ',data);
    }

    return(
        <>
            <Box>
                <Grid container>
                    <Grid xs={12}>

                        <form onSubmit={handleSubmit}>
                            <Grid xs={6}>
                                <DateSPicker 
                                    handleSelectedDates={handleSelectedDates}
                                />
                            </Grid>
                            <Grid xs={6}>
                                <InputOpt handleInput={handleInput} />
                            </Grid>
                            <Grid xs={6}>
                                <BasicButtons />
                            </Grid>
                        </form>

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
