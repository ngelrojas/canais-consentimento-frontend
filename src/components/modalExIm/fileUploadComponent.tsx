import React, { ChangeEvent, useState } from 'react';
import Grid from '@mui/material/Grid';
import ListFile from '../../components/listFile';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { MSG_MENUBAR } from '../../constants';
import { nameFileCSV, FileUploadComponentProps }  from '../../services';

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({handleFileCSV}) => {
  const [base64String, setBase64String] = useState<string>('');
  const [csvName, setCsvName] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      let pasFileCsv:nameFileCSV = {
        name: file?.name,
        size: file?.size,
        type: file?.type,
        lastModified: file?.lastModified,
        base64: ''
      }
      
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64 = reader.result as string;
              pasFileCsv.base64 = base64;
              setBase64String(base64);
              handleFileCSV(pasFileCsv);
              setCsvName(file?.name);
        };
        reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{display: 'flex'}}>
        <Grid>
            <label htmlFor='file-upload'>
                <Fab
                    color="primary"
                    size="large"
                    component="span"
                    aria-label="add"
                    variant="extended"
                    sx={{marginTop: '15%', marginRight: '10%', paddingLeft: '15%',fontSize: '.80rem'}}
                >
                    <AddIcon /> {MSG_MENUBAR.titleUploadFile}
                </Fab>
                <input style={{display: 'none'}} id='file-upload' type="file" onChange={handleFileChange} />
            </label>
        </Grid>
      
      {base64String && (
        <Grid >
            <ListFile countFile={1} nameFile={csvName} />
        </Grid>
      )}
    </Box>
  );
};

export default FileUploadComponent;
