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
import { sampleModel } from '@/data/samples/sample_model';


export default function ModelInfo() {
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
    const simpleModel = sampleModel;
    const DownloadLink = useSelector((state: any) => state?.download_product)
    const downloadStatus = useSelector((state: any) => state?.auth_slicer?.authState)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDownloadAfterRes = async (id: string, is_free?: boolean, product_id?: string) => {

        await axios.post(`products/download/${product_id}`, {}, {
            headers: {
                Authorization: `Bearer ${Cookies.get("accessToken")}`
            }
        })
            .then((res) => (
                router.push(res?.data?.data?.url)
            ))

    }


    function DownloadHandler() {
        console.log(simpleModel?.id);
        let config = {
            headers: {
                'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                'Content-Type': 'application/json'
            }
        };

        console.log(simpleModel?.id);
        if (downloadStatus) {
            axios.post(`products/download/${simpleModel?.id}`, {}, config)
                .then(
                    (res) => {
                        router.push(res?.data?.data?.url)
                    }
                )
        } else {
            dispatch(setOpenModal(true))
            dispatch(setSignupState(true))
        }
    }

    return (
        <Grid
            className='products__info' item
            xs={12} md={6}
            sx={{ marginTop: "20px", paddingLeft: '44px !important' }}
        >

            <SimpleTypography
                text={simpleModel?.name}
                className="product__info--title"
                variant="h1"
            />

            <SimpleTypography
                text={simpleModel?.description}
                className="product__info--desc"
            />

            <Box sx={brandBox}>
                <Image
                    width={180}
                    height={180}
                    alt="Brand image"
                    style={{ objectFit: "cover" }}
                    src={`${simpleModel?.brand?.logo}`}
                />
                <Box sx={{ marginLeft: "24px" }}>
                    <SimpleTypography className='brand__name' text="Имя бренда" />

                    <Link href={`/brands/${simpleModel?.brand?.id}`}>
                        <SimpleTypography sx={{ marginBottom: '15px' }} className='brand__title' text={simpleModel?.brand?.name} />
                    </Link>

                    <Link
                        target="_blank"
                        href={`https://www.google.com/maps/@${simpleModel?.brand?.location?.lat},${simpleModel?.brand?.location?.long},12z`}
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
                                    text={`${simpleModel?.brand?.location?.name
                                        }`}
                                />
                            </Box>
                        </Buttons>
                    </Link>
                    <Link href={`tel:${simpleModel?.brand?.phone_number}`}>
                        <Buttons className='brand__box' name="">
                            <Image
                                width={19}
                                height={23}
                                alt="Phone number"
                                src={"/icons/phone.svg"}
                            />
                            <Box sx={{ marginLeft: "11px" }}>
                                <SimpleTypography className='brand__name' text="Номер телефона" />
                                <SimpleTypography className='brand__box--text' text={`${simpleModel?.brand?.phone_number}`} />
                            </Box>
                        </Buttons>
                    </Link>
                </Box>
            </Box >


            <TableContainer
                sx={{
                    borderRadius: "0",
                    marginBottom: "28px"
                }}
                component={Paper}
            >
                <Table size="small" aria-label="a dense table">
                    <TableBody
                        sx={{
                            borderTop: "1px solid #b3b3b3",
                            borderBottom: "1px solid #b3b3b3",

                            '& tr th': { padding: '6px 8px' }
                        }}
                    >
                        {/* {rows.map((row, index) => ( */}
                        <TableRow
                            // key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)" }}
                        >
                            <TableCell sx={{ borderColor: " #B3B3B3" }} component="th" scope="row">
                                <SimpleTypography
                                    text={"Стиль"}
                                    className="table__text"
                                />
                            </TableCell>
                            <TableCell sx={{ borderColor: "#b3b3b3" }} align="right">
                                <SimpleTypography
                                    text={simpleModel?.style?.name}
                                    className="table__text"
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow
                            // key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)" }}
                        >
                            <TableCell sx={{ borderColor: " #B3B3B3" }} component="th" scope="row">
                                <SimpleTypography
                                    text={"Размеры"}
                                    className="table__text"
                                />
                            </TableCell>
                            <TableCell sx={{ borderColor: " #b3b3b3" }} align="right">
                                <SimpleTypography
                                    text={`X: ${simpleModel?.width} см`}
                                    className="table__text"
                                />
                                <SimpleTypography
                                    text={`Y: ${simpleModel?.height} см`}
                                    className="table__text"
                                />
                                <SimpleTypography
                                    text={`Z: ${simpleModel?.length} см`}
                                    className="table__text"
                                />
                            </TableCell>
                        </TableRow>

                        <TableRow
                            // key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)" }}
                        >
                            <TableCell sx={{ borderColor: " #B3B3B3" }} component="th" scope="row">
                                <SimpleTypography
                                    text={"Цвета"}
                                    className="table__text"
                                />
                            </TableCell>
                            <TableCell sx={{ borderColor: " #b3b3b3" }} align="right">
                                <Box sx={{ display: "flex" }}>
                                    {
                                        simpleModel?.colors?.map((color: any, index: number) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    width: "16px",
                                                    height: "16px",
                                                    borderRadius: "50%",
                                                    background: color?.color?.hex_value,
                                                    marginRight: "4px"
                                                }}
                                            />
                                        ))
                                    }
                                </Box>

                            </TableCell>
                        </TableRow>

                        <TableRow
                            // key={index}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)"
                            }}
                        >
                            <TableCell sx={{ borderColor: " #B3B3B3" }} component="th" scope="row">
                                <SimpleTypography
                                    text={"Материалы"}
                                    className="table__text"
                                />
                            </TableCell>
                            <TableCell sx={{ borderColor: " #b3b3b3" }}>
                                <Box sx={{ display: "flex" }}>
                                    {
                                        simpleModel?.materials?.map((material: any, index: number) => (
                                            <SimpleTypography
                                                key={index}
                                                text={`${material?.material?.name}${index + 1 !== simpleModel?.materials.length ? "," : ""}`}
                                                className="table__text"
                                            />
                                        ))
                                    }
                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow
                            // key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)" }}
                        >
                            <TableCell sx={{ borderColor: " #B3B3B3" }} component="th" scope="row">
                                <SimpleTypography
                                    text={"Доступность"}
                                    className="table__text"
                                />
                            </TableCell>
                            <TableCell sx={{ borderColor: "#b3b3b3" }} align="right">
                                <SimpleTypography
                                    text={simpleModel?.availability}
                                    className="table__text"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow
                            // key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)" }}
                        >
                            <TableCell sx={{ borderColor: " #B3B3B3" }} component="th" scope="row">
                                <SimpleTypography
                                    text={"Цена"}
                                    className="table__text"
                                />
                            </TableCell>
                            <TableCell sx={{ borderColor: "#b3b3b3" }} align="right">
                                <SimpleTypography
                                    text={simpleModel?.furniture_cost}
                                    className="table__text"
                                />
                            </TableCell>
                        </TableRow>
                        {/* ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container sx={{ justifyContent: "space-between" }}>
                <Grid item md={5.8} xs={12}>
                    <Buttons
                        name=""
                        type="button"
                        className="download-small__zip--file"
                        disabled={true}
                    >
                        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
                            <Image
                                width={24}
                                height={26.67}
                                alt="Models"
                                src="/icons/zip-icon.svg"
                            />
                            <Box sx={{ marginLeft: "8px" }}>
                                <SimpleTypography
                                    className="download__button--text"
                                    text={`${simpleModel?.model_platform?.name} + ${simpleModel?.render_platform?.name}`}
                                />
                                {
                                    simpleModel?.file?.size ?
                                        <SimpleTypography className="download__button--mb" text={`${(Number(simpleModel?.file?.size) / 1000000).toFixed(2)} mb`} />
                                        :
                                        <SimpleTypography className="download__button--mb" text={`0 mb`} />
                                }
                            </Box>
                        </Box>
                    </Buttons>
                </Grid>
                <Grid
                    item
                    md={5.8}
                    xs={12}
                >

                    <Buttons
                        onClick={DownloadHandler}
                        name={`Скачать`}
                        startIcon={isSubmitting}
                        endIcon={undefined}
                        type="button"
                        disabled={isSubmitting}
                        className={!isSubmitting ? "download__model--model" : "download__model--disabled"}
                    />

                </Grid>
                <Grid />
            </Grid>
            {/* {!downloadStatus ? <SimpleTypography text='You must be registered or sign in to order a model!' className='download__warning' /> : null } */}

        </Grid >
    )
}
