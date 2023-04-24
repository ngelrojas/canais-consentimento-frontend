import BasicButtons from "../../components/button";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

const Home = () => {
    return(
        <Box sx={{marginTop:5 }}>
            <Grid container>
                <Grid xs={12}>
                    <BasicButtons />    
                </Grid>
                <Grid xs={12}>
                    <BasicButtons />    
                </Grid>
            </Grid>
        </Box>

    )
}

export default Home;