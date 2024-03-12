"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box } from '@mui/material'
import SimpleCard from '../../simple_card'
import SimpleTypography from '../../typography'
import Pagination from '../../pagination/pagination'
import Categories from '../../views/categories'
import { selectAllModels } from '../../../data/get_all_models';
import { setPageFilter } from '../../../data/handle_filters'
import ColorsFilter from '../../views/colors'
import Style from '../../views/model_styles'
import Filters from '../../views/filters'


export default function ModelsPage() {
    const dispatch = useDispatch<any>();
    const all__models = useSelector(selectAllModels)

    return (
        <Box sx={{ width: '1200px', minHeight: 829, display: "block", margin: "0 auto" }}>
            <Grid spacing={2} container sx={{ marginTop: "32px", marginLeft: 0 }} >
                <Grid xs={2.3} sx={{ paddingRight: "10px", borderRight: "1px solid #b3b3b3" }}>
                    <Categories />
                    <Style />
                </Grid>
                <Grid xs={9.5} style={{ paddingLeft: "16px" }} sx={{ minHeight: "100vh" }}>
                    <SimpleTypography text='Модели' className='section__title' />
                    <Filters />
                    {/* ---- MODEL CARDS ---- */}

                    <SimpleCard cols={4} route={"models"} />


                    {/* ---- MODEL CARDS ---- */}

                </Grid>
            </Grid>
            <Grid spacing={2} container sx={{ width: '100%', margin: "0 auto", padding: "17px 0 32px 0" }}>
                <Grid
                    sx={{ padding: "0 0 0 223px !important", display: "flex", alignItems: "baseline" }}
                    item
                    xs={6}
                >
                    <SimpleTypography
                        text={`Показаны ${all__models[0]?.pagination?.current + 1}–${all__models[0]?.pagination?.limit} из`}
                        className='pagenation__desc'
                    />

                    <SimpleTypography
                        text={`${all__models[0]?.pagination?.pages * all__models[0]?.pagination?.limit} товаров`}
                        className='pagenation__desc--bold' />
                </Grid>
                <Grid
                    item
                    xs={6}
                    sx={{ padding: "0 !important", display: "flex", justifyContent: "flex-end" }}
                >
                    <Pagination
                        count={all__models[0]?.pagination?.pages}
                        page={parseInt(all__models[0]?.pagination?.current) + 1}
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
