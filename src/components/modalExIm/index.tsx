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
import {TotalRegistersContext}  from '../../context/overView';
import { JsonToCSV } from './styles';
import { MODAL_MSG } from '../../constants';
import TextField from '@mui/material/TextField';
import { getCurrentDateTime } from '../../utils';

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
  let GetCurrentDateTime = getCurrentDateTime();
  const [open, setOpen] = React.useState(false);
  const [countFile, setCountFile] = React.useState(1);
  const [nameFile, setNameFile] = React.useState(GetCurrentDateTime);
  const [isExport, setIsExport] = React.useState(false);
  const { exportData } = React.useContext(TotalRegistersContext);

  const handleOpen = () => {
    if(title === MSG_MENUBAR.titleExport) {
      
      if(exportData.length > 0) {
        setOpen(true);
        setIsExport(true);
      }else{
        alert(MODAL_MSG.alertMsg);
        setIsExport(false);
      }

    }else if(title === MSG_MENUBAR.titleImport) {
      setOpen(true)
    }else{
      setOpen(false);
    }
  };

  const handleChange = (e: any) => {
    let fileName = e.target.value;
    if(fileName.length > 0) {
      setNameFile(fileName.replace(/\s/g, '-'));
    }else{
      setNameFile(GetCurrentDateTime);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  const handleFile = (e: any) => {
    setCountFile(e.target.files.length);
    setNameFile(e.target.files[0].name);
  }
// TODO: check method for export data and import data, maybe use the same componet for both
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
            <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', marginBottom: '10%'}}>
                    <Typography sx={{paddingRight: '35%'}} id="transition-modal-title" variant="h6" component="h2">
                        {title} {subtitle}
                    </Typography>
                        
                    <IconButton onClick={handleClose}><MdClear color='white' /></IconButton>
                </Box>
                <Box sx={{paddingTop: '1%', paddingBottom: '1%'}}>
                  { isExport ? (
                    <Grid sx={{display: 'flex', justifyContent: 'center'}}>
                      <Grid sx={{justifyContent: 'flex-start'}}>
                        <Box sx={{marginRight: '15%', marginTop: '22%'}}>

                        <TextField
                          id="rename-file"
                          label="Nome do arquivo"
                          type="search"
                          variant="standard"
                          onChange={handleChange}
                        />
                        </Box>
                      </Grid>
                      <Grid sx={{ marginLeft: '10%'}}>
                        <ListFile countFile={countFile} nameFile={nameFile} />
                      </Grid>
                  </Grid>
                  ):(
                    <Grid container>
                        <Grid >
                            <Button sx={{color: 'white'}} variant="outlined" component="label">
                                <span>{MSG_MENUBAR.titleUploadFile}</span>
                                <input onChange={handleFile} hidden accept={".pdf"} multiple type={"file"} />
                            </Button>
                        </Grid>
                        <Grid >
                            <ListFile countFile={countFile} nameFile={nameFile} />
                        </Grid>
                    </Grid>
                  )}
                </Box>
                
                <Box sx={{marginTop: '10%', marginBottom: '2%', display: 'flex', justifyContent: 'center'}}>
                { isExport ? (
                    <JsonToCSV
                      data={exportData}
                      filename={`${nameFile}.csv`}
                      delimiter=','
                    />
              ):(
                    <Button variant='outlined' sx={{color: 'white', mr: 5}} type="submit">{title}</Button>)}
                    
                    <Button variant='outlined' sx={{color: '#F9DD17'}} type="reset" onClick={handleClose}>{MSG_MENUBAR.close}</Button>
                </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}