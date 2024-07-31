"use client"

import { Box, SxProps } from '@mui/system';
import axios from 'axios';
import { useState, useEffect, CSSProperties, MouseEvent, useMemo } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { readFile } from '@/components/inputs/file_input';
import { useDispatch, useSelector } from 'react-redux';
import { selectOneInterior } from '@/data/get_one_interior';
import { IMAGES_BASE_URL } from '@/utils/env_vars';
import { setShowInteriorImagesModal } from '@/data/loader';
import Image from 'next/image';
import { selectToggleAddingTags, selectToggleShowTags } from '../../../../data/toggle_tags';
import SimpleInp from '../../../inputs/simple_input';
import Buttons from '../../../buttons';
import { CheckOutlined, Close, DoneOutline } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import { v4 } from 'uuid';
import SearchInput from '../../../inputs/search';
import SimpleTypography from '../../../typography';
import instance from '../../../../utils/axios';
import { toast } from 'react-toastify';
import { selectInteriorTags, setInteriorTags } from '../../../../data/get_interior_tags';
import Link from 'next/link';
import { selectMyProfile } from '../../../../data/me';
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setOpenModal } from '../../../../data/modal_checker';

const imageStyle: CSSProperties = {
  verticalAlign: 'top',
  overflowClipMargin: 'content-box',
  overflow: 'clip',
  objectFit: 'cover',
  width: '100%',
  height: '100%'
}
// useEffect(() => {
//     const getImageSize = () => {
//         const img = new Image();
//         img.src = imageUrl;
//         img.onload = () => {
//             setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
//         };
//     };

//     getImageSize();
// }, [imageUrl]);

interface NewTag {
  id: string;
  x: number;
  y: number;
  img: string;
  not_found?: boolean;
  loading?: boolean;
  model?: {
    id: string;
    name: string;
    brand: string;
    cover: string;
    [x: string]: any;
  }
}

const tagStyle: SxProps = {
  position: 'absolute',
  zIndex: 300,
  cursor: 'default',
  padding: '7px',
  borderRadius: '32px 32px 32px 0',
  border: '1px solid #686868',
  boxShadow: '0px 4px 8px 0px #00000040',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  transition: 'all 0.4s ease',
}


