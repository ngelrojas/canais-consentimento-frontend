import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ButtonSubmit() {
  return (
    <Stack spacing={2} direction="row">
      <Button 
        sx={{backgroundColor: '#0038A7', color: '#F9DD17'}} 
        type='submit' 
        variant="contained">
          consultar
      </Button>
    </Stack>
  );
}