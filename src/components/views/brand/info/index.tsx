import { Grid, Table, TableBody, TableCell, FormControl, FormControlLabel, Radio, RadioGroup, TableContainer, styled, Box, TableRow, Paper, Checkbox } from '@mui/material';
import SimpleTypography from '../../../typography';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneModel, selectOneModel } from '@/data/get_one_model';

import Link from 'next/link';
import Buttons from '../../../buttons';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from '@/utils/axios';
import { toast } from "react-toastify"
import { setLoginState, setOpenModal, setSignupState } from '@/data/modal_checker';
import { sampleBrand, sampleModel } from '@/data/samples/sample_model';


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
    // const simpleModel = useSelector(selectOneModel);
    const brand = sampleBrand;

    return (
        <Grid
            className='products__info' item
            xs={12} md={8}
            sx={{ marginTop: "20px", paddingLeft: '50px !important' }}
        >

            <SimpleTypography className='brand__name' text="Имя бренда" />
            <SimpleTypography
                text={brand?.name}
                className="brand_page__info--title"
                variant="h1"
                sx={{ marginBottom: '40px' }}
            />

            <SimpleTypography className='brand__name' text="Описание" />
            <SimpleTypography
                text={brand?.description}
                className="brand_page__info--desc"
                sx={{ marginBottom: '40px' }}
            />

            <Grid container columnSpacing={1}>

                <Grid item>
                    <Link
                        target="_blank"
                        href={`https://www.google.com/maps/@${brand?.location?.lat},${brand?.location?.long},12z`}
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
                                    text={`${brand?.location?.name
                                        }`}
                                />
                            </Box>
                        </Buttons>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href={`tel:${brand?.phone_number}`}>
                        <Buttons className='brand__box' name="">
                            <Image
                                width={19}
                                height={23}
                                alt="Phone number"
                                src={"/icons/phone.svg"}
                            />
                            <Box sx={{ marginLeft: "11px" }}>
                                <SimpleTypography className='brand__name' text="Номер телефона" />
                                <SimpleTypography className='brand__box--text' text={`${brand?.phone_number}`} />
                            </Box>
                        </Buttons>
                    </Link>
                </Grid>
                <Grid item>
                    <Link href={`mailto:${brand?.email}`}>
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
                <Grid item>
                    <Link target="_blank" href={brand?.site_link} rel="noopener noreferrer">
                        <Buttons className='brand__box' name="">
                            <Image
                                width={19}
                                height={23}
                                alt="web"
                                src={"/icons/mail.svg"}
                            />
                            <Box sx={{ marginLeft: "11px" }}>
                                <SimpleTypography className='brand__name' text="Веб-сайт" />
                                <SimpleTypography
                                    className='brand__box--text'
                                    text={`${brand?.site_link.includes('https://') ||
                                        brand?.site_link.includes('http://')
                                        ?
                                        brand?.site_link.split('://')[1].replaceAll('/', '')
                                        : brand?.site_link
                                        }`}
                                />
                            </Box>
                        </Buttons>
                    </Link>
                </Grid>
                <Grid item>
                    <Box>
                        <Buttons className='brand__box' name="">
                            <Image
                                width={19}
                                height={23}
                                alt="web"
                                src={"/icons/cube.svg"}
                            />
                            <Box sx={{ marginLeft: "11px" }}>
                                <SimpleTypography className='brand__name' text="Стиль" />
                                <SimpleTypography className='brand__box--text' text={`${brand?.style}`} />
                            </Box>
                        </Buttons>
                    </Box>
                </Grid>
            </Grid>


        </Grid >
    )
}
