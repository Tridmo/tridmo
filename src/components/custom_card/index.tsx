import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, styled, Paper, Avatar, MenuItem, Menu } from '@mui/material';
import Image from 'next/image';
import SimpleTypography from '../typography';
import Link from 'next/link';
import { ThemeProps } from '../../types/theme';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGES_BASE_URL } from '../../utils/image_src';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ConfirmContextProps, resetConfirmData, resetConfirmProps, setConfirmProps, setConfirmState, setOpenModal } from '../../data/modal_checker';
import { getCategories } from '../../data/categories';
import { toast } from 'react-toastify';
import instance from '../../utils/axios';

type InputProps = {
  item?: object,
};

const CustomBoxWrapper = styled(Box)(
  ({ theme }) =>
    `
      img {
        margin: 0;
        padding: 12px;
        margin-bottom: 4px;
        objec-fit:cover;
      }
    `
);
type CustomCardProps = {
  type?: any,
  model?: any,
  link?: any,
  imgHeight?: any,
  tagText?: string,
  tagIcon?: string,
  withAuthor?: boolean,
  settingsBtn?: boolean,
  useButton?: boolean,
}
const Label = styled(Paper)(({ theme }: ThemeProps) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

const DropDown = styled(Menu)(
  ({ theme }: ThemeProps) => `

  .MuiList-root{
    width:162px;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    padding: 4px 0;
    // margin:10px 12px;
    
  }

  .MuiPaper-root{
    border-radius:0 !important;
    // box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.18);
    box-shadow: 0px 8px 18px 0px #00000029;
  }
  `
);

function CustomCard({ model, link, imgHeight, tagIcon, tagText, withAuthor, settingsBtn, useButton = false }: CustomCardProps) {

  const dispatch = useDispatch<any>()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedInterior, setSelectedInterior] = React.useState<any>(null);
  const open = Boolean(anchorEl);


  const handleClick = (event: any, interior) => {
    setAnchorEl(event.currentTarget);
    setSelectedInterior(interior)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleBoxClick(e, link) {
    const classes = [...e.target!['classList']]
    if (!classes.includes('settings')) {
      router.push(link)
    }
  }

  function handleClickDelete() {
    const modalContent: ConfirmContextProps = {
      message: `Вы уверены, что хотите удалить интерьер «${selectedInterior?.name}»?`,
      actions: {
        on_click: {
          args: [selectedInterior?.id],
          func: async (checked: boolean, id: number) => {
            dispatch(setConfirmProps({ is_loading: true }))
            instance.delete(`categories/${id}/?cascade=${!checked}`)
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
    <>
      <DropDown
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <MenuItem
          onClick={handleClose}
          sx={{ padding: "6px 12px" }}
        >
          <Link
            href={`/interiors/edit/${selectedInterior?.slug}`}
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

      </DropDown>

      {
        useButton ?
          <Box key={model?.id} onClick={(e) => handleBoxClick(e, link)} style={{ margin: '0 0 15px 0', textDecoration: "none" }}>
            <Box sx={{
              height: "auto",
              width: "100%",
              border: " 1px solid #e0e0e0",
              background: "#fff",
              position: "relative",
              cursor: "pointer",
              transition: "all 0.4s ease",
              padding: "12px 12px 0 12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",

              '&:hover > .settings': {
                opacity: 1
              }
            }}>
              {
                tagText ?
                  <SimpleTypography text={tagText || ""} className='card__sale' />
                  : tagIcon ?
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '24px',
                        height: '24px',
                        top: '5px',
                        right: '5px',
                        color: '#fff',
                        backgroundColor: '#7210be',
                        border: '1.5px solid #fff',
                        borderRadius: '3px',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        src={tagIcon}
                        alt='icon'
                        width={14}
                        height={14}
                      />
                    </Box>
                    : !!settingsBtn ?
                      <Box
                        className='settings'
                        sx={{
                          transition: 'all 0.4s ease',
                          opacity: !!open ? 1 : 0,
                          position: 'absolute',
                          p: '6px 8px',
                          backdropFilter: 'blur(2px)',
                          top: '5px',
                          right: '5px',
                          color: '#fff',
                          backgroundColor: '#00000066',
                          border: '1px solid #0000001A',
                          borderRadius: '32px',
                          zIndex: 10,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',

                          '&:hover > .settings_icon': {
                            transform: "rotateZ(60deg)", transitionDuration: "500ms"
                          }
                        }}
                        onClick={(e) => handleClick(e, model)}
                      >
                        <Image
                          className='settings settings_icon'
                          src={'/icons/settings-icon.svg'}
                          alt='icon'
                          width={20}
                          height={20}
                        />
                        <ArrowDropDownIcon
                          className='settings'
                          sx={
                            {
                              minWidth: "11px", minHeight: "7px", color: "#fff",
                              ...(!!open ? { transform: "rotateZ(180deg)", transitionDuration: "1000ms" } : {})
                            }
                          }
                        />
                      </Box>
                      : null
              }
              <LazyLoadImage
                src={model.cover ? (model?.cover[0]?.image_src ? `${IMAGES_BASE_URL}/${model?.cover[0]?.image_src}` : '') : ''}
                alt="Model"
                effect="blur"
                width={"100%"}
                placeholderSrc={"/img/card-loader.jpg"}
                height={imgHeight || `208px`}
                delayTime={500}
                style={{ objectFit: "cover" }}
              />
              <Label
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: 'center',
                  justifyContent: "space-between",
                  padding: "13px 0"
                }}
              >
                {
                  withAuthor
                    ? <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Image
                        src={model?.author?.image_src ? `${IMAGES_BASE_URL}/${model?.author?.image_src}` : '/img/avatar.png'}
                        alt='avatar'
                        width={28}
                        height={28}
                        style={{
                          borderRadius: '50%'
                        }}
                      />
                      <SimpleTypography
                        sx={{ marginLeft: '8px', display: 'flex', alignItems: 'center', textAlign: 'left' }}
                        text={model?.author?.company_name}
                        className='card__title'
                      />
                    </Box>
                    :
                    <SimpleTypography
                      text={model?.name}
                      className='card__title'
                    />
                }
                {
                  model?.brand && model?.brand?.name
                    ? <SimpleTypography
                      text={`${model?.brand?.name}`}
                      className='card__title-brand'
                    />
                    : null
                }
              </Label>
            </Box>
          </Box>

          :

          <Link key={model?.id} href={link ? link : ""} style={{ margin: '0 0 15px 0', textDecoration: "none" }}>
            <Box sx={{
              height: "auto",
              width: "100%",
              border: " 1px solid #e0e0e0",
              background: "#fff",
              position: "relative",
              cursor: "pointer",
              transition: "all 0.4s ease",
              padding: "12px 12px 0 12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              {
                tagText ?
                  <SimpleTypography text={tagText || ""} className='card__sale' />
                  : tagIcon ?
                    <Box
                      sx={{
                        position: 'absolute',
                        width: '24px',
                        height: '24px',
                        top: '5px',
                        right: '5px',
                        color: '#fff',
                        backgroundColor: '#7210be',
                        border: '1.5px solid #fff',
                        borderRadius: '3px',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        src={tagIcon}
                        alt='icon'
                        width={14}
                        height={14}
                      />
                    </Box>
                    : null
              }
              <LazyLoadImage
                src={model.cover ? (model?.cover[0]?.image_src ? `${IMAGES_BASE_URL}/${model?.cover[0]?.image_src}` : '') : ''}
                alt="Model"
                effect="blur"
                width={"100%"}
                placeholderSrc={"/img/card-loader.jpg"}
                height={imgHeight || `208px`}
                delayTime={500}
                style={{ objectFit: "cover" }}
              />
              <Label
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: 'center',
                  justifyContent: "space-between",
                  padding: "13px 0"
                }}
              >
                {
                  withAuthor
                    ? <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Image
                        src={model?.author?.image_src ? `${IMAGES_BASE_URL}/${model?.author?.image_src}` : '/img/avatar.png'}
                        alt='avatar'
                        width={28}
                        height={28}
                        style={{
                          borderRadius: '50%'
                        }}
                      />
                      <SimpleTypography
                        sx={{ marginLeft: '8px', display: 'flex', alignItems: 'center', textAlign: 'left' }}
                        text={model?.author?.company_name}
                        className='card__title'
                      />
                    </Box>
                    :
                    <SimpleTypography
                      text={model?.name}
                      className='card__title'
                    />
                }
                {
                  model?.brand && model?.brand?.name
                    ? <SimpleTypography
                      text={`${model?.brand?.name}`}
                      className='card__title-brand'
                    />
                    : null
                }
              </Label>
            </Box>
          </Link>
      }

    </>
  )
}



export default CustomCard