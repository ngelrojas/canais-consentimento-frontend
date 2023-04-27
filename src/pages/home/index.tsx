import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import FormOpt from '../../components/form_opt';

export default function Home () {
    

    return(
        <>
            <Box sx={{margin:5 }}>
                <Grid container>
                    <FormOpt />      
                </Grid>
            </Box>
        </>
    )
}
