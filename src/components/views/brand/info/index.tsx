import { Grid, Box } from '@mui/material';
import SimpleTypography from '../../../typography';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import Buttons from '../../../buttons';
import { useRouter } from 'next/navigation';
import { sampleBrand } from '@/data/samples';
import { selectOneBrand } from '../../../../data/get_one_brand';
import { IMAGES_BASE_URL } from '../../../../utils/image_src';


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
        alt="Brand image"
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
              <Image
                width={19}
                height={23}
                alt="Location"
                src={"/icons/location.svg"}
              />
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
          <Link style={{ width: '100%' }} href={`tel:${brand?.phone}`}>
            <Buttons className='brand__box' name="">
              <Image
                width={19}
                height={23}
                alt="Phone number"
                src={"/icons/phone.svg"}
              />
              <Box sx={{ marginLeft: "11px" }}>
                <SimpleTypography className='brand__name' text="Номер телефона" />
                <SimpleTypography className='brand__box--text' text={`${brand?.phone}`} />
              </Box>
            </Buttons>
          </Link>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Link style={{ width: '100%' }} href={`mailto:${brand?.email}`}>
            <Buttons className='brand__box' name="">
              <Image
                width={19}
                height={23}
                alt="Email"
                src={"/icons/mail.svg"}
              />
              <Box sx={{ marginLeft: "11px" }}>
                <SimpleTypography className='brand__name' text="Электрон Почта" />
                <SimpleTypography className='brand__box--text' text={`${brand?.email}`} />
              </Box>
            </Buttons>
          </Link>
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
