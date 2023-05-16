import Grid from '@mui/material/Unstable_Grid2';
import CardOpt from '../../components/cardOpt';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTotalCanais } from '../../hooks';

//TODO: create a services to login with server, and get token
export default function ListCardsInOut () {
    let token = ';laksjdhlfaksjd';
    const totalCanais = useTotalCanais(token);
    
    return(

        <Grid sx={{justifyContent: 'center', textAlign: 'center', color: '#F9DD17'}} container spacing={{ xs: 2, md: 10 }} >
            <Toolbar>
<Grid xs={12} md={4} >
                            <CardOpt>
                                <Typography sx={{justifyContent: 'center'}} variant="subtitle1" >
                                    
                                    TOTAL REGISTROS
                                    
                                </Typography>
                                <Typography sx={{justifyContent: 'center'}} variant="h2" >
                                    237
                                </Typography>
                            </CardOpt>      
                        </Grid>
                        <Grid xs={12} md={4} >
                            <CardOpt>
                                <Typography sx={{justifyContent: 'center'}} variant="subtitle1" >
                                    
                                    TOTAL REGISTROS OPT IN
                                    
                                </Typography>
                                <Typography sx={{justifyContent: 'center'}} variant="h2" >
                                    34
                                </Typography>
                            </CardOpt>      
                        </Grid>
                        <Grid xs={12} md={4} >
                            <CardOpt>
                                <Typography sx={{justifyContent: 'center'}} variant="subtitle1" >
                                    
                                    TOTAL REGISTROS OPT OUT
                                    
                                </Typography>
                                <Typography sx={{justifyContent: 'center'}} variant="h2" >
                                    23
                                </Typography>
                            </CardOpt>      
                        </Grid>
                {/* {totalCanais && totalCanais.data.map((canal:any) => {
                    return(
                        <Grid xs={12} md={4} key={canal.id}>
                            <CardOpt>
                                <Typography sx={{justifyContent: 'center'}} variant="subtitle1" >
                                    
                                    {canal.totalName}
                                    
                                </Typography>
                                <Typography sx={{justifyContent: 'center'}} variant="h2" >
                                    {canal.totalRegistro}
                                </Typography>
                            </CardOpt>      
                        </Grid>
                    )
                })} */}
            </Toolbar>
        </Grid>

    )
}
