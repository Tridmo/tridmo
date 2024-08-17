import { Grid, Table, TableBody, TableCell, TableContainer, Box, TableRow, Paper, Skeleton, SxProps, Input } from '@mui/material';
import SimpleTypography from '../../../typography';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import Buttons from '../../../buttons';
import { useRouter } from 'next/navigation';
import { sampleUser } from '@/data/samples';
import { selectDesignerProfile } from '../../../../data/get_designer';
import { selectMyProfile } from '../../../../data/me';
import { IMAGES_BASE_URL } from '../../../../utils/env_vars';
import { setProfileEditState, setOpenModal, setProfileImageState, setProfileImagePreview, setAddingProjectState, setLoginState } from '../../../../data/modal_checker';
import formatDate from '../../../../utils/format_date';
import { useRef, useState } from 'react';
import { readFile } from '../../../inputs/file_input';
import { Add, OpenInNew, RateReview } from '@mui/icons-material';
import { chatApi, setChatToken } from '../../../../utils/axios';
import { selectChatToken } from '../../../../data/get_chat_token';
import Cookies from 'js-cookie';
import { setSelectedConversation } from '../../../../data/chat';
import { log } from 'console';

interface ProfileProps {
  of: 'designer' | 'own'
}
const wrapperSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  width: '400px',
}
const tableWrapperSx: SxProps = {
  backgroundColor: '#fff',
  border: '1px solid #E0E0E0',
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 24px',
  width: '100%',
  marginBottom: '16px'
}

const tbodySx: SxProps = {
  borderTop: "1px solid #F5F5F5",
  borderBottom: "1px solid #F5F5F5",

  '& tr th': { padding: '12px 8px' }
}

const tContainerSx: SxProps = {
  borderRadius: "0",
  marginBottom: "18px",
  overflowX: 'hidden'
}

const tRowSx: SxProps = {
  '&:last-child td, &:last-child th': { border: 0 },
}

const tCellSx: SxProps = {
  textAlign: 'start',
  padding: '12px 8px',
  borderColor: "#F5F5F5"
}

