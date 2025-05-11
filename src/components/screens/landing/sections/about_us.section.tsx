import { Grid } from "@mui/material";
import SimpleTypography from "../../../typography";
import Link from "next/link";
import Buttons from "../../../buttons";
import { ArrowOutward } from "@mui/icons-material";
import Image from "next/image";

const textSx = {
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '26px',
  letterSpacing: '-0.01em',
}

const titleSx = {
  fontWeight: 500,
  fontSize: '22px',
  lineHeight: '26px',
  letterSpacing: '-0.02em',
}

const contentContinerSx = {
  display: 'flex',
  flexDirection: 'column',
  p: {
    lg: '32px 48px'
  },
  gap: '16px',
  backgroundColor: '#fff',
  border: '1px solid #E0E0E0',
}

export function AboutUsSection() {
  return (
    <Grid
      container
    >
      <Grid
        item
        lg={5}
      >
        <Image
          unoptimized
          src={'/img/about-us-cover.png'}
          alt=""
          width={0}
          height={0}
          style={{ width: '100%', height: '100%' }}
        />
      </Grid>

      <Grid
        item
        lg={7}
        sx={contentContinerSx}
      >
        <SimpleTypography text="О нас" variant={'h2'} sx={titleSx} />
        <SimpleTypography
          sx={textSx}
          text="Designs are available in various formats, including OBJ and MAX, and are suitable for use in various software applications. Tridmo worries about security of its users, so by downloading 3D models from our platform you can be sure that you purchased licensed and secured files." variant={'p'} />
        <SimpleTypography
          sx={textSx}
          text="Tridmo's licensing system is designed to be flexible and accommodating to different user needs. Licenses can be purchased for personal or commercial use, with different pricing tiers depending on the intended use." variant={'p'} />
        <Link href={'/about-us'}>
          <Buttons
            name="Узнать больше"
            className="login__btn"
          >
            <ArrowOutward sx={{ ml: '8px' }} />
          </Buttons>
        </Link>
      </Grid>
    </Grid>
  )
}