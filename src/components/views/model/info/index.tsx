import { Grid, Table, TableBody, TableCell, FormControl, FormControlLabel, Radio, RadioGroup, TableContainer, styled, Box, TableRow, Paper, Checkbox, SxProps, useMediaQuery } from '@mui/material';
import SimpleTypography from '../../../typography';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneModel, selectOneModel } from '@/data/get_one_model';

import Link from 'next/link';
import Buttons from '../../../buttons';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import axios, { chatApi, setChatToken } from '@/utils/axios';
import { toast } from "react-toastify"
import { setLoginState, setOpenModal, setSignupState } from '@/data/modal_checker';
import { sampleModel } from '@/data/samples';
import { IMAGES_BASE_URL } from '../../../../utils/env_vars';
import instance from '@/utils/axios';
import { selectMyProfile } from '../../../../data/me';
import { modelStatuses } from '../../../../types/variables';
import { selectChatToken } from '../../../../data/get_chat_token';
import { setSelectedConversation } from '../../../../data/chat';
import { LazyLoadImage } from "react-lazy-load-image-component";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const brandBox = {
  padding: "20px",
  background: "#fff",
  borderRadius: "4px",
  border: "1px solid #B3B3B3",
  marginBottom: "28px",
}

const TrStyle: SxProps = {
  '&:last-child td, &:last-child th': { border: 0 },
  // background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)"
}

const TcStyle: SxProps = {
  borderColor: "#B3B3B3",
  padding: '6px 12px',

  ':not(:last-child)': {
    backgroundColor: '#f5f5f5'
  },

  ':last-child': {
    backgroundColor: '#fafafa'
  }
}

const SimpleImage = styled(Image)(
  ({ theme }) => `
            inset: 0px;
            box-sizing: border-box;
            padding: 0px;
            border: none;
            margin: auto;
            display: block;
            width: 0px;
            height: 0px;
            min-width: 100%;
            max-width: 100%;
            min-height: 100%;
            max-height: 100%;
            object-fit: contain;
    `
)

