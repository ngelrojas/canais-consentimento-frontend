import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';

export default function CardOpt({children}: any) {
  return (
    <Box sx={{ minWidth: 275 }}>
        <CardContent sx={{
          border: '1px solid #cccccc', 
          borderRadius: '10px', 
          backgroundColor: '#0038A7'
        }}>
            {children}
        </CardContent>
    </Box>
  );
}