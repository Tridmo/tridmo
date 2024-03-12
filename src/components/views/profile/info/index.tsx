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
import { sampleUser } from '@/data/samples/sample_model';


export default function ProfileInfo() {
    const router = useRouter()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    const dispatch = useDispatch<any>();
    // const user = useSelector(selectOneModel);
    const user = sampleUser;

    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '32px 24px',
                width: '400px',
                backgroundColor: '#fff',
                border: '1px solid #E0E0E0',
            }}
        >

            <Box mb={'18px'}>
                <Box mb={'18px'} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                        width={152}
                        height={152}
                        alt="avatar"
                        style={{ objectFit: "cover", margin: '0 auto' }}
                        src={`${user?.image_src}`}
                    />
                </Box>
                <SimpleTypography sx={{
                    fontSize: '22px',
                    fontWeight: '500',
                    lineFeight: '26px',
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                }} text={`${user?.username}`} />

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <SimpleTypography sx={{
                        color: '#3C9154',
                        fontSize: '16px',
                        fontWeight: '400',
                        textAlign: 'left',
                        marginRight: '3px'
                    }} text={`Репутация:`} />

                    <SimpleTypography sx={{
                        color: '#3C9154',
                        fontSize: '16px',
                        fontWeight: '600',
                        textAlign: 'left',
                    }} text={`${user?.rank}`} />
                </Box>
            </Box>

            <TableContainer
                sx={{
                    borderRadius: "0",
                    marginBottom: "18px"
                }}
                component={Paper}
            >
                <Table size="small" aria-label="a dense table">
                    <TableBody
                        sx={{
                            borderTop: "1px solid #F5F5F5",
                            borderBottom: "1px solid #F5F5F5",

                            '& tr th': { padding: '12px 8px' }
                        }}
                    >
                        {/* {rows.map((row, index) => ( */}
                        <TableRow
                            // key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                        >
                            <TableCell sx={{ borderColor: "#F5F5F5" }} component="th" scope="row">
                                <SimpleTypography
                                    text={"Имя Фамилия"}
                                    className="table__text"
                                />
                            </TableCell>
                            <TableCell sx={{ borderColor: "#F5F5F5" }} align="right">
                                <SimpleTypography
                                    text={user.name}
                                    className="table__text"
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow
                            // key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                        >
                            <TableCell sx={{ borderColor: "#F5F5F5" }} component="th" scope="row">
                                <SimpleTypography
                                    text={"Дата регистрации"}
                                    className="table__text"
                                />
                            </TableCell>
                            <TableCell sx={{ borderColor: "#F5F5F5" }} align="right">
                                <SimpleTypography
                                    text={user?.created_at}
                                    className="table__text"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow
                            // key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                        >
                            <TableCell sx={{ borderColor: "#F5F5F5" }} component="th" scope="row">
                                <SimpleTypography
                                    text={"Электрон Почта"}
                                    className="table__text"
                                />
                            </TableCell>
                            <TableCell sx={{ borderColor: "#F5F5F5" }} align="right">
                                <SimpleTypography
                                    text={user?.email}
                                    className="table__text"
                                />
                            </TableCell>
                        </TableRow>
                        {
                            user?.portfolio_link
                                ? <TableRow
                                    // key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                                >
                                    <TableCell sx={{ borderColor: "#F5F5F5" }} component="th" scope="row">
                                        <SimpleTypography
                                            text={"Портфолио"}
                                            className="table__text"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ borderColor: "#F5F5F5" }} align="right">
                                        <SimpleTypography
                                            text={user?.portfolio_link}
                                            className="table__text"
                                        />
                                    </TableCell>
                                </TableRow>
                                : null
                        }
                        {/* ))} */}
                    </TableBody>
                </Table>
            </TableContainer>

            <Grid container sx={{ width: '100%', justifyContent: "space-between" }}>
                <Grid item md={12} xs={12} mb={'10px'}>
                    {
                        user?.telegram
                            ? <Link target="_blank" href={`https://t.me/${user.telegram}`}>
                                <Buttons
                                    sx={{ width: '100%' }}
                                    className='bookmark__btn'
                                    name="Связаться через Telegram"
                                    childrenFirst={true}
                                >
                                    <Image
                                        width={19}
                                        height={23}
                                        alt="web"
                                        src={"/icons/telegram-logo.svg"}
                                    />
                                </Buttons>
                            </Link>
                            : <Buttons
                                sx={{ width: '100%' }}
                                className='bookmark__btn--disabled'
                                name="Связаться через Telegram"
                                childrenFirst={true}
                            >
                                <Image
                                    width={19}
                                    height={23}
                                    alt="web"
                                    src={"/icons/telegram-logo.svg"}
                                />
                            </Buttons>
                    }
                </Grid>
                <Grid item md={12} xs={12}>
                    {
                        user?.phone_number
                            ? <Link href={`tel:${user.phone_number}`}>
                                <Buttons
                                    sx={{ width: '100%' }}
                                    className='bookmark__btn'
                                    name="Связаться по телефону"
                                    childrenFirst={true}
                                >
                                    <Image
                                        width={19}
                                        height={23}
                                        alt="Phone number"
                                        src={"/icons/phone.svg"}
                                    />
                                </Buttons>
                            </Link>
                            : <Buttons
                                sx={{ width: '100%' }}
                                className='bookmark__btn--disabled'
                                name="Связаться по телефону"
                                childrenFirst={true}
                            >
                                <Image
                                    width={19}
                                    height={23}
                                    alt="Phone number"
                                    src={"/icons/phone.svg"}
                                />
                            </Buttons>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}
