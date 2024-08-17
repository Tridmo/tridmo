import { Grid, Box } from '@mui/material';
import SimpleTypography from '../../../typography';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import Buttons from '../../../buttons';
import { useRouter } from 'next/navigation';
import { sampleBrand } from '@/data/samples';
import { selectOneBrand } from '../../../../data/get_one_brand';
import { IMAGES_BASE_URL } from '../../../../utils/env_vars';
import { Instagram, Language, PhoneOutlined, PlaceOutlined, RateReview, WebOutlined } from '@mui/icons-material';
import { chatApi, setChatToken } from '../../../../utils/axios';
import Cookies from 'js-cookie';
import { setSelectedConversation } from '../../../../data/chat';
import { selectChatToken } from '../../../../data/get_chat_token';
import { setLoginState, setOpenModal } from '../../../../data/modal_checker';
import { useState } from 'react';


export default function BrandInfo() {
  const router = useRouter()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const brandBox = {
    padding: "20px",
    background: "#fff",
    borderRadius: "4px",
    border: "1px solid #B3B3B3",
    marginBottom: "28px",
    display: "flex",
  }

  const dispatch = useDispatch<any>();
  const brand = useSelector(selectOneBrand);
  const token = useSelector(selectChatToken)
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const [conversationLoading, setConversationLoading] = useState<boolean>(false);

  function getSocialLink(urls: string[], target: string, connector: string = '/') {
    const has = urls.find(url => target.startsWith(url))
    return target ? (
      !!has
        ? target
        : `${urls[0]}${connector}${target}`
    ) : urls[0]
  }

  function getSocialLinkUsername(urls: string[], target: string) {
    const has = urls.find(url => target.startsWith(url))
    return target ? (
      !!has
        ? target.split(has)[1]
        : target
    ) : ''
  }

  function getUrlDomen(url: string) {
    let domen = url.replace('http://', '').replace('https://', '')
    return domen;
  }

  async function handleCreateConversation() {
    if (isAuthenticated) {
      setConversationLoading(true)
      setChatToken(Cookies.get('chatToken') ? Cookies.get('chatToken') : token ? token : '')
      chatApi.post(`/conversations`, {
        members: [brand?.admin_user_id]
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
      sx={{
        maxWidth: '360px',
        p: '24px',
        border: '1px solid #E0E0E0',
        bgcolor: '#fff',
      }}
    >
      <Image
        width={312}
        height={312}
        priority
        alt=""
        style={{ objectFit: "cover", border: '1px solid #0000004D' }}
        src={`${IMAGES_BASE_URL}/${brand?.image_src}`}
      />

      <SimpleTypography
        text={brand?.name}
        className="brand_page__info--title"
        variant="h1"
        sx={{ m: '24px 0 8px 0' }}
      />

      <SimpleTypography
        text={brand?.description}
        className="brand_page__info--desc"
        sx={{ marginBottom: '24px' }}
      />

      <Grid container spacing={1}
        sx={{
          display: 'flex',
        }}
      >

        <Grid item sx={{ width: '100%' }}>
          <Link style={{ width: '100%' }}
            target="_blank"
            href={`http://maps.google.com/?q=${brand?.address}`}
            rel="noopener noreferrer"
          >
            <Buttons className='brand__box' name="">
              <PlaceOutlined sx={{
                width: '23px',
                height: '23px',
                color: '#424242'
              }} />
              <Box sx={{ marginLeft: "11px" }}>
                <SimpleTypography
                  className='brand__name'
                  text="Локация"
                />
                <SimpleTypography
                  className='brand__box--text'
                  text={brand?.address}
                />
              </Box>
            </Buttons>
          </Link>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Link target='_blank' style={{ width: '100%' }} href={`tel:${brand?.phone}`}>
            <Buttons className='brand__box' name="">
              <PhoneOutlined sx={{
                width: '23px',
                height: '23px',
                color: '#424242'
              }} />
              <Box sx={{ marginLeft: "11px" }}>
                <SimpleTypography className='brand__name' text="Номер телефона" />
                <SimpleTypography className='brand__box--text' text={`${brand?.phone}`} />
              </Box>
            </Buttons>
          </Link>
        </Grid>
        {
          !!brand?.instagram &&
          <Grid item sx={{ width: '100%' }}>
            <Link target='_blank' style={{ width: '100%' }} href={getSocialLink(['https://instagram.com/', 'https://www.instagram.com/'], brand?.instagram)}>
              <Buttons className='brand__box' name="">
                <Instagram sx={{
                  width: '23px',
                  height: '23px',
                  color: '#424242'
                }} />
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography className='brand__name' text="Инстаграм" />
                  <SimpleTypography className='brand__box--text' text={getSocialLinkUsername(['https://instagram.com/', 'https://www.instagram.com/'], brand?.instagram)} />
                </Box>
              </Buttons>
            </Link>
          </Grid>
        }
        {
          !!brand?.site_link &&
          <Grid item sx={{ width: '100%' }}>
            <Link target='_blank' style={{ width: '100%' }} href={brand?.site_link || ''}>
              <Buttons className='brand__box' name="">
                <Language sx={{
                  width: '23px',
                  height: '23px',
                  color: '#424242'
                }} />
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography className='brand__name' text="Веб-сайт" />
                  <SimpleTypography className='brand__box--text' text={getUrlDomen(brand?.site_link || '')} />
                </Box>
              </Buttons>
            </Link>
          </Grid>
        }
        <Grid item sx={{ mt: '24px', width: '100%' }}>
          <Buttons
            startIcon={conversationLoading}
            disabled={!brand?.admin_user_id}
            onClick={() => handleCreateConversation()}
            sx={{ width: '100%' }}
            className='upload__btn'
            name="Написать сообщение"
            childrenFirst={true}
          >
            <RateReview sx={{ mr: '8px' }} />
          </Buttons>
        </Grid>
        {/* <Grid item>
          <a target="_blank"
            href={brand?.site_link}
          >
            <Buttons className='brand__box' name="">
              <Image
                width={19}
                height={23}
                alt="web"
                src={"/icons/web.svg"}
              />
              <Box sx={{ marginLeft: "11px" }}>
                <SimpleTypography className='brand__name' text="Веб-сайт" />
                <SimpleTypography
                  className='brand__box--text'
                  text={brand?.name}
                />
              </Box>
            </Buttons>
          </a>
        </Grid> */}
      </Grid>


    </Grid >
  )
}
