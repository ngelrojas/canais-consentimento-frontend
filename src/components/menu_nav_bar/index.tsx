import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import PATHS from '../../routes/paths';

function MenuNavBar() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                textTransform:'uppercase',
                typography: 'body1',
                '& > :not(style) + :not(style)': {
                  ml: 2,
                },
              }}>
            {PATHS.map((page, index) => (
              <Link
                underline='none'
                rel="noopener"
                key={index}
                href={page.url}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuNavBar;