import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemIcon from '@mui/material/ListItemIcon';
import { MdInsertDriveFile } from "react-icons/md";
import { MODAL_MSG_TEXT } from '../../constants';

export default function ListFile({countFile, nameFile}: any) {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: '#0038A7',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        borderLeft: '1px solid #F9DD17',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >  
        <li >
            {countFile > 0 ? 
            <ul>
              <ListSubheader sx={{bgcolor: '#0038A7', color: 'white'}}>
                {MODAL_MSG_TEXT.title_csv} <span style={{color: '#F9DD17'}}>|</span> {MODAL_MSG_TEXT.title_file}
              </ListSubheader>
            
              <ListItem >
                  <ListItemIcon sx={{color: 'white'}}>
                      <MdInsertDriveFile size={30} />
                  </ListItemIcon>
                  <ListItemText
                      sx={{color: 'white'}} 
                      primary={`${nameFile}`}/>
              </ListItem>           
            </ul>: ''
            }
        </li>
      
    </List>
  );
}