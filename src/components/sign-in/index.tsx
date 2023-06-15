import * as React from 'react';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAuthStore } from '../../store';
import  { useNavigate }  from 'react-router-dom';
import { LocalStorageService } from '../../services/service.token';
import { LABEL_MSG_LOGIN, LABEL_COPY_RIGHT } from '../../constants';
import './styles/sign_in.css';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {LABEL_COPY_RIGHT.copyRight}
      <Link color="inherit" href="https://mui.com/">
        {LABEL_COPY_RIGHT.company}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function ErrorAuth(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      
      <span color="inherit">
        {LABEL_MSG_LOGIN.errorLogin}
      </span>
    </Typography>
  );
}

export default function SignIn() {
  
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const localStorage = new LocalStorageService();
  const authIn = localStorage.getItem('loggedIn');
  const errorLogin = localStorage.getItem('errorLogin');
  const [errors, setErrors] = React.useState(false);
  const [opacity , setOpacity] = React.useState(false);
    
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    if(validationForm(data)){
      setOpacity(true);
      setErrors(false);
      login(data.get('email') as string, data.get('password') as string);
    }else{
      setErrors(true);
      setOpacity(false);
    }
    
  };

  function validationForm(data: any) {
    let email = data.get('email')
    let password = data.get('password')

    if (email.length == 0 || password.length == 0) {  
      return false;
    } else {
      
      return true;
    }
  }

  
  React.useEffect(() => {
    if (authIn === 'true') {
      navigate('/home');
    }

  }, [authIn]);

  return (
    <Container sx={{ padding: '5%', transition:"0.8s linear"}}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className={opacity ? 'hide' : 'show'}
        >
            <Grid2 container>
              <Grid2 sx={{
                borderBottom: '2px solid #F9DD17',
                borderTop: '2px solid #F9DD17',
                borderLeft: '2px solid #F9DD17',
                paddingTop: '.5%',
                paddingLeft: '1%'}} xs={2} md={2}>
                <Typography sx={{fontWeight: 'bold', color: '#0038A7'}} variant='h4'>B</Typography>
              </Grid2>
              <Grid2 sx={{
                borderBottom: '2px solid #F9DD17',
                borderTop: '2px solid #F9DD17',
                borderRight: '2px solid #F9DD17',
                paddingRight: '1%'}} xs={10} md={10}>
                <Typography sx={{fontWeight: 'bold', marginTop:'6%', color: '#0038A7'}} variant='h5'>RASILSEG</Typography>
              </Grid2>
            </Grid2>
          
          <Box sx={{marginTop: '6%'}} />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={LABEL_MSG_LOGIN.field_user}
              name="email"
              type='email'
              autoComplete="username"
              autoFocus 
              aria-invalid="true" 
              aria-errormessage="email-error"
              error={errors}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={LABEL_MSG_LOGIN.field_password}
              type="password"
              id="password"
              autoComplete="current-password"
              error={errors}
            />
            {
              errorLogin === 'true' ? <ErrorAuth sx={{ mt: 1, mb: 1, color: 'red' }} /> : ''
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {LABEL_MSG_LOGIN.btn_txt_login}
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Container>
  );
}