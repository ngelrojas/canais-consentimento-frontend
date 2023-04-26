import { useState } from 'react';
import BasicButtons from "../../components/button";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import DateSPicker from "../../components/date_picker";

export default function Home () {
    const [dateInit, setDateInit] = useState<string>('');
    const [dateEnd, setDateEnd] = useState<string>('');

    const handleDateInit = (date_ini: any) => {
        // console.log('HERE IN SEARCH ITEMS - DATE INIT: ', date_ini)
        setDateInit(date_ini);
    }
    
    const handleDateEnd = (date_end: any) => {
        // console.log('HERE IN SEARCH ITEMS - DATE END: ', date_end)
        setDateEnd(date_end);
    }

    return(
        <>
            <Box sx={{margin:5 }}>
                <Grid container>
                    <Grid xs={12}>

                        <DateSPicker 
                            handleDateInit={handleDateInit}
                            handleDateEnd={handleDateEnd}
                        />

                    </Grid>
                    <Grid sx={{marginTop:5}} xs={12}>
                        <BasicButtons />    
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
