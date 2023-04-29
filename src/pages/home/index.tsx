import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import FormOpt from '../../components/form_opt';
import EnhancedTable from '../../components/table_opt';

export default function Home () {
    

    return(
        <>
            <Box sx={{margin:5 }}>
                <Grid container>
                    <Grid xs={12}>
                        
                        <Grid xs={6}>
                            <FormOpt />      
                        </Grid>

                        <Grid xs={6}>
                            <EnhancedTable />
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
