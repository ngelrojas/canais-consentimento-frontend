import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import CardOpt from '../../components/cardOpt';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCanaisStore } from '../../store';
import {TotalRegistersContext}  from '../../context/totalRegisterContext';
import { LABEL_HOME } from '../../constants';

export default function ListCardsInOut () {
    let totalCanais = useCanaisStore((state) => state.filterCanais);
    const {totalRegisterIn, totalRegisterOut} = React.useContext(TotalRegistersContext);

    return(

        <Grid sx={{justifyContent: 'center', textAlign: 'center', color: '#F9DD17'}} container spacing={{ xs: 2, md: 10 }} >
            <Toolbar>
                <Grid xs={12} md={4} >
                    <CardOpt>
                        <Typography sx={{justifyContent: 'center'}} variant="subtitle1" >
                            
                            {LABEL_HOME.titleRegister}
                            
                        </Typography>
                        <Typography sx={{justifyContent: 'center'}} variant="h2" >
                            {totalCanais ? totalCanais.data[0]?.dados.totalElements : 0}
                        </Typography>
                    </CardOpt>      
                </Grid>
                <Grid xs={12} md={4} >
                    <CardOpt>
                        <Typography sx={{justifyContent: 'center'}} variant="subtitle1" >
                        
                            {LABEL_HOME.titleOptIn}
                        
                        </Typography>
                        <Typography sx={{justifyContent: 'center'}} variant="h2" >
                            {totalRegisterIn ? totalRegisterIn : 0}
                        </Typography>
                    </CardOpt>      
                </Grid>
                <Grid xs={12} md={4} >
                    <CardOpt>
                        <Typography sx={{justifyContent: 'center'}} variant="subtitle1" >
                            
                            {LABEL_HOME.titleOptOut}
                            
                        </Typography>
                        <Typography sx={{justifyContent: 'center'}} variant="h2" >
                            {totalRegisterOut ? totalRegisterOut : 0}
                        </Typography>
                    </CardOpt>      
                </Grid>
            </Toolbar>
        </Grid>

    )
}
