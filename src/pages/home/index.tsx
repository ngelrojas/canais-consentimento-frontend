import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import FormOpt from '../../components/formOpt';
import EnhancedTable from '../../components/tableOpt';
import CardOpt from '../../components/cardOpt';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { LABEL_HOME } from '../../constants';
export default function Home () {
    return(
        <>
            <Box sx={{margin:5 }}>    
                
                <Grid sx={{justifyContent: 'center', textAlign: 'center', color: '#F9DD17'}} container spacing={{ xs: 2, md: 10 }} >
                    <Toolbar>
                        <Grid xs={12} md={4}>
                            <CardOpt>
                                <Typography sx={{justifyContent: 'center'}} variant="subtitle1" >
                                    
                                    {LABEL_HOME.titleRegister}
                                    
                                </Typography>
                                <Typography sx={{justifyContent: 'center'}} variant="h2" >
                                    2987
                                </Typography>
                            </CardOpt>      
                        </Grid>
                        <Grid xs={12} md={4}>
                            <CardOpt>
                                <Typography sx={{justifyContent: 'center'}} variant="subtitle1">
                                    {LABEL_HOME.titleOptIn}
                                </Typography>
                                <Typography sx={{justifyContent: 'center'}} variant="h2" >
                                    2987
                                </Typography>
                            </CardOpt>      
                        </Grid>
                        <Grid xs={12} md={4}>
                            <CardOpt>
                                <Typography sx={{justifyContent: 'center'}} variant="subtitle1">
                                    {LABEL_HOME.titleOptOut}
                                </Typography>
                                <Typography sx={{justifyContent: 'center'}} variant="h2" >
                                    2987
                                </Typography>
                            </CardOpt>    
                        </Grid>
                    </Toolbar>
                </Grid>

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
