"use client"

import * as React from 'react'
import { Box, Divider, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProductInfo from '../../../views/model/info'
import SimpleTypography from '../../../typography';
import CustomCard from '../../../custom_card';
import { sampleInterior, sampleModel, sampleUser } from '@/data/samples/sample_model';
import Link from 'next/link';
import Buttons from '@/components/buttons';
import ProfileInfo from '@/components/views/profile/info';
import Image from 'next/image';
import BasicPagination from '@/components/pagination/pagination';
import EmptyData from '@/components/views/empty_data';


export default function DesignerProfile() {
    const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
    // const simpleModel = useSelector(selectOneModel);
    const designer = sampleUser;
    const designerWorks = Array.from({ length: 12 }, () => (sampleInterior))
    // const designerWorks = axios.get(`/models/?brand_id=${simpleModel?.data?.brand_id}&limit=5`).then((res) => res.data.data)
    // const topModels = axios.get(`/models/?orderBy=rating&limit=5`).then((res) => res.data.data)


    return (
        <>
            <Box sx={{ background: "#fafafa" }} className="products">
                <Box className='products__container' sx={{ maxWidth: "1200px", width: "100%", margin: "0 auto 32px auto !important", alignItems: "center", }}>
                    <Grid container sx={{ marginTop: "32px", marginLeft: 0 }} >

                        <Grid item xs={4} sx={{ paddingRight: "10px" }}>
                            <ProfileInfo />
                        </Grid >

                        <Grid item xs={8} style={{ paddingLeft: "40px" }}>
                            <SimpleTypography
                                text="Галерея"
                                className="section__title"
                                variant="h2"
                            />

                            {designerWorks?.length > 0 ? (
                                <>
                                    <Grid spacing={2} mb={'6px'}>
                                        <Grid className="models__card--wrap" container spacing={3} sx={{ width: "100%", margin: "0" }}>
                                            {designerWorks?.map((model: any, index: any) => (
                                                <Grid
                                                    className='models__card'
                                                    sx={{
                                                        [`&:not(:nth-of-type(3n))`]: {
                                                            padding: "0 9.5px 0 0 !important",
                                                        },
                                                        [`&:nth-of-type(3n)`]: {
                                                            padding: "0 0 0 0 !important",
                                                        },
                                                        marginBottom: "10px"
                                                    }}
                                                    key={index}
                                                    md={12 / 3}
                                                    sm={4}
                                                    xs={6}
                                                    item
                                                >
                                                    <CustomCard
                                                        type={'interiors'}
                                                        link={`/interiors/${model?.slug}`}
                                                        key={index}
                                                        model={model}
                                                        imgHeight={'232px'}
                                                        withAuthor={true}
                                                    />
                                                </Grid>
                                            ))
                                            }
                                        </Grid >
                                    </Grid>
                                    <Grid spacing={2} container sx={{ width: '100%', margin: "0 auto 32px auto" }}>
                                        <Grid
                                            item
                                            xs={12}
                                            sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }}
                                        >
                                            <BasicPagination
                                                count={/*designerWorks[0]?.pagination?.pages*/ 12}
                                                page={/*parseInt(designerWorks[0]?.pagination?.current)*/0 + 1}
                                            // page={page}
                                            // pageArray={pageArray}
                                            // pagesCount={pagesCount}
                                            // increment={(e, data) => {
                                            //   props.setPage(page + 1);
                                            // }}
                                            // changePage={(e, data) => {
                                            //   setPage(data);
                                            // }}
                                            // decrement={(e, data) => {
                                            //   setPage(page - 1);
                                            // }}
                                            // const handleChange = (event, value) => {
                                            //   props.changePage(event,value)
                                            // };
                                            // count={props.pagesCount} page={+props.page} onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                <EmptyData />
                            )}
                        </Grid>

                    </Grid>
                </Box>
            </Box>

        </>
    )
}
