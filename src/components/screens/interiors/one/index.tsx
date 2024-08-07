"use client"

import React, { use, useContext, useMemo, useState } from 'react'
import { Avatar, Box, Button, Divider, Grid, ListItemAvatar, Menu, MenuItem, Paper, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SimpleTypography from '../../../typography';
import { sampleInterior, sampleModel, sampleUser } from '@/data/samples';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Buttons from '@/components/buttons';
import Image from 'next/image';
import { ThemeProps } from '@/types/theme';
import { sampleComments } from '@/data/samples/sample_comments';
import { CommentSection } from '@/components/comment_section';
import { getOneInterior, selectOneInterior } from '../../../../data/get_one_interior';
import { selectMyProfile } from '../../../../data/me';
import { useParams, useRouter } from 'next/navigation';
import { IMAGES_BASE_URL } from '../../../../utils/env_vars';
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from 'next/link';
import EmptyData from '../../../views/empty_data';
import instance from '../../../../utils/axios';
import Cookies from 'js-cookie';
import { selectComments } from '../../../../data/get_comments';
import formatComments, { CommentFormatInterface } from '../../../comment_section/format_comments';
import InteriorImages from '../../../views/interior/interior_images';
import InteriorImagesModal from '../../../views/interior/interior_images/images_modal';
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setLoginState, setOpenModal } from '../../../../data/modal_checker';
import { toast } from 'react-toastify';
import { selectToggleAddingTags, selectToggleShowTags, toggleAddingTags, toggleShowTags } from '../../../../data/toggle_tags';
import { VisibilityOutlined, VisibilityOffOutlined, Favorite, FavoriteBorder } from '@mui/icons-material';
import { selectInteriorTags, setInteriorTags } from '../../../../data/get_interior_tags';
import { getSavedInteriors } from '../../../../data/get_saved_interiors';
import { getCategories } from '../../../../data/categories';

const TagsDropDown = styled(Menu)(
  ({ theme }: ThemeProps) => `

  .MuiList-root{
    width:340px;
    max-height: 500px;
    overflow-x: auto;
    border: 1px solid #E0E0E0;
    padding: 8px;
  }

  .MuiPaper-root{
    border-radius:0 !important;
    box-shadow: 0px 7px 12px 0px #00000040;
  }
  `
);

const ActionsDropDown = styled(Menu)(
  ({ theme }: ThemeProps) => `

  .MuiList-root{
    overflow-x: auto;
    border: 1px solid #E0E0E0;
    padding: 8px;
  }

  .MuiPaper-root{
    border-radius:0 !important;
    box-shadow: 0px 7px 12px 0px #00000040;
  }
  `
);

