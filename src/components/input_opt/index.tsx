import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import  MaskCustom  from './mask_opt';
import { MaskState } from '../../services';


export default function InputOpt({handleInput}:any) {
  const [values, setValues] = useState<MaskState>({
    textmask: '',
    numberformat: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    handleInput(values)
  };

  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 1,
          width: '25ch',
        },
      }}
    >
      <FormControl variant="standard">
        
        <TextField
            label="CPF/CNPJ"
            value={values.textmask}
            onChange={handleChange}
            name="textmask"
            id="cpf-cnpj-opt"
            InputProps={{
                inputComponent: MaskCustom as any,
                inputProps: { mask: '000.000.000-00' },
            }}
        />
      </FormControl>

      <FormControl variant="standard">  
        <TextField
            label="TELEFONE"
            value={values.numberformat}
            onChange={handleChange}
            name="numberformat"
            id="telefone-opt"
            InputProps={{
                inputComponent: MaskCustom as any,
                inputProps: { mask: '(00)000-000-000' },
            }}
        />
      </FormControl>
      
    </Box>
  );
}