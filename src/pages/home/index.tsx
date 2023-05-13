import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import FormOpt from '../../components/formOpt';
import EnhancedTable from '../../components/tableOpt';
import Divider from '@mui/material/Divider';
import ListCardsInOut from '../../components/listCard';

export default function Home () {
    
    return(
        <>
            <Box sx={{margin:5 }}>    
                
                <ListCardsInOut />

                <Grid sx={{margin: 5}}>            
                    <Divider></Divider>
                </Grid>
                
                <Grid container spacing={3}>            
                    <Grid xs={12}>
                        <FormOpt />      
                    </Grid>
                </Grid> 

                <Grid sx={{margin: 8}} />            
                
                <Grid container spacing={3}>
                    <Grid xs={12}>
                        <EnhancedTable />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
