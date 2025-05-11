import { Box, Typography, Avatar, Card, CardContent, SxProps, Skeleton } from '@mui/material';
import SimpleTypography from '../typography';
import Image from 'next/image';
import { CSSProperties } from 'react';
import Link from 'next/link';

// Props
type Item = {
  name: string;
  logo: string;
  link: string;
};

type Props = {
  title: string;
  items: Item[];
  showNames?: boolean;
  speed?: number;
  cardStyle?: SxProps;
  logoStyle?: CSSProperties;
};

export default function LinearCarousel({ title, items, showNames = true, speed = 30, cardStyle = {}, logoStyle = {} }: Props) {
  const doubledItems = items && items.length ? [...items, ...items] : new Array(20).fill(1); // For smooth infinite scroll

  return (
    <Box
      sx={{
        width: '100%',
        p: '20px',
        border: '1px solid #F5F5F5',
        borderRadius: '4px',
        background: '#FFFFFF',
        boxShadow: '0px 2px 8px 0px #0000000D',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <SimpleTypography
        text={title}
        className="landing_section_name"
        variant={{ xs: "h6", md: "h2" }}
        sx={{ fontSize: { xs: "1.1rem !important", md: "1.4rem !important" } }}
      />

      <Box sx={{ mt: '8px', position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Right Fade */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: '-2%',
            width: '30px',
            height: '100%',
            zIndex: 2,
            background: 'linear-gradient(270deg, #FFFFFF 10%, rgba(255, 255, 255, 0) 100%)',
          }}
        />

        {/* Left Fade */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '-2%',
            width: '30px',
            height: '100%',
            zIndex: 2,
            background: 'linear-gradient(90deg, #FFFFFF 10%, rgba(255, 255, 255, 0) 100%)',
          }}
        />

        {/* Carousel */}
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            animation: `scroll ${speed}s linear infinite`,
            width: 'max-content',
            '@keyframes scroll': {
              from: { transform: 'translateX(0)' },
              to: { transform: 'translateX(-50%)' },
            },
          }}
        >
          {doubledItems.map((item, index) => (
            <Link href={item.link || ''}>
              <Card
                key={index}
                sx={{
                width: 148,
                p: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: '1px solid #F5F5F5',
                boxShadow: 'none',
                flexShrink: 0,
                ...cardStyle,
              }}
            >
              {
                item === 1 ?
                  <Skeleton
                    width={'100%'}
                    height={'100%'}
                    variant='rectangular'
                    sx={{ borderRadius: cardStyle?.['borderRadius'] || '12px' }}
                  />
                  :
                  <>
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={logoStyle?.width as number || 148}
                      height={logoStyle?.height as number || 148}
                      style={{ borderRadius: '80px', ...logoStyle }}
                    />
                    {
                      showNames &&
                      <CardContent sx={{ width: '100%', p: '0 !important', textAlign: 'center' }}>
                        <SimpleTypography text={item.name} className='ellipsis__text'
                          sx={{
                            width: '100%',
                            fontSize: '13px',
                            fontWeight: 400,
                            lineHeight: '18px',
                            verticalAlign: 'middle',
                            p: '0 !important'
                          }}
                        />
                      </CardContent>
                    }
                  </>
              }
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
} 