export default function InteriorImages() {
  const dispatch = useDispatch<any>()
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const interior = useSelector(selectOneInterior)
  const interiorTags = useSelector(selectInteriorTags)
  const showTags = useSelector(selectToggleShowTags)
  const addingTags = useSelector(selectToggleAddingTags)
  const currentUser = useSelector(selectMyProfile);

  const [newTags, setNewTags] = useState<NewTag[]>([])
  const [loadingTagId, setLoadingTagId] = useState<string>('')

  useMemo(() => {
    if (addingTags == false) {
      setNewTags([])
    }
  }, [addingTags])

  function handleClick(event, index) {
    const target = event.target;
    const classList = [...target.classList]
    if (
      classList.includes('image') ||
      classList.includes('image_wrapper__box') ||
      classList.includes('image_parent_wrapper__box')
    ) {
      if (addingTags) {
        const rect = target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setNewTags(prev => [...prev, { id: v4(), x, y, img: interior?.images[index]?.id }])
      }
    }
  }

  function handleRemoceNewEmptyTag(id) {
    const arr = [...newTags]
    const filtered = arr.filter(x => x.id != id)
    setNewTags(filtered)
  }

  function handleInputChange(url: string, tagId: string) {
    if (url && url.includes('/models/')) {
      const arr = [...newTags]
      const tagIndex = arr.findIndex(t => t.id === tagId)
      arr[tagIndex].loading = true;
      setNewTags(arr)
    }
  }

  function handleTagMouseEnter(event, tag) {
    const elem = event.currentTarget.querySelector('.tag_inner_content')!;
    const index = event.currentTarget.querySelector(`.ind${tag.id}`)!;
    elem['style']['display'] = 'flex';
    index['style']['display'] = 'none';
    setTimeout(() => {
      elem['style']['opacity'] = 1;
    }, 300)
  }
  function handleTagMouseLeave(event, tag) {
    const elem = event.currentTarget.querySelector('.tag_inner_content')!;
    const index = event.currentTarget.querySelector(`.ind${tag.id}`)!;
    elem['style']['display'] = 'none';
    elem['style']['opacity'] = 0;
    setTimeout(() => {
      index['style']['display'] = 'inline-block';
    }, 300)
  }

  function handleGetModel(url: string, tagId: string) {
    if (url && url.includes('/models/')) {
      const arr = [...newTags]
      const tagIndex = arr.findIndex(t => t.id === tagId)

      instance.get(`models/${url.split('/models/')[1]}`)
        .then(res => {
          const model = res?.data?.data?.model;
          arr[tagIndex].model = {
            ...model,
            cover: model.images ? `${IMAGES_BASE_URL}/${model?.images?.find(i => i.is_main == true)?.image_src}` : '',
            brand: model.brand.name
          }
          arr[tagIndex].loading = false;
          setNewTags(arr)
        })
        .catch(err => {
          if (err?.responst?.data?.error?.status == 404) {
            const arr = [...newTags]
            arr[tagIndex].loading = false;
            arr[tagIndex].not_found = true;
            arr[tagIndex].model = undefined;
            setNewTags(arr)
          }
          else toast.error(err?.responst?.data?.message)
        })
    }
  }

  function handleTagCreate(tagId) {
    const arr = [...newTags]
    const tagIndex = arr.findIndex(t => t.id === tagId)
    const tag = newTags[tagIndex]

    if (tag && tag.model) {
      setLoadingTagId(tag.id)
      instance.post('tags', {
        model_id: tag.model.id,
        interior_id: interior?.id,
        interior_image_id: tag.img,
        x: tag.x,
        y: tag.y,
      }).then(res => {
        dispatch(setInteriorTags([...interiorTags, res?.data?.data?.tag]))
        arr.splice(tagIndex, 1)
        setNewTags(arr)
      }).catch(err => {
        console.log(err);
      })
    }
  }

  function handleDeleteTag(tagId) {

    const arr = [...interiorTags]
    const tagIndex = arr.findIndex(t => t.id === tagId)
    const tag = arr[tagIndex]
    if (tag) {
      const modalContent: ConfirmContextProps = {
        message: `Вы уверены, что хотите удалить бирка «${tag?.model?.name}»?`,
        actions: {
          on_click: {
            args: [interior?.id],
            func: async (checked: boolean, id: number) => {
              dispatch(setConfirmProps({ is_loading: true }))
              instance.delete(`tags/${tag?.id}`)
                .then(res => {
                  if (res?.data?.success) {
                    toast.success(res?.data?.message)
                    dispatch(setConfirmState(false))
                    dispatch(setOpenModal(false))
                    dispatch(resetConfirmProps())
                    dispatch(resetConfirmData())
                    arr.splice(tagIndex, 1)
                    dispatch(setInteriorTags(arr))
                  }
                })
                .catch(err => {
                  console.log(err);
                  toast.error(err?.response?.data?.message)
                })
                .finally(() => {
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
  }

  return (

    interior?.images?.map((img, n) => {
      if (!img?.is_main) {
        return (
          <Box key={n}
            className={'image_parent_wrapper__box'}
            sx={{ marginBottom: '20px', cursor: 'pointer' }}
          >
            <Box
              className={'image_wrapper__box'}
              onClick={(e) => handleClick(e, n)}
              sx={{
                width: '1200px',
                height: '1200px',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.4s ease',
              }}>
              {
                newTags?.length
                  ? newTags?.map(t => {
                    if (t.img == img.id)
                      return (
                        <Box
                          key={t.id}
                          className={'add_tag_wrapper__box'}
                          sx={{
                            top: t.y - (t.model || t.not_found || t.loading ? 113 : 56),
                            left: t.x,
                            width: '345px',
                            minHeight: `${t.model || t.not_found || t.loading ? 113 : 56}px`,
                            ...tagStyle
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                            }}
                          >
                            <Box
                              sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                              }}
                            >
                              <SearchInput
                                className={'add_tag__input'}
                                placeHolder='https://demod.uz/models/...'
                                search={(val) => handleGetModel(val, t.id)}
                                searchDelay={500}
                                onChange={(val) => handleInputChange(val, t.id)}
                                sx={{
                                  borderTopLeftRadius: '20px'
                                }}
                              />
                              {
                                t.model || t.not_found || t.loading
                                  ? <Box
                                    sx={{
                                      width: '100%',
                                      minHeight: '50px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: t.loading ? 'center' : 'flex-start',
                                      mt: '7px',
                                    }}
                                  >
                                    {
                                      t.loading ?
                                        <CircularProgress size="1rem" />
                                        : <>
                                          <Image
                                            alt='cover'
                                            src={t.model ? t.model.cover : t.not_found ? '/img/empty-box.svg' : ''}
                                            width={50}
                                            height={50}
                                          />
                                          <SimpleTypography
                                            sx={{ ml: '7px' }}
                                            text={t.model ? t.model.name : t.not_found ? 'Модель не найдена' : ''}
                                          />
                                        </>
                                    }
                                  </Box>
                                  : null
                              }
                            </Box>
                            <Box
                              className={'add_tag_buttons_wrapper__box'}
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-start',
                                ml: '7px',
                              }}
                            >
                              <IconButton
                                className={'icon_button add_tag__button'}
                                onClick={() => handleRemoceNewEmptyTag(t.id)}
                              >
                                <Close />
                              </IconButton>
                              {
                                t.model ?
                                  <Buttons
                                    className={'icon_button add_tag__button'}
                                    disabled={!Boolean(t.model) || loadingTagId == t.id}
                                    onClick={() => handleTagCreate(t.id)}
                                    startIcon={loadingTagId == t.id}
                                  >
                                    <CheckOutlined />
                                  </Buttons>
                                  : null
                              }
                            </Box>
                          </Box>
                        </Box>
                      )
                  })
                  : null
              }

              {
                showTags && interiorTags?.length
                  ? interiorTags?.map((t, i) => {
                    if (t.interior_image_id == img.id)
                      return (
                        <Box
                          key={t.id}
                          className={'add_tag_wrapper__box'}
                          onMouseEnter={(e) => handleTagMouseEnter(e, t)}
                          onMouseLeave={(e) => handleTagMouseLeave(e, t)}
                          sx={{
                            ...tagStyle,
                            opacity: 0.7,
                            padding: '7px 14px',
                            top: t.y - 46,
                            left: t.x - 0,
                            minHeight: `46px`,
                            width: '46px',
                            height: '46px',
                            borderRadius: '23px',
                            borderBottomLeftRadius: '0',
                            transition: 'all 0.4s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                            '&:hover': {
                              opacity: 1,
                              width: isAuthenticated && interior?.author?.id == currentUser?.user_id ? '320px' : '250px',
                              height: '94px',
                              top: t.y - 94,
                              left: t.x - 0,
                              minHeight: '94px',
                              borderRadius: '32px 32px 32px 0',
                            }
                          }}
                        >
                          <Box
                            className={'tag_inner_content'}
                            sx={{
                              textDecoration: "none",
                              display: "none",
                              width: '100%',
                              alignItems: "center",
                              justifyContent: 'space-between',
                              opacity: 0,
                              transition: 'all 0.4s ease',
                            }}
                          >
                            <Link
                              href={`/models/${t?.model?.slug}`}
                              target='_blank'
                              style={{
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start'
                              }}
                            >
                              <Image
                                src={`${IMAGES_BASE_URL}/${t?.model?.cover[0]?.image_src}`}
                                alt="icon"
                                width={80}
                                height={80}
                              />
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-start',
                                  justifyContent: 'center',
                                  marginLeft: '10px',
                                  maxWidth: '130px',
                                }}
                              >
                                <SimpleTypography sx={{ width: '100% !important', marginLeft: '0px !important' }} className='card__title drow-down__text' text={t?.model?.name} />
                                <SimpleTypography sx={{ width: '100% !important', marginLeft: '0px !important' }} className='card__title drow-down__text' text={`${t?.model?.style?.name}, ${t?.model?.brand?.name}`} />
                              </Box>
                            </Link>
                            {
                              isAuthenticated && interior?.author?.id == currentUser?.user_id
                                ? <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingLeft: '10px',
                                    borderLeft: '1.6px solid #E0E0E0'
                                  }}
                                >
                                  <Buttons className='delete__tag'
                                    onClick={(e) => handleDeleteTag(t.id)}
                                    disabled={loadingTagId == t.id}
                                    startIcon={loadingTagId == t.id}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M1.66634 4.33398H12.333V13.0007C12.333 13.1775 12.2628 13.347 12.1377 13.4721C12.0127 13.5971 11.8432 13.6673 11.6663 13.6673H2.33301C2.1562 13.6673 1.98663 13.5971 1.8616 13.4721C1.73658 13.347 1.66634 13.1775 1.66634 13.0007V4.33398ZM2.99967 5.66732V12.334H10.9997V5.66732H2.99967ZM4.99967 7.00065H6.33301V11.0007H4.99967V7.00065ZM7.66634 7.00065H8.99967V11.0007H7.66634V7.00065ZM3.66634 2.33398V1.00065C3.66634 0.82384 3.73658 0.654271 3.8616 0.529246C3.98663 0.404222 4.1562 0.333984 4.33301 0.333984H9.66634C9.84315 0.333984 10.0127 0.404222 10.1377 0.529246C10.2628 0.654271 10.333 0.82384 10.333 1.00065V2.33398H13.6663V3.66732H0.333008V2.33398H3.66634ZM4.99967 1.66732V2.33398H8.99967V1.66732H4.99967Z" fill="#686868" />
                                    </svg>
                                  </Buttons>
                                </Box>
                                : null
                            }

                          </Box>
                          <SimpleTypography classNames={`ind${t.id}`} text={i + 1} />
                        </Box>
                      )
                  })
                  : null
              }
              <Image
                className={'image'}
                unoptimized
                src={`${IMAGES_BASE_URL}/${img?.image_src}`}
                alt="Diesign image"
                width={0}
                height={0}
                style={imageStyle}
              />
            </Box>
          </Box>
        )
      }
    })
  );
};