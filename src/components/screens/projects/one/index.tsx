"use client"

import React, { use, useContext, useMemo, useState } from 'react'
import { Avatar, Box, Button, Divider, Grid, ListItemAvatar, Menu, MenuItem, Paper, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SimpleTypography from '../../../typography';
import Buttons from '@/components/buttons';
import Image from 'next/image';
import { ThemeProps } from '@/types/theme';
import { selectMyProfile } from '../../../../data/me';
import Link from 'next/link';
import EmptyData from '../../../views/empty_data';
import instance from '../../../../utils/axios';
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setEditingProject, setEditingProjectState, setLoginState, setOpenModal } from '../../../../data/modal_checker';
import { toast } from 'react-toastify';
import { selectOneProject } from '../../../../data/get_one_project';
import { getMyProjects } from '../../../../data/get_my_projects';
import { ProjectInfo } from '../../../views/projects/info';
import { ProjectModelsList } from '../../../views/projects/models_list';

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

export default function OneProject() {

  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const dispatch = useDispatch<any>()

  const currentUser = useSelector(selectMyProfile);
  const project = useSelector(selectOneProject);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function openEditProject(project) {
    dispatch(setEditingProject(project))
    dispatch(setEditingProjectState(true))
    dispatch(setOpenModal(true))
  }

  function handleClickDelete() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите удалить проект «${project?.name}»?`,
      actions: {
        on_click: {
          args: [project?.id],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }))
            instance.delete(`projects/${id}/?cascade=${!checked}`)
              .then(res => {
                if (res?.data?.success) {
                  toast.success(res?.data?.message)
                  dispatch(setConfirmState(false))
                  dispatch(setOpenModal(false))
                  dispatch(resetConfirmProps())
                  dispatch(resetConfirmData())
                  dispatch(resetConfirmData())
                  dispatch(getMyProjects())
                }
                else {
                  toast.success(res?.data?.message)
                }
              }).catch(err => {
                toast.error(err?.response?.data?.message)
              }).finally(() => {
                dispatch(setConfirmProps({ is_loading: false }))
                handleClose();
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
            justifyContent: 'flex-start'
          }}
        >
          <ActionsDropDown
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            <MenuItem
              onClick={() => openEditProject(project)}
              sx={{ padding: "6px 12px" }}
            >
              <Image
                src="/icons/edit-pen.svg"
                alt="icon"
                width={17}
                height={17}
              />
              <SimpleTypography className='drow-down__text' text='Редактировать' />
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

            <Box sx={{}}>
              <SimpleTypography
                text={project?.name}
                sx={{
                  fontSize: '22px',
                  fontWeight: 400,
                  lineHeight: '26px',
                  letterSpacing: '-0.02em',
                  textAlign: 'start',
                  color: '#141414'
                }}
              />
            </Box>
          </Grid>

          <Grid item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            <Box margin={'0 0 0 16px'}>
              <Buttons
                className='bookmark__btn'
                onClick={handleClick}
                sx={{
                  p: '8px !important',
                  width: '40px',
                  height: '40px'
                }}
              >
                <Image
                  style={{ margin: '0' }}
                  alt='icon'
                  width={24}
                  height={24}
                  src={'/icons/horizontal-dots.svg'}
                />
              </Buttons>
            </Box>
          </Grid>
        </Grid>

        <Grid container
          sx={{
            margin: '32px 0 24px 0',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between'
          }}
        >
          <Grid item
            lg={8.3}
            md={8.3}
            xs={8.3}
            sm={12}
          >
            <ProjectModelsList project={project} />
          </Grid>
          <Grid item
            lg={3.5}
            md={3.5}
            xs={3.5}
            sm={12}
          >
            <ProjectInfo project={project} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}