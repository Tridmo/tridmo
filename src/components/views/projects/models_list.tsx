"use client"

import SimpleTypography from "@/components/typography";
import { interiorRequirements } from "@/data/samples/interior_requirements";
import { Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, styled } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { CSSProperties, useEffect, useState } from "react";
import Buttons from "../../buttons";
import Image from "next/image";
import Link from "next/link";
import EmptyData from "../empty_data";
import { IMAGES_BASE_URL } from "../../../utils/env_vars";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setLoginState, setOpenModal } from "../../../data/modal_checker";
import instance from "../../../utils/axios";
import { toast } from "react-toastify";
import { getMyProjects } from "../../../data/get_my_projects";
import { getOneProject } from "../../../data/get_one_project";
import { useRouter } from "next/navigation";

const fakeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const liHeaderTextSx = {
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '17px',
  textAlign: 'start',
  color: '#686868'

}

const brandImageWrapperSx: SxProps = {
  backgroundColor: '#fff',
  width: '84px',
  height: '84px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const brandImageSx: CSSProperties = {
  width: '100% !important',
  height: '100% !important',
  objectFit: 'contain'
}

const liSx: SxProps = {
  justifyContent: 'flex-start',
  padding: '10px 24px',
  transition: '0.4s all ease',

  '&:hover': {
    backgroundColor: '#FAFAFA',
  }
}

const liHeaderSx: SxProps = {
  backgroundColor: '#F5F5F5',
  justifyContent: 'flex-start',
  padding: '10px 24px',
  borderRadius: '4px',
}

const listSx: SxProps = {
  width: '100%',
  maxWidth: 1200,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  padding: 0,
}

const widthControl = {
  '&:nth-of-type(1)': {
    width: '30%'
  },
  '&:nth-of-type(2)': {
    width: '20%'
  },
  '&:nth-of-type(3)': {
    width: '20%'
  },
  '&:nth-of-type(4)': {
    width: '20%'
  }
}

