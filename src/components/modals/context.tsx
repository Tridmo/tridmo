import * as React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { getMyProfile, resetMyProfile } from '../../data/me';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState, setSignupState, setVerifyState, setOpenModal } from '../../data/modal_checker';
import { setAuthState } from "../../data/login";
import { Box, Typography, Grid, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import Image from 'next/image';
import SimpleTypography from '../typography'
import Buttons from '../buttons';
import axios from '../../utils/axios';
import { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from '../../utils/expiration'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Cookies from 'js-cookie'
import SimpleInp from '../inputs/simple_input';
//Login context
interface LoginContextProps {
  // setAlertMessage: any
  setModalChange__Viewer?: any,
  setOpen?: any,
  setUserEmail?: any,
  userEmail?: any,
  setProgress?: any,
}

export const LoginContext = (props: LoginContextProps) => {
  const authState = useSelector((state: any) => state?.auth_slicer?.authState);

  //declare dispatcher
  const dispatch = useDispatch<any>();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        // 998971113539
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .min(4, "too short")
            .max(50, "too long")
            .email('The email provided should be a valid email address')
            .required('The email field is required'),
          password: Yup.string()
            .required('No password provided.')
            .max(255)
            .min(6, 'Password is too short - should be 6 chars minimum.')
          // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        })}
        onSubmit={async (
          _values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {
            let res = await axios.post(
              `auth/signin`,
              { email: _values.email, password: _values?.password },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    'accessToken'
                  )}`
                },
                onUploadProgress: (progressEvent) => {

                }
              }
            );
            resetForm();
            props?.setUserEmail(_values?.email);
            // dispatch(resetMyProfile())
            if (res?.data?.data?.user?.is_verified) {
              toast.success("You have successfully logged in")
              var inFifteenMinutes = new Date(new Date().getTime() + Number(ACCESS_TOKEN_EXPIRATION));

              var inTwoMinutes = new Date(new Date().getTime() + Number(REFRESH_TOKEN_EXPIRATION));

              Cookies.set(
                'accessToken',
                res?.data?.data?.token?.accessToken,
                { expires: inFifteenMinutes, path: '/', sameSite: 'Lax', secure: true }
              )

              Cookies.set(
                'refreshToken',
                res?.data?.data?.token?.refreshToken,
                { expires: inTwoMinutes, path: '/', sameSite: 'Lax', secure: true }
              )
              dispatch(setAuthState(true))
              dispatch(setOpenModal(false));
            } else {
              dispatch(setVerifyState(true));
              // toast.success("Please verify your email!")
            }
            dispatch(setLoginState(false));
            setStatus({ success: true });

            // var inFifteenMinutes = new Date(new Date().getTime() + Number(ACCESS_TOKEN_EXPIRATION));

            // var inTwoMinutes = new Date(new Date().getTime() + Number(REFRESH_TOKEN_EXPIRATION));
            // Cookies.set(
            //   'accessToken',
            //   res?.data?.data?.token?.accessToken,
            //   { expires: inFifteenMinutes, path: '/' }
            // )

            // Cookies.set(
            //   'refreshToken',
            //   res?.data?.data?.token?.refreshToken,
            //   { expires: inTwoMinutes, path: '/' }
            // )

            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            if (err.response.data.message) {
              toast.error(err.response.data.message);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid style={{ transformOrigin: '0 0 0' }}>
              <Grid sx={{ display: 'flex', alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                <SimpleTypography
                  className="modal__title"
                  variant="h6"
                  text="Log in"
                />
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginBottom: "26px"
                  }}>
                  <SimpleTypography
                    className="modal__sub-title"
                    variant="h6"
                    text="Don’t have an account?"
                  />
                  <Buttons
                    name="Create account"
                    onClick={() => {
                      dispatch(setSignupState(true));
                      dispatch(setLoginState(false))
                    }}
                    className='underlined__btn'
                  />
                </Grid>
                <Box sx={{ marginBottom: "26px", width: "100%" }}>
                  <SimpleInp
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    name="email"
                    type="text"
                    label='Email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    placeholderText='Your email address'
                  />
                </Box>


                <SimpleInp
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  name="password"
                  label='Password'
                  type="password"
                  autoComplete="off"
                  onBlur={handleBlur}
                  required={true}
                  onChange={handleChange}
                  value={values.password}
                  placeholderText='Enter password'
                />

                {/* <EmailInputAdornments
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  name="email"
                  type="email"
                  label='Email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  placeholderText='example@gmail.com'
                />

                <PasswordInputAdornments
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  name="password"
                  type="password"
                  onBlur={handleBlur}
                  required={true}
                  onChange={handleChange}
                  value={values.password}
                  placeholderText='Enter password'
                /> */}

                <Box sx={{ marginTop: "10px" }}>
                  <Buttons name="Forgot your password?" className='underlined__btn' />
                </Box>
                <Buttons
                  type="submit"
                  name="Sign in"
                  startIcon={isSubmitting}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  className='signIn__btn'
                />
              </Grid>
            </Grid>
          </form>)}
      </Formik>
    </>
  );
}

//Sign up context

export const SignUpContext = (props: LoginContextProps) => {
  const dispatch = useDispatch<any>();

  return (
    <>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string()
            .max(255)
            .min(2, 'Too short - should be 2 chars minimum.')
            .required('First name field is required'),
          last_name: Yup.string()
            .max(255)
            .min(2, 'Too short - should be 2 chars minimum.'),
          email: Yup.string()
            .min(4, "too short")
            .max(50, "too long")
            .email('The email provided should be a valid email address')
            .required('Email field is required'),
          password: Yup.string()
            .max(255)
            .min(6, 'Password is too short - should be 8 chars minimum.')
            .required('Password filed is required')
          // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        })}

        onSubmit={async (
          _values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {
            await axios.post(
              `auth/signup`,
              {
                full_name: `${_values.first_name} ${_values.last_name}`,
                email: _values.email,
                password: _values?.password,
                language_id: 1
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    'accessToken'
                  )}`
                },
                // onUploadProgress: (progressEvent) => {
                // setProgress(`${Math.round((100 * data.loaded) / data.total)}`);
                // }
              }
            );
            // resetForm();
            // dispatch(reset());
            setStatus({ success: true });
            props?.setUserEmail(_values?.email);
            dispatch(setSignupState(false));
            dispatch(setVerifyState(true));
            dispatch(setOpenModal(true));
            // setTimeout(()=>{
            //   props?.setOpen(false);
            // }, [500])
            // toast.success("You have been registered successfully")
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            toast.error(err?.response?.data?.message)
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid style={{ transformOrigin: '0 0 0' }}>
              <Grid sx={{ display: 'flex', alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                <SimpleTypography className="modal__title" variant="h6" text="Sign up" />
                <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                  <SimpleTypography className="modal__sub-title" variant="h6" text="Don’t have an account?" />
                  <Buttons
                    name="Log in"
                    onClick={() => {
                      dispatch(setLoginState(true))
                      dispatch(setSignupState(false))
                    }}
                    className='underlined__btn'
                  />
                </Grid>

                {/* <EmailInputAdornments
                  error={Boolean(touched.full_name && errors.full_name)}
                  helperText={touched.full_name && errors.full_name}
                  name="full_name"
                  type="full_name"
                  label="Full name"
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.full_name}
                  placeholderText='Name Surname'
                /> */}
                <Box sx={{ display: "flex", marginTop: "26px", width: "100%", marginBottom: "26px" }}>
                  <Box sx={{ paddingRight: "8px", width: "50%" }}>
                    <SimpleInp
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                      name="first_name"
                      type="first_name"
                      label="First name"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name}
                      placeholderText='First name'
                    />
                  </Box>
                  <Box sx={{ paddingLeft: "8px", width: "50%" }}>
                    <SimpleInp
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                      name="last_name"
                      type="surname"
                      label="Surname"
                      autoComplete="off"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name}
                      placeholderText='Surname'
                    />
                  </Box>
                </Box>

                <Box sx={{ marginBottom: "26px", width: "100%" }}>
                  <SimpleInp
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    name="email"
                    type="text"
                    label='Email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    placeholderText='Your email address'
                  />
                </Box>

                <SimpleInp
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  name="password"
                  label='Password'
                  type="password"
                  autoComplete="off"
                  onBlur={handleBlur}
                  required={true}
                  onChange={handleChange}
                  value={values.password}
                  placeholderText='Create password'
                />




                {/* <EmailInputAdornments
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  name="email"
                  type="email"
                  label='Email'
                  autoComplete="off"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  placeholderText='example@gmail.com'
                /> */}

                {/* <PasswordInputAdornments
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  name="password"
                  type="password"
                  autoComplete="off"
                  onBlur={handleBlur}
                  required={true}
                  onChange={handleChange}
                  value={values.password}
                  placeholderText='Enter password'
                /> */}

                {/* <Buttons name="Forgot your password?" className='underlined__btn' /> */}
                <Buttons
                  type="submit"
                  name="Create an account"
                  startIcon={isSubmitting}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  className='signIn__btn'
                />
                <Box></Box>
                {/* <SimpleTypography className='singIn__text' text='By creating an account you agree to our'>
                  <Link href={"/"}>
                    <a>
                      Terms & Conditions and our
                    </a>
                  </Link>
                </SimpleTypography> */}

              </Grid>
            </Grid>
          </form>)}
      </Formik>
    </>
  );
}


