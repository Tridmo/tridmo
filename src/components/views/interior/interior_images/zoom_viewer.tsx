"use client"

import { Box, Modal, styled, ListItem, Fade } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SimpleSlider from '../slider';
import { setShowInteriorImagesModal, setShowImageViewer } from '@/data/loader';
import Buttons from '../../../buttons';
import Image from 'next/image';
import { Close } from '@mui/icons-material';
import { IMAGES_BASE_URL } from '../../../../utils/env_vars';

const SimpleImage = styled(Image)(
  ({ theme }) => `
          cursor: zoom-out;
          position: relative !important;
          inset: 0px;
          box-sizing: border-box;
          padding: 0px;
          border: none;
          margin: auto;
          display: block;
          width: 100% !important;
          height: auto !important; 
          min-width: 100%;
          max-width: 100%;
          object-fit: cover;
  `
)

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

export default function ImageViewerModal({ mainImageWidth, selectedSlide }: { image?: any, mainImageWidth?: number; selectedSlide?: number }) {
  const dispatch = useDispatch<any>()
  const show = useSelector((state: any) => state?.loader?.show_image_viewer)
  const image = useSelector((state: any) => state?.loader?.selected_interior_image)

  function handleCloseModal() {
    dispatch(setShowImageViewer(false))
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
        <Box
          sx={{
            width: '90%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
          }}
        >
          <SimpleImage
            alt=''
            onClick={handleCloseModal}
            fill
            sx={{ objectFit: 'contain' }}
            src={`${IMAGES_BASE_URL}/${image?.image_src}`}
            priority={true}
          />
        </Box>
      </Box>
    </Modal>
  )
}