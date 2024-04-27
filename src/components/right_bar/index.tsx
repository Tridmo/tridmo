"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Grid, keyframes } from '@mui/material';
import CheckoutBar from './checkout_bar';
import { selectToggleCardActionStatus, switch_on } from '../../data/toggle_cart';

const RightBar: React.FC = () => {
  const get_cart_status = useSelector(selectToggleCardActionStatus);
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)

  const openRightBar = () => {
    dispatch(switch_on(false))
  }

  const modalSlider = keyframes`
    from{
      transform:translateX(100%)
      /* opacity: 0 */
    }
    to{
      transform:translateX(0)
      /* opacity: 1 */
    }
`

  const LeftSidemodalSlider = keyframes`
  from{
    opacity: 0
  }
  to{
    opacity: 1
  }
`
  const modalStyle: React.CSSProperties = {
    backgroundColor: "white",
    position: "fixed",
    right: 0,
    top: 0,
    height: "100%",
    zIndex: 110,
    maxWidth: "400px",
    animation: `${modalSlider}  0.2s linear forwards`
  }

  const LeftSideModalStyle: React.CSSProperties = {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: "100",
    top: 0,
    backgroundColor: "rgba(20, 20, 20, 0.25)",
    animation: `${LeftSidemodalSlider}  0.7s linear forwards`
  }


  if (get_cart_status) {
    return (
      <>
        {/* <Grid 
        container
        sx={{
          position: "relative",
          top: 0,
          zIndex: "100",
          // minHeight: "100vh",
        }}
      > */}
        <Grid
          sx={LeftSideModalStyle}
          item
          onClick={openRightBar}
        >
        </Grid>
        {/* </Grid> */}

        <Grid
          sx={
            modalStyle
          }
          item
        // xs={3.7}

        >
          <CheckoutBar />
        </Grid>
      </>
    )
  } else {
    return null;
  }
}

export default RightBar;