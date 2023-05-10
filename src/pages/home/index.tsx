import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import FormOpt from '../../components/formOpt';
import EnhancedTable from '../../components/tableOpt';

export default function Home () {
    

    return(
        <>
            <Box sx={{margin:5 }}>
                <Grid container>
                    <Grid xs={12}>
                        
                        <Grid xs={12}>
                            <FormOpt />      
                        </Grid>
                        <br />
                        <Grid xs={12}>
                            <EnhancedTable />
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
