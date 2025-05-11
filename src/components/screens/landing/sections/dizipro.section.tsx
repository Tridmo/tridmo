import { Box } from "@mui/material";
import SimpleTypography from "../../../typography";
import Buttons from "../../../buttons";
import { ArrowOutward } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

const Bee = () => (
  <Box
    sx={{
      width: '244px',
    }}
  >
    <Image
      unoptimized
      src={'/img/bee.png'}
      alt=""
      width={0}
      height={0}
      style={{ width: '100%', height: '100%' }}
    />
  </Box>
)

export function DiziproSection() {
  return (
    <Box
      width={'100%'}
      display={'flex'}
      justifyContent={'flex-end'}
      position={'relative'}
    >

      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        <Bee />
      </Box>
      <Box display={'flex'} flexDirection={'column'}
        sx={{
          width: {
            xs: '100%',
            sm: '90%',
          },
          p: {
            xs: '16px',
            sm: '32px 50px 32px 200px',
            md: '32px 100px 32px 200px',
          },
          gap: '16px',
          backgroundColor: '#fff',
          border: '1px solid #E0E0E0',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'flex-start'
          }}
        >
          <Bee />
        </Box>
        <SimpleTypography text="Dizipro.org" variant={'h2'}
          sx={{
            fontWeight: 500,
            fontSize: '22px',
            lineHeight: '26px',
            letterSpacing: '-0.02em',
          }}
        />
        <SimpleTypography
          sx={{
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '26px',
            letterSpacing: '-0.01em',
          }}
          text="Designs are available in various formats, including OBJ and MAX, and are suitable for use in various software applications. Tridmo worries about security of its users, so by downloading 3D models from our platform you can be sure that you purchased licensed and secured files." variant={'p'} />
        <Link href={'https://dizipro.org'}>
          <Buttons
            name="Dizipro.org"
            className="login__btn"
            sx={{
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            <ArrowOutward sx={{ ml: '8px' }} />
          </Buttons>
        </Link>
      </Box>
    </Box>
  )
}