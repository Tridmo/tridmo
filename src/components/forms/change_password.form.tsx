import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import Buttons from '../buttons';
import instance, { setAuthToken } from '../../utils/axios';
import { setOpenModal, setWarningMessage, setWarningState } from '../../data/modal_checker';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_EXPIRATION_DAYS, REFRESH_TOKEN_EXPIRATION_DAYS } from '../../utils/env_vars';
import { setAuthState } from '../../data/login';
import { getMyProfile } from '../../data/me';

const ChangePasswordForm: React.FC = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)

  // Get token from URL if it exists
  const token = searchParams.get('token');
  const type = searchParams.get('type');
  const isRecoveryFlow = type === 'recovery' && token;

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, 'Пароль должен содержать не менее 6 символов.')
      .required('Требуется новый пароль'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), undefined], 'Пароли должны совпадать')
      .required('Подтвердите, требуется новый пароль'),
  });

  useEffect(() => {
    // Redirect if not authenticated and not in recovery flow
    if (!isAuthenticated && !isRecoveryFlow) {
      router.push('/');
      toast.error('Для изменения пароля необходимо войти в систему');
    }

    // Clean up URL if in recovery flow
    if (isRecoveryFlow && typeof window !== 'undefined') {
      window.history.replaceState({}, '', '/account/change-password');
    }
  }, [isAuthenticated, isRecoveryFlow, router]);

  const handleSubmit = async (values: { newPassword: string; confirmNewPassword: string }) => {
    try {
      let response;

      if (isRecoveryFlow) {
        // Password reset flow - include token in request
        response = await instance.post('/auth/resetPassword', {
          newPassword: values.newPassword,
          token
        });
      } else {
        // Authenticated password change flow
        response = await instance.post('/auth/updatePassword', {
          newPassword: values.newPassword,
        });
      }

      if (response.status === 200) {
        if (response?.data?.data?.user?.is_verified) {

          const accessToken = response?.data?.data?.token?.accessToken;
          const refreshToken = response?.data?.data?.token?.refreshToken;

          Cookies.set('accessToken', accessToken, {
            expires: ACCESS_TOKEN_EXPIRATION_DAYS, path: '/', sameSite: 'Lax', secure: true
          });
          Cookies.set('refreshToken', refreshToken, {
            expires: REFRESH_TOKEN_EXPIRATION_DAYS, path: '/', sameSite: 'Lax', secure: true
          });

          console.log('accessToken cookie', Cookies.get('accessToken'));
          console.log('refreshToken cookie', Cookies.get('refreshToken'));

          setAuthToken(accessToken);
          dispatch(setAuthState(true))
          await dispatch(getMyProfile({}))
          toast.success(response?.data?.message || 'Пароль успешно изменен');
          const redirect = setTimeout(() => {
            router.push('/profile');
            clearTimeout(redirect)
          }, 10000)
        }
      } else {
        toast.error(response?.data?.message || 'Ошибка при изменении пароля');
      }
    } catch (error: any) {
      console.error("Password change error: ", error);
      const errorMessage = error.response?.data?.message || 'Ошибка при изменении пароля';
      toast.error(errorMessage);

      // If token is invalid/expired
      if (isRecoveryFlow && errorMessage.includes('invalid')) {
        dispatch(setWarningMessage('Ссылка для сброса пароля недействительна или истекла'));
        dispatch(setWarningState(true));
        dispatch(setOpenModal(true));
        router.push('/');
      }
    }
  };

  // Don't render form if not authorized
  if (!isAuthenticated && !isRecoveryFlow) {
    return null;
  }

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '75%', md: '50%', lg: '40%' },
        margin: '0 auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {isRecoveryFlow ? 'Сброс пароля' : 'Изменение пароля'}
      </h2>

      <Formik
        initialValues={{ newPassword: '', confirmNewPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box sx={{ marginBottom: 2 }}>
              <label htmlFor="newPassword" style={{ display: 'block', marginBottom: 4 }}>
                Новый пароль
              </label>
              <Field
                type="password"
                id="newPassword"
                name="newPassword"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                }}
              />
              <Box style={{ color: 'red', marginTop: '4px', fontSize: '0.875rem' }}>
                <ErrorMessage name="newPassword" component="div" />
              </Box>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <label htmlFor="confirmNewPassword" style={{ display: 'block', marginBottom: 4 }}>
                Подтвердите новый пароль
              </label>
              <Field
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                }}
              />
              <Box style={{ color: 'red', marginTop: '4px', fontSize: '0.875rem' }}>
                <ErrorMessage name="confirmNewPassword" component="div" />
              </Box>
            </Box>
            <Buttons
              type="submit"
              className='login__btn'
              sx={{ width: '100%' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Обработка...' : isRecoveryFlow ? 'Сбросить пароль' : 'Изменить пароль'}
            </Buttons>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangePasswordForm;