"use client"

import { Box, Grid, styled } from '@mui/material'
import { ThemeProps } from '../../../types/theme';
import SimpleTypography from '../../typography'
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { flatten } from "lodash";
import { useDispatch } from 'react-redux';
import { setCategoryFilter, setColorFilter, setOrderByFilter, setStyleFilter } from '../../../data/handle_filters'
import { getAllModels } from '../../../data/get_all_models';
import { getAllInteriors } from '../../../data/get_all_interiors';
import { useRouter, useSearchParams } from 'next/navigation';
const FiltersItem = styled(Box)(
  ({ theme }: ThemeProps) => `
        background: #F5F5F5;
        padding: 8px 16px;
        display:flex;
        align-items: center;
        justify-content: center;
        cursor:pointer;
        transition: all 0.4s ease;

        &:not(:last-child){
          border-right: 1px solid #E0E0E0;
        }
        &:hover{
          background: #FAFAFA;
        }

        &-selected {
          background: #FAFAFA;
        }
    
  `
);

const filtersWrapStyle = {
  width: "100%",
  borderBottom: '1px solid #e0e0e0',
  padding: "0 8px 10px",
  marginBottom: "20px"
}

function Sorts({ route, dataCount = <></>, ...props }) {

  const sortsData =
    route == 'models' ?
      [
        {
          title: 'Даты',
          orderBy: 'created_at',
          isSelected: true,
        },
        {
          title: 'Топ',
          orderBy: 'top',
          isSelected: false,
        }
      ]
      : route == 'interiors' ?
        [
          {
            title: 'Даты',
            orderBy: 'created_at',
            isSelected: true,
          },
          {
            title: 'Кол-во просмотров',
            orderBy: 'views',
            isSelected: false,
          },
          {
            title: 'Кол-во лайков',
            orderBy: 'likes',
            isSelected: false,
          }
        ]
        : []

  const searchParams = useSearchParams();
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const keyword = searchParams.get('name') as string
  const [sorts, setSorts] = useState(sortsData);

  const getCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelBrandFilter = useSelector((state: any) => state?.handle_filters?.model_brand)
  const getCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getPageFilter = useSelector((state: any) => state?.handle_filters?.page)
  const getModelTopFilter = useSelector((state: any) => state?.handle_filters?.model_top)
  const getModelNameFilter = useSelector((state: any) => state?.handle_filters?.model_name)
  const getModelOrderBy = useSelector((state: any) => state?.handle_filters?.model_orderby)
  const getModelOrder = useSelector((state: any) => state?.handle_filters?.model_order)


  function handleChange(selected: number) {

    setOrderByFilter({ by: sorts[selected].orderBy })

    if (route == 'models') {
      dispatch(getAllModels({
        brand: getModelBrandFilter,
        categories: getCategoryFilter,
        colors: getColorFilter,
        styles: getStyleFilter,
        name: keyword || getModelNameFilter,
        top: getModelTopFilter,
        page: getPageFilter,
        orderBy: getModelOrderBy,
        order: getModelOrder,
      }))
    }
    else if (route == 'interiors') {
      dispatch(getAllInteriors({
        categories: getCategoryFilter,
        styles: getStyleFilter,
        page: getPageFilter,
        orderBy: sorts[selected].orderBy,
      }))
    }

    setSorts(
      sorts.map((e, i) => ({ ...e, isSelected: i === selected }))
    )
  };

  return (
    <Box sx={filtersWrapStyle}>
      <Grid container sx={{ margin: 0 }}>
        <Grid item xs={10} sx={{ display: "flex", alignItems: 'center' }}>
          <SimpleTypography className='filters__title' text="Порядок:" />
          <Box
            sx={{
              mr: '8px',
              maxWidth: { xs: 320, sm: 540 },
              bgcolor: 'background.paper',
              border: '1px solid #E0E0E0'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}
            >
              {
                sorts?.map((item, index) => (
                  <FiltersItem key={index}
                    onClick={() => handleChange(index)}
                    sx={
                      item.isSelected ? { backgroundColor: '#FAFAFA' } : {}
                    }
                  >
                    <SimpleTypography
                      sx={{ color: item.isSelected ? '#141414 !important' : '#686868 !important' }}
                      className='filters__item--text'
                      text={item.title}
                    />
                  </FiltersItem>
                ))
              }
            </Box>
          </Box>
          <Box>
            {dataCount}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Sorts