import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import  MaskCustom  from './mask_opt';
import { MaskState, MsgError } from '../../services';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';


export default function InputOpt({handleInput}:any) {
  const [values, setValues] = useState<MaskState>({
    textmask: '',
    numberformat: '',
  });
  const [msgError, setMsgError] = useState<MsgError>({
    errorTxt: '',
    errorBool: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    handleInput(values);
  };

  const isCpfCnpjValid = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '');
    console.log('cpf', onlyNumbers.length);
    if (onlyNumbers.length === 11) {
      return cpfValidator.isValid(onlyNumbers);
    } else if (onlyNumbers.length === 14) {
      return cnpjValidator.isValid(onlyNumbers);
    }
    return false;
  };

  const handleCpfCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (isCpfCnpjValid(value)) {
      setMsgError({...msgError, errorTxt: '', errorBool: false});
    } else {
      setMsgError({...msgError, errorTxt: 'CPF/CNPJ inválido', errorBool: true});
    }
    handleInput(values);
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
            onChange={handleCpfCnpjChange}
            name="textmask"
            id="cpf-cnpj-opt"
            error={msgError.errorBool}
        />
        <span>{msgError.errorTxt}</span>
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
            // error={msgError.errorBool}
        />
      </FormControl>
      
    </Box>
  );
}