export default function ModelInfo() {


  const router = useRouter()
  const dispatch = useDispatch<any>();
  const simpleModel = useSelector(selectOneModel);
  const currentUser = useSelector(selectMyProfile);
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const DownloadLink = useSelector((state: any) => state?.download_product)
  const downloadStatus = useSelector((state: any) => state?.auth_slicer?.authState)
  const token = useSelector(selectChatToken)
  const lgScreen = useMediaQuery('(max-width:1280px)');
  const mdScreen = useMediaQuery('(max-width:1060px)');
  const smScreen = useMediaQuery('(max-width:958px)');
  const xsScreen = useMediaQuery('(max-width:600px)');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conversationLoading, setConversationLoading] = useState<boolean>(false);

  function DownloadHandler() {

    if (isAuthenticated) {
      setIsSubmitting(true)
      instance.post(`models/download/${simpleModel?.id}`)
        .then(
          (res) => {
            router.push(res?.data?.data?.url)
          }
        )
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    } else {
      dispatch(setLoginState(true))
      dispatch(setOpenModal(true))
    }
  }

  async function handleCreateConversation() {
    if (isAuthenticated) {
      setConversationLoading(true)
      setChatToken(Cookies.get('chatToken') ? Cookies.get('chatToken') : token ? token : '')
      chatApi.post(`/conversations`, {
        members: [simpleModel?.brand?.admin_user_id]
      })
        .then(res => {
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


  return (
    <Grid
      className='products__info' item
      sx={{ width: '100%', marginTop: "20px" }}
    >

      <SimpleTypography
        text={simpleModel?.name}
        className="product__info--title"
        variant="h1"
      />

      <SimpleTypography
        text={simpleModel?.description}
        className="product__info--desc"
      />

      <Grid item xs={12} sx={brandBox}>
        <Grid container sx={{
          width: '100%',
          display: "flex",
        }}>
          <Grid item lg={4.5} md={4} sm={2} xs={3}>
            <Image
              src={`${IMAGES_BASE_URL}/${simpleModel?.brand?.logo}`}
              alt=""
              width={0}
              height={0}
              sizes='100vw'
              style={{
                objectFit: "contain",
                width: '100%', height: 'auto'
              }}
            />
          </Grid>
          <Grid item lg={7} md={7.4} sm={9.6} xs={8.4} sx={{ marginLeft: "16px" }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <SimpleTypography className='brand__name' text="Имя бренда" />

                <Link href={`/${simpleModel?.brand?.slug}`}>
                  <SimpleTypography sx={{ marginBottom: '15px' }} className='brand__title' text={simpleModel?.brand?.name} />
                </Link>
              </Box>

              <Buttons
                startIcon={conversationLoading}
                disabled={!simpleModel?.brand?.admin_user_id}
                onClick={() => handleCreateConversation()}
                sx={{ p: '3px 9px !important' }}
                className='upload__btn'
                name="Написать"
                childrenFirst={true}
              >
              </Buttons>
            </Box>

            <Grid container spacing={1}
              sx={{
                display: 'flex',
              }}
            >
              <Grid item lg={12} md={12} sm={6} xs={12} sx={{ width: '100% !important' }}>
                <Link
                  target="_blank"
                  href={`http://maps.google.com/?q=${simpleModel?.brand?.address}`}
                  rel="noopener noreferrer"
                  style={{ width: '100% !important' }}
                >
                  <Buttons className='brand__box' sx={{ width: '100% !important' }} name="">
                    <img
                      width={19}
                      height={23}
                      alt="Location"
                      src={"/icons/location.svg"}
                    />
                    <Box sx={{ marginLeft: "11px" }}>
                      <SimpleTypography
                        className='brand__name'
                        text="Локация"
                      />
                      <SimpleTypography
                        className='brand__box--text'
                        text={simpleModel?.brand?.address}
                      />
                    </Box>
                  </Buttons>
                </Link>
              </Grid>

              <Grid item lg={12} md={12} sm={6} xs={12} sx={{ width: '100% !important' }}>
                <Link
                  href={`tel:${simpleModel?.brand?.phone}`}
                  style={{ width: '100% !important' }}
                >
                  <Buttons className='brand__box' sx={{ width: '100% !important' }} name="">
                    <img
                      width={19}
                      height={23}
                      alt="Phone number"
                      src={"/icons/phone.svg"}
                    />
                    <Box sx={{ marginLeft: "11px" }}>
                      <SimpleTypography className='brand__name' text="Номер телефона" />
                      <SimpleTypography className='brand__box--text' text={`${simpleModel?.brand?.phone}`} />
                    </Box>
                  </Buttons>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid >

      <Grid item xs={12}>
        <TableContainer
          sx={{
            borderRadius: "0",
            marginBottom: "28px"
          }}
          component={Paper}
        >
          <Table size="small" aria-label="a dense table">
            <TableBody
              sx={{
                borderTop: "1px solid #b3b3b3",
                borderBottom: "1px solid #b3b3b3",
              }}
            >
              {/* {rows.map((row, index) => ( */}
              <TableRow sx={TrStyle}>
                <TableCell sx={TcStyle} component="th" scope="row">
                  <SimpleTypography
                    text={"Стиль"}
                    className="table__text"
                  />
                </TableCell>
                <TableCell sx={TcStyle}>
                  <SimpleTypography
                    text={simpleModel?.style?.name}
                    className="table__text"
                  />
                </TableCell>
              </TableRow>

              <TableRow sx={TrStyle}>
                <TableCell sx={TcStyle} component="th" scope="row">
                  <SimpleTypography
                    text={"Размеры"}
                    className="table__text"
                  />
                </TableCell>
                <TableCell sx={TcStyle}>
                  <SimpleTypography
                    text={`Длина: ${simpleModel?.length} см`}
                    className="table__text"
                  />
                  <SimpleTypography
                    text={`Ширина: ${simpleModel?.width} см`}
                    className="table__text"
                  />
                  <SimpleTypography
                    text={`Высота: ${simpleModel?.height} см`}
                    className="table__text"
                  />
                </TableCell>
              </TableRow>

              <TableRow sx={TrStyle}>
                <TableCell sx={TcStyle} component="th" scope="row">
                  <SimpleTypography
                    text={"Цвета"}
                    className="table__text"
                  />
                </TableCell>
                <TableCell sx={TcStyle}>
                  <Box sx={{ display: "flex" }}>
                    {
                      simpleModel?.colors?.map((color: any, index: number) => (
                        <Box
                          key={index}
                          sx={{
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: color?.color?.hex_value,
                            marginRight: "4px"
                          }}
                        />
                      ))
                    }
                  </Box>

                </TableCell>
              </TableRow>

              <TableRow sx={TrStyle}>
                <TableCell sx={TcStyle} component="th" scope="row">
                  <SimpleTypography
                    text={"Материалы"}
                    className="table__text"
                  />
                </TableCell>
                <TableCell sx={TcStyle}>
                  <Box sx={{ display: "flex" }}>
                    {
                      simpleModel?.materials?.map((material: any, index: number) => (
                        <SimpleTypography
                          key={index}
                          text={`${material?.material?.name}${index + 1 !== simpleModel?.materials.length ? ", " : ""}`}
                          className="table__text"
                        />
                      ))
                    }
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow sx={TrStyle}>
                <TableCell sx={TcStyle} component="th" scope="row">
                  <SimpleTypography
                    text={"Доступность"}
                    className="table__text"
                  />
                </TableCell>
                <TableCell sx={TcStyle}>
                  <SimpleTypography
                    text={modelStatuses[simpleModel?.availability]}
                    className="table__text"
                  />
                </TableCell>
              </TableRow>
              <TableRow sx={TrStyle}>
                <TableCell sx={TcStyle} component="th" scope="row">
                  <SimpleTypography
                    text={"Цена"}
                    className="table__text"
                  />
                </TableCell>
                <TableCell sx={TcStyle}>
                  <SimpleTypography
                    text={simpleModel?.furniture_cost ? Intl.NumberFormat('uz-UZ').format(simpleModel.furniture_cost) + ' UZS' : 'Не указан'}
                    className="table__text"
                  />
                </TableCell>
              </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item md={5.8} xs={12}>
          <Buttons
            name=""
            type="button"
            className="download-small__zip--file"
            disabled={true}
          >
            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
              <img
                width={24}
                height={26.67}
                alt="Models"
                src="/icons/zip-icon.svg"
              />
              <Box sx={{ marginLeft: "8px" }}>
                <SimpleTypography
                  className="download__button--text"
                  text={`${simpleModel?.model_platform?.name} + ${simpleModel?.render_platform?.name}`}
                />
                {
                  simpleModel?.file?.size ?
                    <SimpleTypography className="download__button--mb" text={`${(Number(simpleModel?.file?.size) / 1000000).toFixed(2)} mb`} />
                    :
                    <SimpleTypography className="download__button--mb" text={`0 mb`} />
                }
              </Box>
            </Box>
          </Buttons>
        </Grid>
        <Grid
          item
          md={5.8}
          xs={12}
        >

          <Buttons
            onClick={simpleModel?.availability != 2 ? DownloadHandler : () => { }}
            startIcon={isSubmitting}
            type="button"
            disabled={isSubmitting || simpleModel?.availability == 2}
            className={isSubmitting || simpleModel?.availability == 2 ? "download__model--disabled" : "download__model--model"}
          >
            Скачать
          </Buttons>

        </Grid>
        <Grid />
      </Grid>
      {/* {!downloadStatus ? <SimpleTypography text='You must be registered or sign in to order a model!' className='download__warning' /> : null } */}

    </Grid >
  )
}
