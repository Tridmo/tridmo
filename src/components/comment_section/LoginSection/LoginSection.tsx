"use client"

import React from 'react'
import './LoginSection.scss'
import { Box } from '@mui/system'
import Buttons from '@/components/buttons'
import { setLoginState, setSignupState, setOpenModal } from '@/data/modal_checker';
import { useDispatch } from 'react-redux';

interface LoginSectionProps {
  loginLink: string
  signUpLink: string
}

const LoginSection = ({ loginLink, signUpLink }: LoginSectionProps) => {

  const dispatch = useDispatch<any>();

  return (
    <Box className='signBox'
      display={'flex'}
      width={'100%'}
      flexDirection={{ xs: 'column', sm: 'row', md: 'row', lg: 'row', xl: 'row' }}
    >
      <Box className='signLine' mb={'24px'} >Войдите или зарегистрируйтесь, чтобы оставить комментарий</Box>
      <Box
        style={{ padding: "0", display: "flex" }}
        width={{ xs: '100%', sm: 'unset', md: 'unset', lg: 'unset', xl: 'unset' }}
      >
        {/* <Box sx={{ marginRight: "16px" }}>
          <Buttons
            name="Регистрация "
            onClick={() => {
              dispatch(setSignupState(true))
              dispatch(setOpenModal(true))
            }}
            className="bordered__btn--signup"
          />
        </Box> */}
        <Buttons
          name="Логин"
          onClick={() => {
            dispatch(setLoginState(true));
            dispatch(setOpenModal(true))
          }}
          className="login__btn"
          sx={{ width: '100%' }}
        />
      </Box>
    </Box>
  )
}

export default LoginSection
