"use client"

import { Box, Modal, styled, ListItem, Fade } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SimpleSlider from '../slider';
import { setShowInteriorImagesModal } from '@/data/loader';
import Buttons from '../../../buttons';
import Image from 'next/image';
import { Close } from '@mui/icons-material';

export default function InteriorImagesModal({ mainImageWidth, selectedSlide, images }: { images: any[], mainImageWidth: number; selectedSlide?: number }) {
  const dispatch = useDispatch<any>()
  const show = useSelector((state: any) => state?.loader?.show_interior_images_modal)

  function handleCloseModal() {
    dispatch(setShowInteriorImagesModal(false))
  }

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100dvh',
    outline: "none",
    overflow: "hidden",
  }

  return (
    <Modal
      open={show}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition
      sx={{
        width: '100vw',
        height: '100dvh',
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
      }}
    >
      <Box sx={style}>
        <Buttons
          onClick={handleCloseModal}
          type="button"
          className="slider_close__button"
          name=""
        >
          <Close sx={{ color: '#424242' }} />
        </Buttons>
        <SimpleSlider mainWidth={mainImageWidth} images={images} />
      </Box>
    </Modal>
  )
}