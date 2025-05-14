import { ContainerStyle as DefaultContainerStyle } from '@/styles/styles';
import { Box } from '@mui/material';
import Timeline from './sections/timeline';
import SimpleTypography from '@/components/typography';

const ContainerStyle = {
    ...DefaultContainerStyle,
    width: { lg: "992px", md: '100%', sm: '100%', xs: "96%" },
    minHeight: 'auto',
    marginBottom: '56px'
}

const TextStyle = {
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '30px',
    letterSpacing: '-2%',
}

const Separator = () => <Box sx={{
    width: '100%',
    margin: '20px 0'
}} />

export default function AboutUs() {
    return (

        <>
            <Box sx={{ ...ContainerStyle, marginBottom: '32px', marginTop: '32px' }}>
                <SimpleTypography text='О нас'
                    sx={{
                        fontWeight: 600,
                        fontSize: '38px',
                        lineHeight: '46px',
                        letterSpacing: '-4%',
                    }}
                />
            </Box>



            <Box sx={ContainerStyle}>
                <SimpleTypography text='Tridmo: Get interior design with 3D models in one click!
                '
                    sx={TextStyle}
                />

                <Separator />

                <SimpleTypography text='Tridmo - это платформа, которая предоставляет наш лицензированный запас 3D-моделей и интерьеров. Она предназначена для создания онлайн-рынка для профессионалов и любителей, которые хотят использовать 3D-модели и интерьеры в своих работах.'
                    sx={TextStyle}
                />

                <Separator />

                <SimpleTypography text='- 2015 год основания'
                    sx={TextStyle}
                />  

                <SimpleTypography text='- 30+ сотрудников'
                    sx={TextStyle}
                />  

                <SimpleTypography text='- 2015 год основания
                    - 30+ сотрудников
                    - 2-5 лет опыта'
                    sx={TextStyle}
                />  
            </Box>

            <Box sx={{...ContainerStyle, display: {
                xs: 'none',
                sm: 'block'
            }}}>
                <SimpleTypography text='Наша история'
                    sx={{
                        fontWeight: 500,
                        fontSize: '28px',
                        lineHeight: '36px',
                        letterSpacing: '-2%',
                        marginBottom: '32px'
                    }}
                />
                <Timeline />
            </Box>

            <Box sx={ContainerStyle}>
                <SimpleTypography text='In addition to offering a wide range of 3D models and interior designs, Tridmo also provides ready-made interior designs that can be purchased and used as-is or customized to suit specific project needs. These interiors are designed by professional designers and are available in various styles, including modern, classic, and contemporary. 3D models of various brands can be found and used to create unique design for interior projects.'
                    sx={TextStyle}
                />

                <Separator />

                <SimpleTypography text='Designs are available in various formats, including OBJ and MAX, and are suitable for use in various software applications. Tridmo worries about security of its users, so by downloading 3D models from our platform you can be sure that you purchased licensed and secured files.'
                    sx={TextStyle}
                />

                <Separator />

                <SimpleTypography text={`Tridmo's licensing system is designed to be flexible and accommodating to different user needs. Licenses can be purchased for personal or commercial use, with different pricing tiers depending on the intended use. The platform also provides a secure payment system that supports various payment methods, including credit cards, PayPal, and bank transfers.`}
                    sx={TextStyle}
                />

            </Box>

        </>
    );
}
