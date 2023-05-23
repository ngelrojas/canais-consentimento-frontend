import { useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import CardOpt from '../../components/cardOpt';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCanaisStore, useTotalRegister} from '../../store';

export default function ListCardsInOut () {
    let totalCanais = useCanaisStore((state) => state.filterCanais);
    let totalIn = useTotalRegister((state) => state.totalIn);
    let totalOut = useTotalRegister((state) => state.totalOut);

    return(

        <Grid sx={{justifyContent: 'center', textAlign: 'center', color: '#F9DD17'}} container spacing={{ xs: 2, md: 10 }} >
            <Toolbar>
<Grid xs={12} md={4} >
                            <CardOpt>
                                <Typography sx={{justifyContent: 'center'}} variant="subtitle1" >
                                    
                                    TOTAL REGISTROS
                                    
                                </Typography>
                                <Typography sx={{justifyContent: 'center'}} variant="h2" >
                                    {totalCanais ? totalCanais.data[0]?.dados.totalElements : 0}
                                </Typography>
                            </CardOpt>      
                        </Grid>
                        <Grid xs={12} md={4} >
                            <CardOpt>
                                <Typography sx={{justifyContent: 'center'}} variant="subtitle1" >
                                
                                    TOTAL REGISTROS OPT IN
                                
                                </Typography>
                                <Typography sx={{justifyContent: 'center'}} variant="h2" >
                                    {totalIn ? totalIn : 0}
                                </Typography>
                            </CardOpt>      
                        </Grid>
                        <Grid xs={12} md={4} >
                            <CardOpt>
                                <Typography sx={{justifyContent: 'center'}} variant="subtitle1" >
                                    
                                    TOTAL REGISTROS OPT OUT
                                    
                                </Typography>
                                <Typography sx={{justifyContent: 'center'}} variant="h2" >
                                    {totalOut ? totalOut : 0}
                                </Typography>
                            </CardOpt>      
                        </Grid>
            </Toolbar>
        </Grid>

    )
}