export function ProjectModelsList({ project }) {

  const router = useRouter()
  const dispatch = useDispatch<any>()
  const getProjectStatus = useSelector((state: any) => state?.get_one_project?.status)
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const [isSubmitting, setIsSubmitting] = useState(false);


  function handleDownloadModel(project_model): any {
    if (isAuthenticated) {
      setIsSubmitting(true)
      instance.post(`models/download/${project_model?.model_id}`)
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

  function handleRemoveModel(project_model) {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что удалите модель  «${project_model['model.name']}» из списка?`,
      actions: {
        on_click: {
          args: [project?.id],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }))
            instance.delete(`projects/${id}/model/${project_model?.model_id}/?cascade=${!checked}`)
              .then(res => {
                if (res?.data?.success) {
                  toast.success(res?.data?.message)
                  dispatch(setConfirmState(false))
                  dispatch(setOpenModal(false))
                  dispatch(resetConfirmProps())
                  dispatch(resetConfirmData())
                  dispatch(getOneProject(project?.id))
                  dispatch(getMyProjects())
                }
                else {
                  toast.success(res?.data?.message)
                }
              }).catch(err => {
                toast.error(err?.response?.data?.message)
              }).finally(() => {
                dispatch(setConfirmProps({ is_loading: false }))
              })
          }
        }
      }
    }
    dispatch(resetConfirmProps())
    dispatch(setConfirmProps(modalContent))
    dispatch(setConfirmState(true))
    dispatch(setOpenModal(true))
  }

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#fff',
        border: '1px solid #E0E0E0',
        borderRadius: '4px',
        padding: '24px'
      }}
    >
      <Box sx={{ width: '100%', mb: '18px' }}>
        <SimpleTypography
          text="Список моделей"
          sx={{
            fontWeight: 500,
            fontSize: '22px',
            lineHeight: '26px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
          }}
        />
      </Box>

      <Box sx={{ width: '100%' }} id="model_list">
        {
          getProjectStatus == 'succeeded' ? (
            !!project?.project_models && !!project?.project_models?.length
              ?
              <List
                sx={listSx}
              >
                <ListItem alignItems="center"
                  key={-1}
                  sx={liHeaderSx}
                >
                  <ListItemText sx={{ ...widthControl }} >
                    <SimpleTypography
                      text='Модель'
                      sx={{ ...liHeaderTextSx }}
                    />
                  </ListItemText>

                  <ListItemText sx={{ ...widthControl, pl: '8px' }} >
                    <SimpleTypography
                      text='Бренд'
                      sx={{ ...liHeaderTextSx }}
                    />
                  </ListItemText>

                  <ListItemText sx={{ ...widthControl, pl: '16px' }} >
                    <SimpleTypography
                      text='Цена'
                      sx={{ ...liHeaderTextSx }}
                    />
                  </ListItemText>

                  <ListItemText sx={{ ...widthControl, pl: '24px' }} >
                    <SimpleTypography
                      text='Действия'
                      sx={{ ...liHeaderTextSx }}
                    />
                  </ListItemText>
                </ListItem>
                {
                  project?.project_models?.map((project_model, index: any) =>
                    <>
                      <ListItem key={index} alignItems="center"
                        sx={liSx}
                      >

                        <ListItemText sx={{
                          ...widthControl,
                          '& span': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                          }
                        }}
                        >
                          <ListItemAvatar
                            sx={brandImageWrapperSx}
                          >
                            <Link key={index} href={`/models/${project_model['model.slug']}`}>
                              <Image
                                src={project_model["model.cover"][0]?.image_src ? `${IMAGES_BASE_URL}/${project_model["model.cover"][0]?.image_src}` : ''}
                                alt='Landing image'
                                width={84}
                                height={84}
                                style={brandImageSx}
                              />
                            </Link>
                          </ListItemAvatar>

                          <ListItemText className='brand_name' sx={{ marginLeft: '24px' }} >
                            <Link key={index} href={`/models/${project_model['model.slug']}`}>
                              <SimpleTypography
                                text={project_model['model.name']}
                                sx={{
                                  fontSize: '13px',
                                  fontWeight: 400,
                                  lineHeight: '18px',
                                  textAlign: 'start',
                                  color: '#141414'
                                }}
                              />
                            </Link>
                          </ListItemText>
                        </ListItemText>

                        <ListItemText sx={{ ...widthControl }} >
                          <Link
                            href={`/${project_model['model.brand.slug']}`}
                          >
                            <SimpleTypography
                              text={project_model['model.brand.name']}
                              sx={{
                                color: '#1D5BF9',
                                textDecoration: 'underline',
                                fontSize: '14px',
                                fontWeight: 500,
                                lineHeight: '17px',
                                textAlign: 'start',
                              }}
                            />
                          </Link>
                        </ListItemText>

                        <ListItemText sx={{ ...widthControl }}>
                          <SimpleTypography
                            text={project_model['model.furniture_cost'] ? Intl.NumberFormat('uz-UZ').format(project_model['model.furniture_cost']) + ' UZS' : 'Не указан'}
                            sx={{
                              fontSize: '14px',
                              fontWeight: 400,
                              lineHeight: '20px',
                              textAlign: 'left',
                            }}
                          />
                        </ListItemText>

                        <Box
                          sx={{
                            ...widthControl,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                          }}
                        >
                          <Box margin={'0'}>
                            <Buttons
                              onClick={() => handleRemoveModel(project_model)}
                              className='bookmark__btn'
                              sx={{
                                p: '8px !important',
                                width: '36px',
                                height: '36px'
                              }}
                            >
                              <Image
                                style={{ margin: '0' }}
                                alt='icon'
                                width={24}
                                height={24}
                                src={'/icons/trash-gray.svg'}
                              />
                            </Buttons>
                          </Box>
                          <Box margin={'0 0 0 16px'}>
                            <Buttons
                              className="bookmark__btn"
                              onClick={project_model['model.availability'] != 2 ? () => handleDownloadModel(project_model) : (): any => { return 0 }}
                              startIcon={isSubmitting}
                              endIcon={undefined}
                              disabled={isSubmitting || project_model['model.availability'] == 2}
                              sx={{
                                p: '8px !important',
                                width: '36px',
                                height: '36px'
                              }}
                            >
                              <Image
                                style={{ margin: '0' }}
                                alt='icon'
                                width={24}
                                height={24}
                                src={'/icons/download.svg'}
                              />
                            </Buttons>
                          </Box>
                        </Box>

                      </ListItem>
                      {
                        project?.project_models?.length && index != project?.project_models?.length - 1 ?
                          <Divider sx={{ margin: 0 }} variant="inset" component="li" />
                          : null
                      }
                    </>
                  )
                }
              </List>
              : <EmptyData sx={{ marginTop: '8px' }} boxShadow={false} />
          )
            : (
              <List
                sx={{ ...listSx, marginBottom: '32px' }}
              >
                <ListItem alignItems="center"
                  key={-1}
                  sx={liHeaderSx}
                >
                  <Box
                    sx={{ ...liHeaderTextSx, textAlign: 'center !important', minWidth: '30px', marginRight: '16px' }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={20}
                      height={20}
                    />
                  </Box>
                  <Box
                    sx={{ ...liHeaderTextSx, minWidth: '490px', }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={56}
                      height={20}
                    />
                  </Box>
                  <Box
                    sx={{ ...liHeaderTextSx, minWidth: '400px', }}

                  >
                    <Skeleton
                      variant="rectangular"
                      width={56}
                      height={20}
                    />
                  </Box>
                  <Box
                    sx={{ ...liHeaderTextSx, minWidth: '180px', }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={56}
                      height={20}
                    />
                  </Box>
                </ListItem>
                {
                  fakeData?.map((i) =>
                    <Box key={i}>
                      <ListItem key={i} alignItems="center"
                        sx={liSx}
                      >

                        <ListItemText sx={{ maxWidth: 30, marginRight: '16px' }}>
                          <Skeleton
                            variant="rectangular"
                            width={20}
                            height={20}
                          />
                        </ListItemText>

                        <ListItemAvatar
                          sx={brandImageWrapperSx}
                        >
                          <Skeleton
                            variant="rectangular"
                            sx={brandImageSx}
                          />
                        </ListItemAvatar>


                        <ListItemText className='brand_name' sx={{ marginLeft: '24px', minWidth: '380px' }} >
                          <Skeleton
                            variant="rectangular"
                            width={100}
                            height={20}
                            sx={{ marginBottom: '5px' }}
                          />
                          <Skeleton
                            variant="rectangular"
                            width={80}
                            height={18}
                          />
                        </ListItemText>

                        <ListItemText sx={{ minWidth: '400px' }} >
                          <Skeleton
                            variant="rectangular"
                            width={56}
                            height={20}
                          />
                        </ListItemText>
                        <ListItemText sx={{ minWidth: '180px' }}>
                          <Skeleton
                            variant="rectangular"
                            width={56}
                            height={20}
                          />
                        </ListItemText>
                      </ListItem>
                    </Box>
                  )
                }
              </List>
            )
        }
      </Box>

    </Box>
  )
}