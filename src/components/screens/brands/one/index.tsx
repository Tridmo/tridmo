"use client"

import * as React from 'react'
import { Box, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProductInfo from '../../../views/model/info'
import SimpleTypography from '../../../typography';
import CustomCard from '../../../custom_card';
import { sampleModel } from '@/data/samples/sample_model';
import Link from 'next/link';
import Buttons from '@/components/buttons';
import BrandInfo from '@/components/views/brand/info';
import Image from 'next/image';


export default function OneBrand() {
    const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
    // const simpleModel = useSelector(selectOneBrand);
    const brand = sampleModel.brand;
    const brandModels = Array.from({ length: 5 }, () => (sampleModel))
    // const brandModels = axios.get(`/models/?brand_id=${simpleModel?.data?.brand_id}&limit=5`).then((res) => res.data.data)
    // const topModels = axios.get(`/models/?orderBy=rating&limit=5`).then((res) => res.data.data)


    return (
        <>
            <Box sx={{ background: "#fafafa" }} className="products">
                <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto !important", alignItems: "center", }}>
                    <Grid
                        className='products__grid'
                        container
                        spacing={2}
                        sx={{ width: "100%", marginBottom: '32px' }}
                    >
                        <Grid
                            className='products__info' item
                            xs={12} md={4}
                            sx={{ marginTop: "20px" }}
                        >
                            <Image
                                width={400}
                                height={400}
                                alt="Brand image"
                                style={{ objectFit: "cover" }}
                                src={`${brand?.logo}`}
                            />
                        </Grid>
                        <BrandInfo />
                    </Grid>

                    {
                        brandModels.length > 0 ?
                            <Divider sx={{ marginBottom: '32px' }} />
                            : null
                    }

                    {/* BRAND MODELS */}
                    {brandModels?.length > 0 ? (
                        <Grid spacing={2}>
                            {/* 3D MODELS */}

                            <Grid
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                                container
                                spacing={2}
                                className="texts__wrap"
                            >
                                <Grid item xs={10}>
                                    <SimpleTypography
                                        text="Продукция бренда"
                                        className="section__title"
                                        variant="h2"
                                    />
                                </Grid>
                            </Grid>

                            {/* 3D MODELS MAP */}

                            <Grid sx={{ mb: "32px" }}>
                                <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
                                    {brandModels?.map((model: any, index: any) => (
                                        <Grid
                                            className='models__card'
                                            sx={{
                                                [`&:not(:nth-of-type(5n))`]: {
                                                    padding: "0 9.5px 0 0 !important",
                                                },
                                                [`&:nth-of-type(5n)`]: {
                                                    padding: "0 0 0 0 !important",
                                                },
                                                marginBottom: "10px"
                                            }}
                                            key={index}
                                            md={12 / 5}
                                            sm={4}
                                            xs={6}
                                            item
                                        >
                                            <CustomCard
                                                type={'/models'}
                                                link={`/models/${model?.slug}`}
                                                key={index}
                                                model={model}
                                                imgHeight={'208px'}
                                                tagIcon={model?.top ? '/icons/star.svg' : ''}
                                            />
                                        </Grid>
                                    ))
                                    }
                                </Grid >
                            </Grid>

                        </Grid>
                    ) : (null)}

                </Box>
            </Box>

        </>
    )
}
