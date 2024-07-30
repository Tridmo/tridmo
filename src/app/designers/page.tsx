"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '../../data/get_all_brands';
import DesignersPage from '../../components/screens/designers';
import { getAllDesigners } from '../../data/get_all_designers';
import { getMyProfile } from '../../data/me';
import { designersLimit } from '../../types/filters';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Designers() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const getDesignersStatus = useSelector((state: any) => state?.get_all_designers?.status);
  const getProfileStatus = useSelector((state: any) => state?.get_profile?.status);

  React.useEffect(() => {
    if (getDesignersStatus === "idle") {
      dispatch(getAllDesigners({ limit: designersLimit, orderBy: 'rating' }))
    }
    if (getProfileStatus === "idle") {
      dispatch(getMyProfile({}))
    }
  }, [dispatch, router, getDesignersStatus, getProfileStatus])

  return (
    <>
      <section style={{ background: "#fafafa" }}>
        <DesignersPage />
      </section>
    </>
  )
}