//Verify your account context

export const VerificationContext = (props: LoginContextProps) => {
  interface RenderTypes {
    minutes: any,
    seconds: any,
    completed: boolean,
  }

  //declare dispatcher
  const dispatch = useDispatch<any>();

  const Renderer = ({ minutes, seconds, completed }: RenderTypes) => {
    if (completed) {
      // Render a completed state
      return (
        <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
          <SimpleTypography
            className="modal__sub-title"
            variant="h6"

            text="Didn't receive a code?"
          />
          <Buttons
            name="Send code again"
            onClick={() => { }}
            className='underlined__btn'
          />
        </Grid>
      )
    } else {
      // Render a countdown
      return (<>Resend in {" "}<span>{minutes}:{seconds}</span></>)
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          code: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string()
            .max(255)
            .min(6, 'Too short - should be 6 chars minimum.')
            .required('Code field is required'),
        })}

        onSubmit={async (
          _values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {
            let res = await axios.post(
              `auth/verify`,
              { code: parseFloat(_values?.code), email: props?.userEmail },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    'accessToken'
                  )}`
                },
              },
            );
            resetForm();

            var inFifteenMinutes = new Date(new Date().getTime() + Number(ACCESS_TOKEN_EXPIRATION));

            var inTwoMinutes = new Date(new Date().getTime() + Number(REFRESH_TOKEN_EXPIRATION));

            Cookies.set(
              'accessToken',
              res?.data?.data?.token?.accessToken,
              { expires: inFifteenMinutes, path: '/', sameSite: 'Lax', secure: true },
            )

            Cookies.set(
              'refreshToken',
              res?.data?.data?.token?.refreshToken,
              { expires: inTwoMinutes, path: '/', sameSite: 'Lax', secure: true }
            )
            setStatus({ success: true });
            dispatch(resetMyProfile())
            dispatch(setAuthState(true))
            dispatch(setVerifyState(false))
            dispatch(setOpenModal(false));
            toast.success("You have been registered successfully");
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            if (err?.response?.data?.message) {
              toast.error(err?.response?.data?.message)
              setErrors({ submit: err?.response?.data?.message });
            }
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid style={{ transformOrigin: '0 0 0' }}>
              <Grid sx={{ display: 'flex', alignItems: "start", justifyContent: "start", flexDirection: "column" }}>
                <Button
                  sx={{ padding: "0", marginBottom: "13px" }}
                  onClick={() => {
                    dispatch(setSignupState(true))
                    dispatch(setVerifyState(false))
                  }}
                >
                  <KeyboardArrowLeftIcon />
                  <SimpleTypography className='verification__back' text='Go back' />
                </Button>
                <SimpleTypography
                  className="modal__title"
                  variant="h6"

                  text="Verify your email"
                />
                <Grid sx={{ display: "flex", alignItems: "center", justifyContent: "start", marginBottom: "10px" }}>

                  <SimpleTypography
                    className="modal__sub-title"
                    variant="h6"
                    text={`We have sent a confirmation email to the ${props?.userEmail}. If you can not find the letter in a mailbox, check`}
                  >
                    <b style={{ marginLeft: "3px" }}>Spam folder.</b>
                  </SimpleTypography>
                </Grid>


                {/* <SimpleInp
                  error={Boolean(touched.code && errors.code)}
                  helperText={touched.code && errors.code}
                  name="code"
                  type="code"
                  label="Confirmation code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.code}
                  placeholderText='******'
                /> */}

                {/* 
                <EmailInputAdornments
                  error={Boolean(touched.code && errors.code)}
                  helperText={touched.code && errors.code}
                  name="code"
                  type="code"
                  label="Confirmation code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.code}
                  placeholderText='******'
                /> */}
                {/* <Grid sx={{ display: 'flex', alignItems: "center" }}>

                  <Typography>
                    <Countdown
                      date={Date.now() + 75000}
                      renderer={Renderer}
                    />
                  </Typography>
                </Grid> */}
                {/* <Link 
                  href={"https://mail.google.com/mail/u/0/#inbox"}
                  >
                  <a rel="noopener noreferrer" target="_blank"> */}
                <Buttons
                  type="button"
                  onClick={() => window.open("https://mail.google.com/mail/u/0/#inbox", '_blank', 'noopener,noreferrer')}
                  name="Checkout email"
                  endIcon='checkout'
                  startIcon={isSubmitting}
                  disabled={Boolean(errors.submit) || isSubmitting}
                  className='signIn__btn'
                >
                </Buttons>
                {/* </a>
                </Link> */}
              </Grid>
            </Grid>
          </form>)}
      </Formik>
    </>
  );
}