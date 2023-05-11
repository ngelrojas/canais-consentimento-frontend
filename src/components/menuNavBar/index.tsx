import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
// import Toolbar from '@mui/material/Toolbar';
// import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
// import PATHS from '../../routes/paths';
// import MenuIcon from '../../routes/menuIcon';
import Button from '@mui/material/Button';
import { AiOutlineDownload } from "react-icons/ai";
import { AiOutlineUpload } from "react-icons/ai";
import { Span, Main } from '../../styles/menus.style';
export default function MenuNavBar() {

  return (
    <AppBar position="static" sx={{backgroundColor: '#F9DD17', width: 'auto'}}>
      <Main>
        <Main>
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            textTransform:'uppercase',
            typography: 'body1',
          }}>
            <Box sx={{
                width: '100%', 
                color: '#0038A7', 
                textTransform:'uppercase',
                paddingLeft: '8%',
                paddingTop: '1%',
                paddingBottom: '1%',
                paddingRight: '8%',
                '& > :not(style) + :not(style)': {
                  ml: 1,
                },
              }}>
              <Grid2 container spacing={3}>
                <Grid2 xs={4} md={4}>
                    
                  <Grid2 container>
                    <Grid2 sx={{
                      borderBottom: '2px solid #0038A7',
                      borderTop: '2px solid #0038A7',
                      borderLeft: '2px solid #0038A7',
                      paddingLeft: '1%'}} xs={3} md={3}>
                      <Typography sx={{fontWeight: 'bold'}} variant='h4'>B</Typography>
                    </Grid2>
                    <Grid2 sx={{
                      borderBottom: '2px solid #0038A7',
                      borderTop: '2px solid #0038A7',
                      borderRight: '2px solid #0038A7',
                      paddingRight: '1%'}} xs={9} md={9}>
                      <Typography sx={{fontWeight: 'bold', marginTop:'6%'}} variant='h5'>RASILSEG</Typography>
                    </Grid2>
                  </Grid2>
                    
                </Grid2>
                <Grid2 sx={{fontWeight: '500', paddingTop: '1.5%'}} xs={8} md={8}>Gestao de OptIn / Out</Grid2>
              </Grid2>
            </Box>
            <Box sx={{
                width: '100%', 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'left',
                backgroundColor: '#0038A7',
                textTransform: 'capitalize',
                paddingLeft: '8%',
                '& > :not(style) + :not(style)': {
                  ml: 4,
                },
              }}>
              <Button sx={{color: '#F9DD17', textTransform: 'capitalize'}} variant='text'>
                <AiOutlineDownload fontSize={25} /> <Span>Importar Mailing</Span>
              </Button>
              <Button sx={{color: '#F9DD17', textTransform: 'capitalize'}} variant='text'>
                <AiOutlineUpload fontSize={25} /> <Span>Exportar Mailing</Span>
              </Button>
            </Box>
          </Box>
        </Main>
      </Main>
    </AppBar>
  );
}