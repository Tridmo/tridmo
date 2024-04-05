"use client"

import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, useMediaQuery } from '@mui/material'
import SimpleCard from '../../simple_card'
import SimpleTypography from '../../typography'
import Pagination from '../../pagination/pagination'
import Categories from '../../views/categories/model_categories'
import { selectAllModels } from '../../../data/get_all_models';
import Style from '../../views/styles/model_styles'
import { useSearchParams } from 'next/navigation'
import { searchModels, setSearchVal } from '../../../data/search_model'
import { Close } from '@mui/icons-material'
import Buttons from '../../buttons'
import Sorts from '../../views/sorts'
import ModelCrumb from '../../breadcrumbs/model_crumb'


export default function ModelsPage() {
    const dispatch = useDispatch<any>();
    const searchParams = useSearchParams();
    const IsFilterOpen = useSelector((state: any) => state?.modal_checker?.isFilterModal)
    const searchedModels = useSelector((state: any) => state?.search_models?.data)
    const matches = useMediaQuery('(max-width:600px)');

    const all__models = useSelector(selectAllModels)

    const keyword = searchParams.get('keyword') as string

    useEffect(() => {
        // if(searched__modes__status === "succeeded"){
        //   searchedModels[0]?.data.map((model: any, index: any) => {
        //     console.log(model);
        //     if(model.interior){
        //       setInteriors((old:any) => [...old,model])
        //     }
        //   })
        // }
        console.log(keyword, "router.query.keyword");

        const query = {}
        Object.keys(searchParams.keys()).forEach(k => query[k] = searchParams.get(k))

        dispatch(searchModels(query))
        dispatch(setSearchVal(keyword))

    }, [keyword])

    return (
        <Box sx={{ width: '1200px', minHeight: 829, display: "block", margin: "0 auto" }}>

            {/* <ModelCrumb name={"3D models"} /> */}

            <Grid spacing={2} container sx={{ marginTop: "32px", marginLeft: 0 }} >
                <Grid item className='models-page__filters' md={2.2} xs={12} sx={matches ? { paddingRight: "10px", borderRight: "1px solid #b3b3b3", transform: `translate(-50%,${IsFilterOpen ? "-50%" : "-200%"})` } : { paddingRight: "10px", borderRight: "1px solid #b3b3b3", }}>

                    <Suspense>
                        <Box className='models-page__filters--child'>
                            <Box className='models-page__filters--box'>
                                <Suspense>
                                    <Categories />
                                </Suspense>
                            </Box>
                            <Box className='models-page__filters--box'>
                                <Style />
                            </Box>

                        </Box>
                    </Suspense>

                </Grid>
                <Grid item xs={9.5} style={{ padding: "0 0 0 16px" }} sx={{ minHeight: "100vh" }}>
                    {
                        keyword ?
                            <Box sx={{ borderBottom: '1px solid #e0e0e0', padding: '0 8px 10px', marginBottom: '10px' }}>
                                <SimpleTypography text={`Интерьеры «${keyword}»`} className='prodcts__result--title' variant="h2" />
                                <SimpleTypography text={`найдено ${searchedModels?.pagination?.data_count} результатов`} className='products__result--text' variant="h2" />
                            </Box>
                            : null
                    }

                    <Sorts route={'models'} />

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
                        text={`Показаны ${all__models?.data?.pagination?.current + 1}–${all__models?.data?.pagination?.limit} из`}
                        className='pagenation__desc'
                    />

                    <SimpleTypography
                        text={`${all__models?.data?.pagination?.data_count} товаров`}
                        className='pagenation__desc--bold' />
                </Grid>
                <Grid
                    item
                    xs={6}
                    sx={{ padding: "0 !important", display: "flex", justifyContent: "flex-end" }}
                >
                    <Pagination
                        count={all__models?.data?.pagination?.pages}
                        page={parseInt(all__models?.data?.pagination?.current) + 1}
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
