import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image'
import { Box, SxProps } from '@mui/system';
import Buttons from '../buttons';

type InputProps = {
    placeHolder: string,
    component?: any,
    className: string,
    startIcon: boolean,
    clic?: any,
    sx?: SxProps,
    onChange?: any,
    search?: any,
    withButton?: boolean
};


export default function SearchInput(props: InputProps) {

    return (
        <Box
            sx={{
                ...props?.sx,
                maxWidth: '360px!important',
                backgroundColor: '#FAFAFA',
                border: '1px solid #424242',
                borderRadius: '4px',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '22px',
                color: '#848484',
                padding: '7px 12px',
                display: 'flex',
                alignItems: 'center',
                width: 280,
                position: 'relative',
            }}
        >
            {
                props?.startIcon ?
                    <IconButton sx={{ p: 0 }} aria-label="menu">
                        <Image
                            src="/img/search-icon.svg"
                            alt='Search icon'
                            width={21}
                            height={21}
                        ></Image>
                    </IconButton>
                    : null
            }
            <InputBase
                sx={{ flex: 1, padding: 0, fontSize: 16 }}
                placeholder={props?.placeHolder}
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            {
                props?.withButton ?
                    <Buttons
                        name='Поиск'
                        sx={{
                            position: 'absolute',
                            right: -2,
                        }}
                        className='search__btn'
                        type="button"
                        aria-label="search"
                    />
                    : null
            }
        </Box >
    )
}