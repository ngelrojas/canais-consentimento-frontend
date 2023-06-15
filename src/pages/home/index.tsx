import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import FormOpt from '../../components/formOpt';
import EnhancedTable from '../../components/tableOpt';
import Divider from '@mui/material/Divider';
import ListCardsInOut from '../../components/listCard';
import { useNavigate } from 'react-router-dom';
import { LocalStorageService } from '../../services/service.token';
import Header from '../../components/header';
import Footer from '../../components/footer';

export default function Home () {
    const localStorage = new LocalStorageService();
    const authIn = localStorage.getItem('loggedIn');
    const navigate = useNavigate();

    useEffect(() => {

        if (!authIn) {
            navigate('/');
        }
    }, [authIn]);

    return(
        <>
            <Header />
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
            <Footer />
        </>
    )
}
