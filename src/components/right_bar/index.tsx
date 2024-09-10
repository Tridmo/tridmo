"use client"
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Drawer, Grid, keyframes, SwipeableDrawer, SxProps } from '@mui/material';
import CheckoutBar from './checkout_bar';
import { selectToggleCardActionStatus, switch_on } from '../../data/toggle_cart';
import { getNotifications, selectNotificationsStatus } from '../../data/get_notifications';
import { selectMyProfile } from '../../data/me';

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


const RightBar: React.FC = () => {
  const get_cart_status = useSelector(selectToggleCardActionStatus);
  const router = useRouter();
  const dispatch = useDispatch<any>();

  const toggleDrawer = (state: boolean) => {
    dispatch(switch_on(state))
  }

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor={'left'}
        open={get_cart_status}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <CheckoutBar />
      </SwipeableDrawer>
    </React.Fragment>
  )
}

export default RightBar;