import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import PATHS from '../../routes/paths';

export default function MenuNavBar() {

  return (
    <AppBar position="static" sx={{backgroundColor: '#F9DD17'}}>
      <Container sx={{width: '100%', paddingLeft: '0px!important', paddingRight: '0px!important'}} maxWidth="xl">
        <Toolbar disableGutters>
        
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
                paddingTop: '0.5%',
                paddingBottom: '1%',
                '& > :not(style) + :not(style)': {
                  ml: 1,
                },
              }}>
              <div>
                <p>BRASILSEG</p>
                <p>Gestao de OptIn/Out</p>
              </div>
            </Box>
            <Box sx={{
                width: '100%', 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'left',
                backgroundColor: '#0038A7',
                paddingLeft: '8%',
                '& > :not(style) + :not(style)': {
                  ml: 1,
                },
              }}>
              {PATHS.map((page, index) => (
                 <Link
                  underline='none'
                  rel="noopener"
                  key={index}
                  href={page.url}
                  sx={{ 
                    my: 1, 
                    fontWeight: '400', 
                    color: '#F9DD17',
                    display: 'block',
                   }}
                >
                {page.name}
                </Link>
              ))}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}