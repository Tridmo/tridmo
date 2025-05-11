import { Box, Grid } from "@mui/material";
import SimpleTypography from "../../../typography";
import Buttons from "../../../buttons";
import { ArrowOutward } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { getLanguageByDomain, translations } from "@/utils/language";
import { useEffect, useState } from "react";

export function DiziproSection() {
  const [lang, setLang] = useState('ru');

  useEffect(() => {
    setLang(getLanguageByDomain());
  }, []);

  return (
    <Grid
      container
      width={'100%'}
    >
      <Grid
        item
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        sx={{
          width: '100%',
          paddingX: '20px',
          gap: '10px',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 0,
          borderStyle: 'solid',
          borderColor: '#E0E0E0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#FAFAFA',
        }}
      >
        <Image
          unoptimized
          src={'/img/build-model-process.png'}
          alt=""
          width={0}
          height={0}
          style={{ width: '90%', height: '100%' }}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        sx={{
          padding: '32px 48px',
          gap: '20px',
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 0,
          borderStyle: 'solid',
          borderColor: '#E0E0E0',
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <SimpleTypography text={translations[lang].title} variant={'h2'}
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
          text={translations[lang].description} variant={'p'} />
        <Link href={'https://dizipro.org'}>
          <Buttons
            name={translations[lang].button}
            className="login__btn"
            sx={{
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            <ArrowOutward sx={{ ml: '8px' }} />
          </Buttons>
        </Link>
      </Grid>
    </Grid>
  )
}