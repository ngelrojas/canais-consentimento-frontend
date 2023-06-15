import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import { AiOutlineDownload, AiOutlineUpload, AiOutlineLogout } from "react-icons/ai";
import { Span, Main } from '../../styles/menus.style';
import ModalExpImp from '../modalExIm';
import { MSG_MENUBAR } from '../../constants';
import { useAuthStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { LogoutContainer } from './styles';

export default function MenuNavBar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

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
                <Grid2 xs={8} md={4}>
                    
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
                <Grid2 sx={{fontWeight: '500', paddingTop: '1.5%'}} xs={4} md={8}>{MSG_MENUBAR.titleCenter}</Grid2>
              </Grid2>
            </Box>
            <Box sx={{
                width: '100%', 
                display: 'flex',
                backgroundColor: '#0038A7',
                textTransform: 'capitalize',
                paddingLeft: '7%',
                '& > :not(style) + :not(style)': {
                  ml: 7,
                },
              }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
                <ModalExpImp title={MSG_MENUBAR.titleImport} subtitle={MSG_MENUBAR.titleMailing}>
                  <AiOutlineDownload fontSize={25} /> <Span>{MSG_MENUBAR.titleImport} {MSG_MENUBAR.titleMailing}</Span>
                </ModalExpImp>

                <ModalExpImp title={MSG_MENUBAR.titleExport} subtitle={MSG_MENUBAR.titleMailing}>
                  <AiOutlineUpload fontSize={25} /> <Span>{MSG_MENUBAR.titleExport} {MSG_MENUBAR.titleMailing}</Span>
                </ModalExpImp>
              </Box>
              
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingLeft: '72%',
              }}>
                <LogoutContainer onClick={handleLogout}>
                  <AiOutlineLogout fontSize={22} />
                </LogoutContainer>
              </Box>
            </Box>
          </Box>
        </Main>
      </Main>
    </AppBar>
  );
}