import { Box, Modal, styled, ListItem } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';;
import SimpleSlider from '../slider';
import { setShowModelsModal } from '../../../../data/loader'
import SimpleSliderModal from './model_images_modal';
import Buttons from '../../../buttons';
import { Close } from '@mui/icons-material';

export default function ModelModal() {
  const dispatch = useDispatch<any>()
  const show = useSelector((state: any) => state?.loader?.show_models_modal)

  function handleCloseModal() {
    dispatch(setShowModelsModal(false))
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: "90vw",
    maxWidth: "90vw",
    outline: "none",
    overflow: "hidden"
  }

  return (
    <Modal
      open={show}
      onClose={() => { dispatch(setShowModelsModal(false)) }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        width: '100vw',
        height: '100dvh',
        bgcolor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
      }}
    >
      <>
        <Buttons
          onClick={handleCloseModal}
          type="button"
          className="slider_close__button"
          name=""
        >
          <Close sx={{ color: '#424242' }} />
        </Buttons>
        <Box sx={style}>
          <SimpleSliderModal />
        </Box>
      </>
    </Modal>
  )
}