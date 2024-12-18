"use client"

import { Box, SxProps } from '@mui/system';
import { useState, useEffect, CSSProperties, useMemo, useCallback } from 'react';
import { IMAGES_BASE_URL } from '@/utils/env_vars';
import NextImage from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { selectOneInterior } from '@/data/get_one_interior';
import { selectToggleAddingTags, selectToggleShowTags } from '../../../../data/toggle_tags';
import { CheckOutlined, Close } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import { v4 } from 'uuid';
import SimpleTypography from '../../../typography';
import instance from '../../../../utils/axios';
import { toast } from 'react-toastify';
import { selectInteriorTags, setInteriorTags } from '../../../../data/get_interior_tags';
import Link from 'next/link';
import { selectMyProfile } from '../../../../data/me';
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setOpenModal } from '../../../../data/modal_checker';
import InteriorImagesModal from './images_modal';
import ImageViewerModal from './zoom_viewer';
import { setShowInteriorImagesModal } from '@/data/loader';
import SearchInput from '../../../inputs/search';
import Buttons from '../../../buttons';

const imageStyle: CSSProperties = {
  width: '100%',
  height: 'auto',
  verticalAlign: 'top',
  overflowClipMargin: 'content-box',
  overflow: 'clip',
  objectFit: 'contain',
}

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
  const dispatch = useDispatch<any>();
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState);
  const interior = useSelector(selectOneInterior);
  const interiorTags = useSelector(selectInteriorTags);
  const showTags = useSelector(selectToggleShowTags);
  const addingTags = useSelector(selectToggleAddingTags);
  const currentUser = useSelector(selectMyProfile);

  const [images, setImages] = useState<any[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<any>();
  const [newTags, setNewTags] = useState<NewTag[]>([]);
  const [loadingTagId, setLoadingTagId] = useState<string>('');

  useEffect(() => {
    const getImages = async () => {
      if (!interior?.images) return;

      const imagePromises = interior.images.map(async (img) => {
        try {
          const sizes = await getImageSize(img.image_src);
          return { ...img, ...sizes };
        } catch (error) {
          console.log('GET IMAGE ERROR: ', error);
          return null;
        }
      });

      const resolvedImages = await Promise.all(imagePromises);
      setImages(resolvedImages.filter(Boolean));
    };

    getImages();
  }, [interior]);

  useEffect(() => {
    if (!addingTags) {
      setNewTags([]);
    }
  }, [addingTags]);

  const getImageSize = useCallback((src: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = `${IMAGES_BASE_URL}/${src}`;
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = reject;
    });
  }, []);

  const handleClick = useCallback((event: React.MouseEvent, index: number) => {
    const target = event.target as HTMLElement;
    const classList = Array.from(target.classList);
    if (
      classList.includes('image') ||
      classList.includes('image_wrapper__box') ||
      classList.includes('image_parent_wrapper__box')
    ) {
      if (addingTags) {
        const rect = target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setNewTags(prev => [...prev, { id: v4(), x, y, img: images[index]?.id }]);
      } else {
        setSelectedImageIndex(index);
        dispatch(setShowInteriorImagesModal(true, index - 1));
      }
    }
  }, [addingTags, dispatch, images]);

  const handleRemoveNewEmptyTag = useCallback((id: string) => {
    setNewTags(prev => prev.filter(x => x.id !== id));
  }, []);

  const handleInputChange = useCallback((url: string, tagId: string) => {
    if (url && url.includes('/models/')) {
      setNewTags(prev => prev.map(t => t.id === tagId ? { ...t, loading: true } : t));
    }
  }, []);

  const handleGetModel = useCallback((url: string, tagId: string) => {
    if (url && url.includes('/models/')) {
      instance.get(`models/${url.split('/models/')[1]}`)
        .then(res => {
          const model = res?.data?.data?.model;
          setNewTags(prev => prev.map(t => t.id === tagId ? {
            ...t,
            model: {
              ...model,
              cover: model.images ? `${IMAGES_BASE_URL}/${model?.cover}` : '',
              brand: model.brand.name
            },
            loading: false
          } : t));
        })
        .catch(err => {
          if (err?.response?.data?.error?.status === 404) {
            setNewTags(prev => prev.map(t => t.id === tagId ? {
              ...t,
              loading: false,
              not_found: true,
              model: undefined
            } : t));
          } else {
            toast.error(err?.response?.data?.message);
          }
        });
    }
  }, []);

  const handleTagCreate = useCallback((tagId: string) => {
    const tag = newTags.find(t => t.id === tagId);
    if (tag && tag.model) {
      setLoadingTagId(tag.id);
      instance.post('tags', {
        model_id: tag.model.id,
        interior_id: interior?.id,
        interior_image_id: tag.img,
        x: tag.x,
        y: tag.y,
      }).then(res => {
        dispatch(setInteriorTags([...interiorTags, res?.data?.data?.tag]));
        setNewTags(prev => prev.filter(t => t.id !== tagId));
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setLoadingTagId('');
      });
    }
  }, [newTags, interior, interiorTags, dispatch]);

  const handleDeleteTag = useCallback((tagId: string) => {
    const tag = interiorTags.find(t => t.id === tagId);
    if (tag) {
      const modalContent: ConfirmContextProps = {
        message: `Вы уверены, что хотите удалить бирка «${tag?.model?.name}»?`,
        actions: {
          on_click: {
            args: [interior?.id],
            func: async (checked: boolean, id: number) => {
              dispatch(setConfirmProps({ is_loading: true }));
              try {
                const res = await instance.delete(`tags/${tag?.id}`);
                if (res?.data?.success) {
                  toast.success(res?.data?.message);
                  dispatch(setConfirmState(false));
                  dispatch(setOpenModal(false));
                  dispatch(resetConfirmProps());
                  dispatch(resetConfirmData());
                  dispatch(setInteriorTags(interiorTags.filter(t => t.id !== tagId)));
                }
              } catch (err: any) {
                console.log(err);
                toast.error(err?.response?.data?.message);
              } finally {
                dispatch(setConfirmProps({ is_loading: false }));
              }
            }
          }
        }
      };
      dispatch(resetConfirmProps());
      dispatch(setConfirmProps(modalContent));
      dispatch(setConfirmState(true));
      dispatch(setOpenModal(true));
    }
  }, [interiorTags, interior, dispatch]);

  function handleTagMouseEnter(event, tag) {
    const elem = event.currentTarget.querySelector('.tag_inner_content')!;
    const index = event.currentTarget.querySelector(`.ind${tag.id}`)!;
    index['style']['display'] = 'none';
    elem['style']['display'] = 'flex';
    const showTag = setTimeout(() => {
      elem['style']['opacity'] = 1;
      clearTimeout('showTag')
    }, 300)
  }
  function handleTagMouseLeave(event, tag) {
    const elem = event.currentTarget.querySelector('.tag_inner_content')!;
    const index = event.currentTarget.querySelector(`.ind${tag.id}`)!;
    elem['style']['display'] = 'none';
    elem['style']['opacity'] = 0;
    const showIndex = setTimeout(() => {
      index['style']['display'] = 'inline-block';
      clearTimeout('showIndex')
    }, 300)
  }

  const renderTag = useCallback((tag: any, index: number, isNewTag: boolean) => {
    return (
      <Box
        key={tag.id}
        className="add_tag_wrapper__box"
        onMouseEnter={isNewTag ? undefined : (e) => handleTagMouseEnter(e, tag)}
        onMouseLeave={isNewTag ? undefined : (e) => handleTagMouseLeave(e, tag)}
        sx={{
          ...tagStyle,
          opacity: isNewTag ? 1 : 0.7,
          padding: isNewTag ? '7px' : '7px 14px',
          top: tag.y - (isNewTag ? (tag.model || tag.not_found || tag.loading ? 113 : 56) : 46),
          left: tag.x - (isNewTag ? 0 : 0),
          minHeight: isNewTag ? `${tag.model || tag.not_found || tag.loading ? 113 : 56}px` : '46px',
          width: isNewTag ? '345px' : '46px',
          height: isNewTag ? 'auto' : '46px',
          borderRadius: isNewTag ? '32px 32px 32px 0' : '23px',
          borderBottomLeftRadius: isNewTag ? '0' : '0',
          transition: 'all 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': isNewTag ? {} : {
            opacity: 1,
            width: isAuthenticated && interior?.author?.id == currentUser?.user_id ? '320px' : '250px',
            height: '94px',
            top: tag.y - 94,
            left: tag.x - 0,
            minHeight: '94px',
            borderRadius: '32px 32px 32px 0',
          }
        }}
      >
        {isNewTag ? (
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <SearchInput
                className="add_tag__input"
                placeHolder="https://demod.uz/models/..."
                search={(val) => handleGetModel(val, tag.id)}
                searchDelay={500}
                onChange={(val) => handleInputChange(val, tag.id)}
                sx={{ borderTopLeftRadius: '20px' }}
              />
              {(tag.model || tag.not_found || tag.loading) && (
                <Box sx={{ width: '100%', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: tag.loading ? 'center' : 'flex-start', mt: '7px' }}>
                  {tag.loading ? (
                    <CircularProgress size="1rem" />
                  ) : (
                    <>
                      <NextImage
                        alt="cover"
                        src={tag.model ? tag.model.cover : tag.not_found ? '/img/empty-box.svg' : ''}
                        width={50}
                        height={50}
                      />
                      <SimpleTypography
                        sx={{ ml: '7px' }}
                        text={tag.model ? tag.model.name : tag.not_found ? 'Модель не найдена' : ''}
                      />
                    </>
                  )}
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', ml: '7px' }}>
              <IconButton className="icon_button add_tag__button" onClick={() => handleRemoveNewEmptyTag(tag.id)}>
                <Close />
              </IconButton>
              {tag.model && (
                <Buttons
                  className="icon_button add_tag__button"
                  disabled={!Boolean(tag.model) || loadingTagId == tag.id}
                  onClick={() => handleTagCreate(tag.id)}
                  startIcon={loadingTagId == tag.id}
                >
                  <CheckOutlined />
                </Buttons>
              )}
            </Box>
          </Box>
        ) : (
          <>
            <Box
              className="tag_inner_content"
              sx={{
                textDecoration: "none",
                display: "none",
                width: '100%',
                alignItems: "center",
                justifyContent: 'space-between',
                opacity: 0,
                transition: 'all 0.4s ease',
                bgcolor: '#fff',
                zIndex: '300',
              }}
            >
              <Link
                href={`/models/${tag?.model?.slug}`}
                target="_blank"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                }}
              >
                <NextImage
                  src={`${IMAGES_BASE_URL}/${tag?.model?.cover[0]?.image_src}`}
                  alt="icon"
                  width={80}
                  height={80}
                />
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  marginLeft: '10px',
                  maxWidth: '130px',
                }}>
                  <SimpleTypography sx={{ width: '100% !important', marginLeft: '0px !important' }} className="card__title drow-down__text" text={tag?.model?.name} />
                  <SimpleTypography sx={{ width: '100% !important', marginLeft: '0px !important' }} className="card__title drow-down__text" text={`${tag?.model?.brand?.name}`} />
                </Box>
              </Link>
              {isAuthenticated && interior?.author?.id == currentUser?.user_id && (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: '10px',
                  borderLeft: '1.6px solid #E0E0E0'
                }}>
                  <Buttons
                    className="delete__tag"
                    onClick={(e) => handleDeleteTag(tag.id)}
                    disabled={loadingTagId == tag.id}
                    startIcon={loadingTagId == tag.id}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.66634 4.33398H12.333V13.0007C12.333 13.1775 12.2628 13.347 12.1377 13.4721C12.0127 13.5971 11.8432 13.6673 11.6663 13.6673H2.33301C2.1562 13.6673 1.98663 13.5971 1.8616 13.4721C1.73658 13.347 1.66634 13.1775 1.66634 13.0007V4.33398ZM2.99967 5.66732V12.334H10.9997V5.66732H2.99967ZM4.99967 7.00065H6.33301V11.0007H4.99967V7.00065ZM7.66634 7.00065H8.99967V11.0007H7.66634V7.00065ZM3.66634 2.33398V1.00065C3.66634 0.82384 3.73658 0.654271 3.8616 0.529246C3.98663 0.404222 4.1562 0.333984 4.33301 0.333984H9.66634C9.84315 0.333984 10.0127 0.404222 10.1377 0.529246C10.2628 0.654271 10.333 0.82384 10.333 1.00065V2.33398H13.6663V3.66732H0.333008V2.33398H3.66634ZM4.99967 1.66732V2.33398H8.99967V1.66732H4.99967Z" fill="#686868" />
                    </svg>
                  </Buttons>
                </Box>
              )}
            </Box>
            <SimpleTypography sx={{ position: 'absolute' }} classNames={`ind${tag.id}`} text={String(index + 1)} />
          </>
        )}
      </Box>
    );
  }, [handleRemoveNewEmptyTag, handleTagCreate, handleDeleteTag, isAuthenticated, interior, currentUser, loadingTagId, handleGetModel, handleInputChange, handleTagMouseEnter, handleTagMouseLeave]);

  const memoizedImages = useMemo(() => images.filter(img => !img?.is_main).map((img, index) => (
    <Box key={img.id || index} className="image_parent_wrapper__box" sx={{ marginBottom: '20px', cursor: 'pointer' }}>
      <Box
        className="image_wrapper__box"
        onClick={(e) => handleClick(e, index)}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.4s ease',
        }}
      >
        {newTags.filter(t => t.img === img.id).map(t => renderTag(t, index, true))}
        {showTags && interiorTags.filter(t => t.interior_image_id === img.id).map((t, i) => renderTag(t, i, false))}
        <NextImage
          className="image"
          unoptimized
          src={`${IMAGES_BASE_URL}/${img?.image_src}`}
          alt=""
          width={0}
          height={0}
          style={imageStyle}
        />
      </Box>
    </Box>
  )), [images, newTags, showTags, interiorTags, handleClick, renderTag]);

  return (
    <>
      <InteriorImagesModal mainImageWidth={800} images={images} selectedSlide={selectedImageIndex} />
      <ImageViewerModal />
      {memoizedImages}
    </>
  );
}