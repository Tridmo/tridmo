"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllModels } from '../../../data/get_all_models';
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Box, Grid } from '@mui/material'
import Image from 'next/image';
import SimpleTypography from '@/components/typography';
import BasicPagination from '@/components/pagination/pagination';
import Link from 'next/link';


const SX = {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: '#686868'

}

export default function DesignersPage() {
    const dispatch = useDispatch<any>();
    // const all__designers = useSelector(selectAllModels)
    const all__designers: { data?: any[] } = {
        data: Array.from({ length: 20 }, () => ({
            id: `${Math.random()}`,
            name: `John Doe`,
            slug: `user_id`,
            username: `username`,
            description: 'Lorem',
            image_src: `/img/avatar.png`,
            designs_count: 10,
            rating: 10
        }))
    }

    return (
        <Box sx={{ width: '1200px', minHeight: 829, display: "block", margin: "0 auto" }}>
            <SimpleTypography text='Дизайнеры' className='section__title' sx={{ margin: '32px auto !important' }} />
            <List
                sx={{
                    width: '100%',
                    maxWidth: 1200,
                    bgcolor: 'background.paper',
                    border: '1px solid #E0E0E0',
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
                        text='Профиль'
                        sx={{ ...SX, minWidth: '590px', }}
                    />
                    <SimpleTypography
                        text='Галерея'
                        sx={{ ...SX, minWidth: '300px', }}
                    />
                    <SimpleTypography
                        text='Репутация'
                        sx={{ ...SX, minWidth: '180px', }}
                    />
                </ListItem>
                {
                    all__designers?.data?.map((user, index: any) =>
                        <Link href={`/designers/${user?.username}`}>

                            <ListItem key={user?.id} alignItems="center"
                                sx={{
                                    justifyContent: 'flex-start',
                                    padding: '12px 24px',
                                    transition: '0.4s all ease',

                                    '&:hover': {
                                        backgroundColor: '#FAFAFA',
                                    },
                                    '&:hover .username': {
                                        color: '#0646E6 !important',
                                    }
                                }}
                            >
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
                                        borderRadius: '50%',
                                        margin: '0 16px 0 0'
                                    }}
                                >
                                    <Avatar
                                        src={user?.image_src}
                                        alt='User image'
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '5px'
                                        }}
                                    />
                                </ListItemAvatar>
                                <ListItemText className='username' sx={{ margin: '0 8px', minWidth: '480px' }}>

                                    <SimpleTypography
                                        text={user?.username}
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
                                        text={user?.name}
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
                                <ListItemText sx={{ minWidth: '300px' }}>
                                    <SimpleTypography
                                        text={user?.designs_count}
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
                                        text={user?.rating}
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
                                all__designers?.data?.length && index != all__designers?.data?.length - 1 ?
                                    <Divider sx={{ margin: 0 }} variant="inset" component="li" />
                                    : null
                            }
                        </Link>
                    )
                }
            </List>
            <Grid spacing={2} container sx={{ width: '100%', margin: "0 auto", padding: "17px 0 32px 0" }}>
                <Grid
                    item
                    xs={12}
                    sx={{ padding: "0 !important", display: "flex", justifyContent: "center" }}
                >
                    <BasicPagination
                        count={all__designers[0]?.pagination?.pages}
                        page={parseInt(all__designers[0]?.pagination?.current) + 1}
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