export default function ProfileInfo(props: ProfileProps) {
  const router = useRouter()
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const getProfileStatus = useSelector((state: any) => props?.of == 'designer' ? state?.get_designer?.status : state?.get_profile?.status)
  const dispatch = useDispatch()
  const profileInfo = useSelector(props?.of == 'designer' ? selectDesignerProfile : selectMyProfile)
  const token = useSelector(selectChatToken)
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [conversationLoading, setConversationLoading] = useState<boolean>(false);

  function handleClick() {
    const fileInput = hiddenFileInput.current?.querySelector('input[type="file"]');
    if (fileInput) {
      (fileInput as HTMLInputElement).click();
    }
  };

  function getSocialLink(url: string, target: string, connector: string = '/') {
    return target ? (target.startsWith(url) ? target : `${url}${connector}${target}`) : url
  }

  async function handleProfileImageChange(e) {
    dispatch(setProfileImageState(true))
    dispatch(setOpenModal(true))
    dispatch(setProfileImagePreview(e.target.files[0]))
  }

  async function handleCreateConversation() {
    if (isAuthenticated) {
      setConversationLoading(true)
      setChatToken(Cookies.get('chatToken') || token)

      chatApi.post(`/conversations`, {
        members: [profileInfo?.user_id]
      }).then(res => {
        dispatch(setSelectedConversation(res?.data?.id))
        router.push('/chat')
        setConversationLoading(false)
      })
    }
    else {
      dispatch(setLoginState(true))
      dispatch(setOpenModal(true))
    }

  }

  if (getProfileStatus == 'succeeded') {
    return (
      <Box
        sx={wrapperSx}
      >
        <Box
          sx={tableWrapperSx}
        >
          <Box mb={'18px'}>
            <Box mb={'18px'} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  width: '152px',
                  height: '152px',
                  position: 'relative',
                  borderRadius: `${152 / 2}px`,
                  bgcolor: '#fff',
                  overflow: 'hidden',

                  '&:hover button': {
                    opacity: '1',
                  }
                }}
              >
                <Image
                  width={152}
                  height={152}
                  alt="avatar"
                  style={{
                    objectFit: "cover",
                    margin: '0 auto',
                    borderRadius: '50%'
                  }}
                  src={profileInfo?.image_src ? `${IMAGES_BASE_URL}/${profileInfo?.image_src}` : '/img/avatar.png'}
                />
                {
                  props?.of == 'own' ?
                    <>
                      <Buttons
                        className='image_change__btn'
                        onClick={handleClick}
                        sx={{
                          opacity: '0',
                          cursor: 'pointer',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          rigth: 0,
                          width: '152px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#00000040',

                          '&:hover': {
                            backgroundColor: '#00000060',
                          }
                        }}
                      >
                        <Image
                          width={24}
                          height={24}
                          alt="avatar"
                          src={'/icons/reload-icon.svg'}
                        />
                      </Buttons>

                      <Input
                        ref={hiddenFileInput}
                        onChange={handleProfileImageChange}
                        sx={{ display: 'none' }}
                        type='file'
                        inputProps={{
                          multiple: false,
                          accept: 'image/png, image/jpg, image/jpeg'
                        }}
                      />
                    </>
                    : null
                }
              </Box>
            </Box>
            <SimpleTypography sx={{
              fontSize: '22px',
              fontWeight: '500',
              lineFeight: '26px',
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }} text={profileInfo?.username} />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <SimpleTypography sx={{
                color: '#3C9154',
                fontSize: '16px',
                fontWeight: '400',
                textAlign: 'left',
                marginRight: '3px'
              }} text={`Галерея:`} />

              <SimpleTypography sx={{
                color: '#3C9154',
                fontSize: '16px',
                fontWeight: '600',
                textAlign: 'left',
              }} text={profileInfo?.designs_count} />
            </Box>
          </Box>

          <TableContainer
            sx={tContainerSx}
            component={Paper}
          >
            <Table size="small" aria-label="a dense table">
              <TableBody
                sx={tbodySx}
              >
                <TableRow
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <SimpleTypography
                      text={"Компания"}
                      className="table__text"
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    <SimpleTypography
                      text={profileInfo?.company_name}
                      className="table__text_info"
                    />
                  </TableCell>
                </TableRow>

                <TableRow
                  // key={index}
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <SimpleTypography
                      text={"ФИО"}
                      className="table__text"
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    <SimpleTypography
                      text={profileInfo?.full_name}
                      className="table__text_info"
                    />
                  </TableCell>
                </TableRow>

                <TableRow
                  // key={index}
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <SimpleTypography
                      text={"Дата регистрации"}
                      className="table__text"
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    <SimpleTypography
                      text={formatDate(profileInfo?.created_at)}
                      className="table__text_info"
                    />
                  </TableCell>
                </TableRow>
                {
                  props?.of == 'own'
                    ? <TableRow
                      // key={index}
                      sx={tRowSx}
                    >
                      <TableCell sx={tCellSx} component="th" scope="row">
                        <SimpleTypography
                          text={"Электрон Почта"}
                          className="table__text"
                        />
                      </TableCell>
                      <TableCell sx={tCellSx} align="right">
                        <SimpleTypography
                          text={profileInfo?.email}
                          className="table__text_info"
                        />
                      </TableCell>
                    </TableRow>
                    : null
                }

                <TableRow
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <SimpleTypography
                      text={"Адрес"}
                      className="table__text"
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    {
                      !!profileInfo?.address ?
                        <SimpleTypography
                          text={profileInfo?.address}
                          className="table__text_info"
                        />
                        : props.of == 'own' && <AddButton />
                    }
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <SimpleTypography
                      text={"Сайт"}
                      className="table__text"
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    {
                      !!profileInfo?.portfolio_link ?
                        <Link target='_blank' href={profileInfo?.portfolio_link || ''}>
                          <SimpleTypography
                            text={profileInfo?.portfolio_link || ''}
                            className="table__text_info"
                          />
                        </Link>
                        : props.of == 'own' && <AddButton />
                    }
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <SimpleTypography
                      text={"Телефон"}
                      className="table__text"
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    {
                      !!profileInfo?.phone ?
                        <SimpleTypography
                          text={profileInfo?.phone}
                          className="table__text_info"
                        />
                        : props.of == 'own' && <AddButton />
                    }
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <SimpleTypography
                      text={"Телеграм"}
                      className="table__text"
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    {
                      props.of == 'own' && !profileInfo?.telegram ? <AddButton />
                        : <OpenButton href={getSocialLink('https://t.me', profileInfo?.telegram)} />
                    }
                  </TableCell>
                </TableRow>


                <TableRow
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <SimpleTypography
                      text={"Инстаграм"}
                      className="table__text"
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    {
                      props.of == 'own' && !profileInfo?.instagram ? <AddButton />
                        : <OpenButton href={getSocialLink('https://instagram.com', profileInfo?.instagram)} />
                    }
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </TableContainer>

          <Grid container sx={{ width: '100%', justifyContent: "space-between" }}>
            {
              props?.of == 'designer'
                ? <>
                  <Grid item md={12} xs={12}>
                    <Buttons
                      startIcon={conversationLoading}
                      onClick={() => handleCreateConversation()}
                      sx={{ width: '100%' }}
                      className='upload__btn'
                      name="Написать сообщение"
                      childrenFirst={true}
                    >
                      <RateReview sx={{ mr: '8px' }} />
                    </Buttons>
                  </Grid>
                </>

                : <Grid item md={12} xs={12}>
                  <Buttons
                    sx={{ width: '100%' }}
                    className='bookmark__btn'
                    name="Редактировать"
                    childrenFirst={true}
                    onClick={() => {
                      dispatch(setProfileEditState(true))
                      dispatch(setOpenModal(true))
                    }}
                  >
                    <Image
                      width={16}
                      height={16}
                      alt="Phone number"
                      src={"/icons/edit.svg"}
                    />
                  </Buttons>
                </Grid>
            }
          </Grid>
        </Box>

        {
          props?.of == 'own'
            ? <Grid container sx={{ width: '100%', justifyContent: "space-between" }}>
              <Buttons
                sx={{ width: '48%' }}
                name="Создать проект"
                childrenFirst={true}
                className="login__btn"
                onClick={() => {
                  dispatch(setAddingProjectState(true))
                  dispatch(setOpenModal(true))
                }}
              >
                <Image
                  alt="upload icon"
                  src='/icons/plus-bordered.svg'
                  width={16}
                  height={16}
                />
              </Buttons>
              <Link href={'/interiors/addnew'} style={{ width: '48%' }}>
                <Buttons
                  sx={{
                    width: '100%',
                    padding: '0 20px !important',
                    height: '40px !important'
                  }}
                  name="Добавить работу"
                  childrenFirst={true}
                  className="upload__btn"
                >
                  <Image
                    alt="upload icon"
                    src='/icons/plus-white.svg'
                    width={13}
                    height={13}
                  />
                </Buttons>
              </Link>
            </Grid>

            : null
        }

      </Box>
    )
  }
  else {
    return (
      <Box
        sx={wrapperSx}
      >
        <Box
          sx={tableWrapperSx}
        >
          <Box mb={'18px'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Box mb={'18px'} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Skeleton
                variant='rounded'
                width={152}
                height={152}
                style={{ margin: '0 auto', borderRadius: '50%' }}
              />
            </Box>
            <Skeleton
              variant="rectangular"
              width={120}
              height={24}
            />
            <Skeleton
              variant="rectangular"
              width={100}
              height={20}
              style={{ marginTop: '5px' }}
            />
          </Box>

          <TableContainer
            sx={tContainerSx}
            component={Paper}
          >
            <Table size="small" aria-label="a dense table">
              <TableBody
                sx={tbodySx}
              >
                {/* {rows.map((row, index) => ( */}
                <TableRow
                  // key={index}
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </TableCell>
                </TableRow>

                <TableRow
                  // key={index}
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  // key={index}
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={tRowSx}
                >
                  <TableCell sx={tCellSx} component="th" scope="row">
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={24}
                    />
                  </TableCell>
                  <TableCell sx={tCellSx} align="right">
                    <Link target='_blank' href={profileInfo?.portfolio_link || ''}>
                      <Skeleton
                        variant="rectangular"
                        width={120}
                        height={24}
                      />
                    </Link>
                  </TableCell>
                </TableRow>

                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container sx={{ width: '100%', justifyContent: "space-between" }}>
            {
              props?.of == 'designer'
                ? <>
                  <Grid item md={12} xs={12} mb={'10px'}>
                    <Skeleton
                      variant="rectangular"
                      width={'100%'}
                      height={43}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Skeleton
                      variant="rectangular"
                      width={'100%'}
                      height={43}
                    />
                  </Grid>
                </>

                : <Grid item md={12} xs={12}>
                  <Skeleton
                    variant="rectangular"
                    width={'100%'}
                    height={43}
                  />
                </Grid>
            }
          </Grid>
        </Box>

        {
          props?.of == 'own'
            ? <Grid container sx={{ width: '100%', justifyContent: "space-between" }}>
              <Grid item md={12} xs={12}>
                <Skeleton
                  variant="rectangular"
                  width={'100%'}
                  height={43}
                />
              </Grid>

            </Grid>

            : null
        }

      </Box>
    )
  }
}


