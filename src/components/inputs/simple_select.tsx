import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ThemeProps } from '@/types/theme';
import { FormLabel, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SxProps, styled } from '@mui/system';
import { MenuProps } from '../../styles/styles';
import SimpleTypography from '../typography';

interface SimpleSelectProps {
  sx?: SxProps;
  error?: boolean;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  // onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>;
  onChange?: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  value?: any;
  disabled?: boolean,
  label?: string,
  type?: string,
  autoComplete?: string,
  required?: boolean;
  helperText?: any;
  startAdornment?: any;
  endAdornment?: any;
  placeholderText?: string,
  children: React.ReactNode;
  labelFixed?: boolean;
  className?: string;
}

const SimpleSelectControl = styled(FormControl)(
  // text-transform: capitalize;
  ({ theme }: ThemeProps) => `
    margin: 0 !important;

    .MuiInput-underline{
        background:#fafafa !important;
        padding-top: 5px ;
        padding-bottom: 5px ;
    }
    .MuiInputLabel-root{
        font-size: 15px;
        line-height: 14px;
        letter-spacing: 0.02em;
        color: #424242;
        margin-bottom:6px;
    }

    .Mui-focused::after{
        border-color: #848484;
    }


    .MuiInput-root::before {
        border-bottom: 1px solid #848484;
    }

    .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before {
        border-bottom: 1px solid #848484;
    }

    .MuiInput-root::after {
        border-bottom: 2px solid #7210BE
    }

    .MuiInput-input:focus{
        background-color: transparent !important;
    }

    .MuiTextField-root {
        border-bottom: none;
    }

    .MuiSelect-select-MuiInputBase-input-MuiInput-input{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #848484;
    }
  `
);


export default function SimpleSelect(props: SimpleSelectProps) {

  const [current, setCurrent] = React.useState<string | undefined>(props?.placeholderText)

  return (
    <SimpleSelectControl disabled={props?.disabled} className={props?.className || ''} sx={{ m: 1, width: '100%' }} variant="filled">
      {
        props?.labelFixed ?
          <FormLabel
            sx={{ mb: '6px', fontWeight: 400, fontSize: '14px', color: '#292929', lineHeight: '20px' }}
          >{props?.label}</FormLabel>
          : null
      }
      <Select
        sx={{
          ...props?.sx,
          '.MuiSelect-standard': {
            p: '4px 0 5px 9px',
            color: props?.value == props?.placeholderText ? '#a2a2a2' : '#424242',
            fontWeight: props?.value == props?.placeholderText ? '200' : '400',
            fontSize: '14px',
          }
        }}
        id={props?.label}
        autoComplete={props?.autoComplete}
        error={props?.error}
        onBlur={props?.onBlur}
        onChange={props?.onChange}
        label={props?.label}
        name={props?.name}
        value={props?.value}
        disabled={props?.disabled}
        type={props?.type}
        variant="standard"
        MenuProps={MenuProps}
        inputProps={{
          startAdornment: props?.startAdornment || (
            <InputAdornment position="start">
            </InputAdornment>
          ),
          endAdornment: props?.endAdornment || (
            <InputAdornment position="start">
            </InputAdornment>
          ),
        }}
      // select
      >
        {
          props?.placeholderText ?
            <MenuItem
              key={-1}
              content='option'
              value={props?.placeholderText}
              onClick={() => setCurrent(props?.placeholderText)}
              disabled
              selected
            >{props.placeholderText}</MenuItem>

            : null
        }

        {props?.children}
      </Select>
    </SimpleSelectControl>
  )
}