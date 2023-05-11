import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardOpt({children}: any) {
  return (
    <Box sx={{ minWidth: 275 }}>
        <CardContent sx={{border: '1px solid #cccccc', borderRadius: '1.5%', backgroundColor: '#0038A7'}}>
            {children}
        </CardContent>
    </Box>
  );
}