function AddButton() {
  const dispatch = useDispatch()
  return (
    <Buttons
      sx={{
        height: 'auto !important',
        width: '154px',
        px: '7.5px !important',
        borderRadius: '28px !important',
        borderWidth: '1.7px !important'
      }}
      className='bookmark__btn'
      childrenFirst={true}
      onClick={() => {
        dispatch(setProfileEditState(true))
        dispatch(setOpenModal(true))
      }}
    >
      <Image
        width={14}
        height={14}
        alt="icon"
        src={"/icons/plus.svg"}
      />
      <SimpleTypography
        text="Добавить"
        sx={{
          fontSize: '14px',
          lineHeight: '17px'
        }}
      />
    </Buttons>
  )
}

function OpenButton({ href }) {
  return (
    <Link target='_blank' href={href}>
      <Buttons
        sx={{
          height: 'auto !important',
          minWidth: '154px',
          borderRadius: '28px !important',
          px: '7.5px!important',
          borderWidth: '1.7px !important'
        }}
        className='bookmark__btn'
        childrenFirst={true}
      >
        <OpenInNew sx={{ width: '16px', height: '16px', mr: '8px' }} />
        <SimpleTypography
          text="Открыть"
          sx={{
            fontSize: '14px',
            lineHeight: '17px'
          }}
        />
      </Buttons>
    </Link>
  )
}