export default function OneInterior() {

  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const getInteriorStatus = useSelector((state: any) => state?.get_one_interior?.status)
  const getCommentsStatus = useSelector((state: any) => state?.get_comments?.status)
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const dispatch = useDispatch<any>()

  const currentUser = useSelector(selectMyProfile);
  const interior = useSelector(selectOneInterior);
  const interiorTags = useSelector(selectInteriorTags);
  const commentsData = useSelector(selectComments);
  const showTags = useSelector(selectToggleShowTags)
  const addingTags = useSelector(selectToggleAddingTags)

  const [comments, setComments] = useState<CommentFormatInterface[]>([]);
  const [commentCurrentUser, setCommentUser] = useState<any>(null)
  const [isSaved, setIsSaved] = useState<any>(false)
  const [isLiked, setIsLiked] = useState<any>(false)
  const [likesCount, setLikesCount] = useState<number>(0)
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const menuOpen = Boolean(menuAnchorEl);


  const handleMenuClick = (event: any) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  React.useEffect(() => {
    if (interior && isAuthenticated && currentUser) {
      setIsSaved(interior?.is_saved)
      setIsLiked(interior?.is_liked)
      setLikesCount(interior?.likes)
    }
  }, [isAuthenticated, currentUser, interior])

  React.useEffect(() => {
    if (getCommentsStatus == "succeeded" && commentsData) {
      setComments(formatComments(commentsData))
    }
  }, [commentsData, getCommentsStatus])

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function setShowTags() {
    dispatch(toggleShowTags(!showTags))
  }
  function setAddingTags() {
    dispatch(toggleAddingTags(!addingTags))
  }

  const handleSave = () => {

    if (!isAuthenticated) {
      dispatch(setLoginState(true))
      dispatch(setOpenModal(true))
      return;
    }

    if (!isSaved) {
      setIsSaved(true)
      instance.post(
        '/saved/interiors',
        { interior_id: interior?.id }
      ).then(res => {
        setIsSaved(res?.data?.success)
        dispatch(getSavedInteriors())
        // toast.success(res?.data?.message)
      }).catch(err => {
        setIsSaved(false)
        // toast.error(err?.response?.data?.message)
      })
    }
    else if (isSaved) {
      setIsSaved(false)
      instance.delete(
        '/saved/interiors/' + interior?.id
      ).then(res => {
        setIsSaved(!res?.data?.success)
        dispatch(getSavedInteriors())
        // toast.success(res?.data?.message)
      }).catch(err => {
        setIsSaved(true)
        // toast.error(err?.response?.data?.message)
      })
    }
  };

  const handleLike = () => {

    if (!isAuthenticated) {
      dispatch(setLoginState(true))
      dispatch(setOpenModal(true))
      return;
    }

    if (!isLiked) {
      setIsLiked(true)
      setLikesCount(prev => prev + 1)
      instance.post(`/interiors/lk/${interior?.id}`)
        .then(res => {
          setIsLiked(res?.data?.success)
          if (res?.data?.success == false) setLikesCount(prev => prev - 1)
        }).catch(err => {
          setIsLiked(false)
        })
    }
    else if (isLiked) {
      setIsLiked(false)
      setLikesCount(prev => prev - 1)
      instance.delete(`/interiors/lk/${interior?.id}`)
        .then(res => {
          setIsLiked(!res?.data?.success)
        }).catch(err => {
          setIsLiked(true)
          setLikesCount(prev => prev + 1)
        })
    }
  };


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
                  handleMenuClose();
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

  function handleDeleteComment(comIdToDelete, afterDelete: Function) {

    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите удалить этот комментарий?`,
      actions: {
        on_click: {
          args: [comIdToDelete],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }))
            instance.delete(`comments/${comIdToDelete}`)
              .then(async res => {
                if (res?.data?.success) {
                  await afterDelete()
                  toast.success(res?.data?.message)
                  dispatch(setConfirmState(false))
                  dispatch(setOpenModal(false))
                  dispatch(resetConfirmProps())
                  dispatch(resetConfirmData())
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

  function handleClickDelete() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите удалить интерьер «${interior?.name}»?`,
      actions: {
        on_click: {
          args: [interior?.id],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }))
            instance.delete(`/interiors/${id}`)
              .then(res => {
                if (res?.data?.success) {
                  toast.success(res?.data?.message)
                  dispatch(getCategories())
                  dispatch(setConfirmState(false))
                  dispatch(setOpenModal(false))
                  dispatch(resetConfirmProps())
                  dispatch(resetConfirmData())
                }
                else {
                  toast.success(res?.data?.message)
                }
              }).catch(err => {
                toast.error(err?.response?.data?.message)
              }).finally(() => {
                dispatch(setConfirmProps({ is_loading: false }))
                handleMenuClose();
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
    <Box sx={{ background: "#fafafa" }} className="products" >
      <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>

        <Grid container
          sx={{
            margin: '32px 0 40px 0',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >

          {/* TAGS MENU */}
          <TagsDropDown
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            {
              interiorTags && interiorTags?.length > 0
                ? interiorTags?.map((e, i) => (
                  <MenuItem
                    key={i}
                    onClick={handleClose}
                    sx={{
                      padding: "8px",
                    }}
                  >
                    <Box
                      sx={{
                        textDecoration: "none",
                        display: "flex",
                        width: '100%',
                        alignItems: "center",
                        justifyContent: 'space-between'
                      }}
                    >
                      <Link
                        href={`/models/${e?.model?.slug}`}
                        target='_blank'
                        style={{
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start'
                        }}
                      >
                        <SimpleTypography text={`${i + 1}`} sx={{ marginRight: '10px', fontWeight: 400, fontSize: '16px', lineHeight: '22px' }} />
                        <Image
                          src={`${IMAGES_BASE_URL}/${e?.model?.cover[0]?.image_src}`}
                          alt="user icon"
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
                            maxWidth: '130px'
                          }}
                        >
                          <SimpleTypography sx={{ width: '100% !important', marginLeft: '0px !important' }} className='card__title drow-down__text' text={e?.model?.name} />
                          <SimpleTypography sx={{ width: '100% !important', marginLeft: '0px !important' }} className='card__title drow-down__text' text={`${e?.model?.style?.name}, ${e?.model?.brand?.name}`} />
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
                              onClick={() => handleDeleteTag(e?.id)}
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.66634 4.33398H12.333V13.0007C12.333 13.1775 12.2628 13.347 12.1377 13.4721C12.0127 13.5971 11.8432 13.6673 11.6663 13.6673H2.33301C2.1562 13.6673 1.98663 13.5971 1.8616 13.4721C1.73658 13.347 1.66634 13.1775 1.66634 13.0007V4.33398ZM2.99967 5.66732V12.334H10.9997V5.66732H2.99967ZM4.99967 7.00065H6.33301V11.0007H4.99967V7.00065ZM7.66634 7.00065H8.99967V11.0007H7.66634V7.00065ZM3.66634 2.33398V1.00065C3.66634 0.82384 3.73658 0.654271 3.8616 0.529246C3.98663 0.404222 4.1562 0.333984 4.33301 0.333984H9.66634C9.84315 0.333984 10.0127 0.404222 10.1377 0.529246C10.2628 0.654271 10.333 0.82384 10.333 1.00065V2.33398H13.6663V3.66732H0.333008V2.33398H3.66634ZM4.99967 1.66732V2.33398H8.99967V1.66732H4.99967Z" fill="#686868" />
                              </svg>
                            </Buttons>
                          </Box>
                          : null
                      }

                    </Box>
                  </MenuItem>
                ))
                : <EmptyData boxShadow={false} border={false} />
            }

          </TagsDropDown>

          {/* ACTIONS MENU */}
          <ActionsDropDown
            id="basic-menu"
            anchorEl={menuAnchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            <MenuItem
              onClick={handleMenuClose}
              sx={{ padding: "6px 12px" }}
            >
              <Link
                href={`/interiors/edit/${interior?.slug}`}
                style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
              >

                <Image
                  src="/icons/edit-pen.svg"
                  alt="icon"
                  width={17}
                  height={17}
                />
                <SimpleTypography className='drow-down__text' text='Редактировать' />

              </Link>
            </MenuItem>

            <MenuItem
              onClick={handleClickDelete}
              sx={{ padding: "6px 12px" }}
            >
              <Image
                src="/icons/trash.svg"
                alt="icon"
                width={17}
                height={17}
              />
              <SimpleTypography className='drow-down__text' text='Удалить' />

            </MenuItem>

          </ActionsDropDown>

          <Grid item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Link href={`/designers/${interior?.author?.username}`}>
              <ListItemAvatar
                sx={{
                  backgroundColor: '#fff',
                  width: '72px',
                  height: '72px',
                  border: '1px solid #E0E0E0',
                  borderRadius: '50%',
                }}
              >
                <Avatar
                  src={interior?.author?.image_src ? `${IMAGES_BASE_URL}/${interior?.author?.image_src}` : '/img/avatar.png'}
                  alt='User image'
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%'
                  }}
                />
              </ListItemAvatar>
            </Link>

            <Box sx={{ marginLeft: '24px' }}>
              <Link href={`/designers/${interior?.author?.username}`}>
                <SimpleTypography
                  text={interior?.author?.company_name}
                  sx={{
                    fontSize: '22px',
                    fontWeight: 400,
                    lineHeight: '26px',
                    letterSpacing: '-0.02em',
                    textAlign: 'start',
                    color: '#141414'
                  }}
                />
              </Link>
              <Link href={`/designers/${interior?.author?.username}`}>
                <SimpleTypography
                  text={interior?.author?.full_name}
                  sx={{
                    fontSize: '18px',
                    fontWeight: 400,
                    lineHeight: '24px',
                    letterSpacing: '-0.01em',
                    textAlign: 'start',
                    color: '#848484'
                  }}
                />
              </Link>
            </Box>
          </Grid>

          <Grid item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Box margin={'0 0 0 16px'}
              sx={{ display: 'flex' }}
            >
              <VisibilityOutlined
                sx={{
                  width: '20px',
                  color: '#424242',
                }}
              />
              <SimpleTypography
                text={interior?.views}
                sx={{ ml: '6px' }}
              />
            </Box>
            <Box margin={'0 0 0 16px'}>
              <Buttons
                id="basic-menu"
                aria-controls={'basic-menu'}
                aria-haspopup="true"
                aria-expanded={true}
                onClick={handleClick}
                sx={{ padding: "0 3px ", display: "flex", "&:hover": { background: "#F5F5F5" } }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SimpleTypography
                    text={`Бирки (${interiorTags?.length || 0})`}
                    sx={open ? { color: "#7210BE !important" } : {}}
                    className={''}
                  />
                  <KeyboardArrowDownIcon
                    sx={!open ? { minWidth: "11px", minHeight: "7px", color: "black" } : { minWidth: "11px", minHeight: "7px", color: "#7210BE", transform: "rotateZ(180deg)", transitionDuration: "1000ms" }}
                  />
                </Box>
              </Buttons>
            </Box>
            <Box margin={'0 0 0 16px'}>
              <Buttons
                name={`${showTags ? 'Скрыть' : 'Показать'} бирки`}
                onClick={setShowTags}
                className='bookmark__btn'
                childrenFirst={true}
              >
                <Image
                  alt='hide'
                  width={18}
                  height={18}
                  src={showTags ? '/img/icon-invisible.svg' : '/img/icon-visible.svg'}
                />
              </Buttons>
            </Box>
            {
              isAuthenticated && interior?.author?.id === currentUser?.user_id
                ?
                <>
                  <Box margin={'0 0 0 16px'}>
                    <Buttons
                      onClick={setAddingTags}
                      name='Добавить бирки'
                      className='bookmark__btn'
                      childrenFirst={true}
                    >
                      <Image
                        style={{
                          transition: 'all 0.2s ease',
                          transform: addingTags ? 'rotateY(0deg) rotate(45deg)' : '',
                        }}
                        alt='bookmark'
                        width={18}
                        height={18}
                        src={'/icons/plus.svg'}
                      />
                    </Buttons>
                  </Box>
                  <Box margin={'0 0 0 16px'}>
                    <Buttons
                      name={`Нравиться  (${likesCount})`}
                      className='bookmark__btn'
                      childrenFirst={true}
                      onClick={handleLike}
                    >
                      {isLiked ? <Favorite sx={{ mr: '8px' }} /> : <FavoriteBorder sx={{ mr: '8px' }} />}
                    </Buttons>
                  </Box>
                  <Box margin={'0 0 0 16px'}>
                    <Buttons
                      className='bookmark__btn'
                      onClick={handleMenuClick}
                      sx={{
                        p: '8px !important'
                      }}
                    >
                      <Image
                        style={{ margin: '0' }}
                        alt='icon'
                        width={26}
                        height={26}
                        src={'/icons/horizontal-dots.svg'}
                      />
                    </Buttons>
                  </Box>
                </>
                :
                <>
                  <Box margin={'0 0 0 16px'}>
                    <Buttons
                      name={`Нравиться  (${likesCount})`}
                      className='bookmark__btn'
                      childrenFirst={true}
                      onClick={handleLike}
                    >
                      {isLiked ? <Favorite sx={{ mr: '8px' }} /> : <FavoriteBorder sx={{ mr: '8px' }} />}
                    </Buttons>
                  </Box>
                </>
            }
          </Grid>
        </Grid>

        <Box sx={{
          width: '100%',
          minHeight: '80dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          <InteriorImages />
        </Box>

        <Box sx={{ width: '100%' }}>
          <SimpleTypography
            text={interior?.name}
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: '26px',
              lineHeight: '37.7px',
              marginBottom: '24px'
            }}
          />

          {
            interiorTags && interiorTags?.length > 0
              ? <Box sx={{ width: '100%' }}>
                <SimpleTypography
                  text='Использованные 3D модели:'
                  variant="h3"
                  sx={{
                    fontWeight: 400,
                    fontSize: '22px',
                    lineHeight: '31.9px',
                    letterSpacing: '-0.02em'
                  }}
                />
                {
                  interiorTags?.map((i, n) => (
                    <Box key={n} sx={{ width: '100%' }}>
                      <SimpleTypography
                        text={`${n + 1}. ${i?.model?.name}`}
                        sx={{
                          fontWeight: 400,
                          fontSize: '22px',
                          lineHeight: '31.9px',
                          letterSpacing: '-0.02em'
                        }}
                      />
                    </Box>
                  ))
                }
              </Box>
              : null
          }
        </Box>

        <Divider sx={{ margin: '40px 0' }} />

        <Box sx={{ width: '100%' }}>

          <CommentSection
            titleStyle={{
              fontWeight: 500,
              fontSize: '30px',
              lineHeight: '36px',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}
            submitBtnStyle={{
              width: '120px'
            }}
            cancelBtnStyle={{
              width: '120px'
            }}
            currentUser={commentCurrentUser}
            advancedInput={false}
            logIn={{
              loginLink: 'http://localhost:3001/',
              signupLink: 'http://localhost:3001/'
            }}
            commentData={comments}
            onSubmitAction={
              (data) => {
                instance.post('/comments',
                  {
                    text: data.text,
                    entity_source: 'interiors',
                    entity_id: interior?.id,
                  }
                ).then(async res => {
                  if (res?.data?.success) await data?.afterSubmit(res?.data?.data?.comment)
                }).catch(err => {
                  toast.error(err?.response?.data?.message)
                })
              }}
            onReplyAction={
              (data) => {
                instance.post(
                  '/comments',
                  {
                    text: data.text,
                    parent_id: data.repliedToCommentId,
                    entity_source: 'interiors',
                    entity_id: interior?.id,
                  }
                ).then(async res => {
                  if (res?.data?.success) await data.afterReply(res?.data?.data?.comment)
                }).catch(err => {
                  toast.error(err?.response?.data?.message)
                })
              }
            }
            onEditAction={
              (data) => {
                instance.put(`/comments/${data?.comment_id}`, { text: data.text, })
                  .then(async res => {
                    if (res?.data?.success) await data?.afterEdit()
                  }).catch(err => {
                    toast.error(err?.response?.data?.message)
                  })
              }
            }
            onDeleteAction={
              (data) => handleDeleteComment(data.comIdToDelete, data.afterDelete)
            }
            currentData={(data: any) => { }}
            removeEmoji={true}
          />
        </Box>
      </Box>
    </Box>
  )
}