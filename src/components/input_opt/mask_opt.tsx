import * as React from 'react';
import { IMaskInput } from 'react-imask';
import { MaskProps } from '../../services';


const MaskCustom = React.forwardRef<HTMLElement, MaskProps>(
  function MaskCustom(props, ref) {
    const { onChange, mask, ...other } = props;
    
    return (
      <IMaskInput
        {...other} 
        mask={mask}
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

export default MaskCustom;