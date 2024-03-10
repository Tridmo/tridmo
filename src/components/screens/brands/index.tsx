"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllBrands } from '../../../data/get_all_brands';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Box, Grid } from '@mui/material'
import Image from 'next/image';
import SimpleTypography from '@/components/typography';
import BasicPagination from '@/components/pagination/pagination';


const SX = {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#686868'

}

export default function BrandsPage() {
    const dispatch = useDispatch<any>();
    // const all__brands = useSelector(selectAllBrands)
    const all__brands: { data?: any[] } = {
        data: Array.from({ length: 20 }, () => ({
            id: `${Math.random()}`,
            cover: [{ image: { src: '/static/images/avatar/1.jpg' } }],
            name: `Brand name`,
            slug: `brand_slug`,
            site_link: `brand.com`,
            description: 'Lorem',
            image_src: `/img/interior1.png`,
            style: `Style`,
            rating: 10
        }))
    }

    return (
        <Box sx={{ width: '1200px', minHeight: 829, display: "block", margin: "0 auto" }}>
            <SimpleTypography text='Бренды' className='section__title' sx={{ margin: '32px auto !important' }} />
            <List
                sx={{
                    width: '100%',
                    maxWidth: 1200,
                    bgcolor: 'background.paper',
                    borderRadius: '4px',
                    paddingTop: 0,
                }}
            >
                <ListItem alignItems="center"
                    key={-1}
                    sx={{
                        backgroundColor: '#F5F5F5',
                        justifyContent: 'flex-start',
                        padding: '12px 24px',
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px',
                    }}
                >
                    <SimpleTypography
                        text='№'
                        sx={{ ...SX, textAlign: 'center !important', minWidth: '56px', marginRight: '16px' }}
                    />
                    <SimpleTypography
                        text='Бренд'
                        sx={{ ...SX, minWidth: '490px', }}
                    />
                    <SimpleTypography
                        text='Стиль'
                        sx={{ ...SX, minWidth: '400px', }}
                    />
                    <SimpleTypography
                        text='Репутация'
                        sx={{ ...SX, minWidth: '180px', }}
                    />
                </ListItem>
                {
                    all__brands?.data?.map((brand, index: any) =>
                        <>
                            <ListItem key={index} alignItems="center"
                                sx={{ justifyContent: 'flex-start', padding: '12px 24px' }}>
                                <ListItemText sx={{ maxWidth: 56, marginRight: '16px' }}>
                                    <SimpleTypography
                                        text={index + 1}
                                        sx={{
                                            textAlign: 'center',
                                            color: '#B3B3B3',
                                            fontWeight: 500,
                                            fontSize: '22px',
                                            lineHeight: '26px',
                                            letterSpacing: '-0.02em'
                                        }}
                                    />
                                </ListItemText>
                                <ListItemAvatar
                                    sx={{
                                        backgroundColor: '#fff',
                                        width: '80px',
                                        height: '80px',
                                        border: '1px solid #E0E0E0',
                                        borderRadius: '8px',
                                        margin: '0 16px 0 0'
                                    }}
                                >
                                    <Avatar
                                        src={brand?.image_src}
                                        alt='Landing image'
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '5px'
                                        }}
                                    />
                                </ListItemAvatar>
                                <ListItemText sx={{ margin: '0 8px', minWidth: '380px' }} >
                                    <SimpleTypography
                                        text={brand?.name}
                                        sx={{
                                            fontSize: '22px',
                                            fontWeight: 400,
                                            lineHeight: '26px',
                                            letterSpacing: '-0.02em',
                                            textAlign: 'start',
                                            color: '#141414'
                                        }}
                                    />
                                    <SimpleTypography
                                        text={brand?.site_link}
                                        sx={{
                                            fontSize: '18px',
                                            fontWeight: 400,
                                            lineHeight: '24px',
                                            letterSpacing: '-0.01em',
                                            textAlign: 'start',
                                            color: '#848484'
                                        }}
                                    />
                                </ListItemText>
                                <ListItemText sx={{ minWidth: '400px' }} >
                                    <SimpleTypography
                                        text={brand?.style}
                                        sx={{
                                            fontSize: '22px',
                                            fontWeight: 400,
                                            lineHeight: '26px',
                                            letterSpacing: '-0.02em',
                                            textAlign: 'start',
                                        }}
                                    />
                                </ListItemText>
                                <ListItemText sx={{ minWidth: '180px' }}>
                                    <SimpleTypography
                                        text={brand?.rating}
                                        sx={{
                                            fontSize: '22px',
                                            fontWeight: 400,
                                            lineHeight: '26px',
                                            letterSpacing: '-0.02em',
                                            textAlign: 'start',
                                        }}
                                    />
                                </ListItemText>
                            </ListItem>
                            {
                                all__brands?.data?.length && index != all__brands?.data?.length - 1 ?
                                    <Divider sx={{ margin: 0 }} variant="inset" component="li" />
                                    : null
                            }
                        </>
                    )
                }
            </List>
            <Grid spacing={2} container sx={{ width: '100%', margin: "0 auto", padding: "17px 0 32px 0" }}>
                <Grid
                    sx={{ display: "flex", alignItems: "baseline" }}
                    item
                    xs={6}
                >
                    <SimpleTypography
                        text={`Показаны ${all__brands[0]?.pagination?.current + 1}–${all__brands[0]?.pagination?.limit} из`}
                        className='pagenation__desc'
                    />

                    <SimpleTypography
                        text={`${all__brands[0]?.pagination?.pages * all__brands[0]?.pagination?.limit} Брендов`}
                        className='pagenation__desc--bold' />
                </Grid>
                <Grid
                    item
                    xs={6}
                    sx={{ padding: "0 !important", display: "flex", justifyContent: "flex-end" }}
                >
                    <BasicPagination
                        count={all__brands[0]?.pagination?.pages}
                        page={parseInt(all__brands[0]?.pagination?.current) + 1}
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
        </Box>
    )
}
