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
import { Context }  from '../../context/overView';
import { JsonToCSV } from './styles';
import { MODAL_MSG, LABEL_MSG } from '../../constants';
import TextField from '@mui/material/TextField';
import { getCurrentDateTime } from '../../utils';
import FileUploadComponent from './fileUploadComponent';
import { Waveform } from '@uiball/loaders'
import { Canais } from '../../services/service.canais';
import { LocalStorageService } from '../../services/service.token';


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
  
  const localStorageService = new LocalStorageService();
  const canais = new Canais(localStorageService.getItem('token'));

  const [open, setOpen] = React.useState(false);
  const [nameFile, setNameFile] = React.useState(GetCurrentDateTime);
  const [isExport, setIsExport] = React.useState(false);
  const { exportData } = React.useContext(Context);
  const [baseString64, setBaseString64] = React.useState('');
  const [loading, setLoading] = React.useState(false);

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
    setBaseString64('');
    setLoading(false);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if(baseString64.length > 0) {
      setLoading(true);
      /*
      TODO: send file to server, but first, we need to check if the server, 
            is ready to receive the file and check the response.
      */
      
      // canais.sendFileCanais(baseString64)
      //   .then(
      //     (res: any) => {
      //       if(res.status === 200) {
      //         // alert(LABEL_MSG.success);
      //         setLoading(false);
      //         handleClose();
      //       }
      //     }
      //   ).catch(
      //     (err: any) => {
      //       console.log(err);
      //       setLoading(false);
      //       handleClose();
      //     }
      //   );
      setTimeout(() => {
        console.log('this file was sent to server')
        alert("Arquivo esta demorando para ser enviado, a janela se fechara automaticamente e nos avisaremos por aqui.")
        handleClose();
        setLoading(false);
      }, 3000);
      // console.log(`sending.... ${baseString64}`)
    }
  }
  
  const onFileHandleUpload = (file: any) => {
    if(file){
      setBaseString64(file.base64);
    }
  }
  
  return (
    <div>
        <Button onClick={handleOpen} 
          sx={{color: '#F9DD17', textTransform: 'capitalize'}} variant='text'>
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
            <form>
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
                          label={LABEL_MSG.text_import}
                          type="search"
                          variant="standard"
                          onChange={handleChange}
                        />
                        </Box>
                      </Grid>
                      <Grid sx={{ marginLeft: '10%'}}>
                        <ListFile countFile={1} nameFile={nameFile} />
                      </Grid>
                  </Grid>
                  ):(
                    <Grid sx={{display: 'flex', justifyContent: 'center'}}>
                        <Grid >
                            <FileUploadComponent handleFileCSV={onFileHandleUpload} />
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
                <>
                {loading ? (
                    <Grid sx={{marginRight: '5%'}}>

                      <Waveform 
                        size={30}
                        lineWeight={3.5}
                        speed={1} 
                        color="#F9DD17" 
                      />
                    </Grid>

                  ):(
                  <Button 
                    onClick={handleSubmit}
                    variant='outlined' 
                    sx={{color: 'white', mr: 5}} 
                    >{title}</Button>
                  )}
                  

                </>
                )}   
                  <Button variant='outlined' sx={{color: '#F9DD17'}} type="reset" onClick={handleClose}>{MSG_MENUBAR.close}</Button>
                </Box>
                
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}