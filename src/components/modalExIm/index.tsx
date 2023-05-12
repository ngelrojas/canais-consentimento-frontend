import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { MdClear } from "react-icons/md";
import Grid from '@mui/material/Grid';
import ListFile from '../listFile';
import { MSG_MENUBAR } from '../../constants';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#0038A7',
  border: '2px solid #0038A7',
  borderRadius: '10px',
  boxShadow: 24,
  p: 2,
  color: '#F9DD17'
};

export default function ModalExpImp({children, title, subtitle}: any) {
  const [open, setOpen] = React.useState(false);
  const [countFile, setCountFile] = React.useState(0);
  const [nameFile, setNameFile] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCountFile(0);
    setNameFile('');
  }

  const handleFile = (e: any) => {
    setCountFile(e.target.files.length);
    setNameFile(e.target.files[0].name);
  }

  return (
    <div>
        <Button onClick={handleOpen} sx={{color: '#F9DD17', textTransform: 'capitalize'}} variant='text'>
        {children}
        </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form method='post'>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', marginBottom: '10%'}}>
                    <Typography sx={{paddingRight: '35%'}} id="transition-modal-title" variant="h6" component="h2">
                        {title} {subtitle}
                    </Typography>
                        
                    <IconButton onClick={handleClose}><MdClear color='white' /></IconButton>
                </Box>
                <Box sx={{paddingTop: '1%', paddingBottom: '1%'}}>
                    <Grid container>
                        <Grid md={6}>
                            <Button sx={{color: 'white'}} variant="outlined" component="label">
                                <span>{MSG_MENUBAR.titleUploadFile}</span>
                                <input onChange={handleFile} hidden accept={".pdf"} multiple type={"file"} />
                            </Button>
                        </Grid>
                        <Grid md={6}>
                            <ListFile countFile={countFile} nameFile={nameFile} />
                        </Grid>

                    </Grid>
                </Box>
                <Box sx={{marginTop: '10%', marginBottom: '2%', display: 'flex', justifyContent: 'center'}}>
                    <Button variant='outlined' sx={{color: 'white', mr: 5}} type="submit">{title}</Button>
                    <Button variant='outlined' sx={{color: 'red'}} type="reset" onClick={handleClose}>{MSG_MENUBAR.close}</Button>
                </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}