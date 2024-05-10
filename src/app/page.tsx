"use client"

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStyles } from '@/data/get_all_styles';
import { getAllInteriors } from '@/data/get_all_interiors';
import LandingPage from '../components/screens/landing';
import { getAllModels } from '../data/get_all_models';
import { getAllDesigners } from '../data/get_all_designers';
import { getAllBrands } from '../data/get_all_brands';
import { getTopModels } from '../data/get_top_models';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Home() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  // ---- intial staters ---- //

  const getModelStatus = useSelector((state: any) => state?.get_all_models?.status);
  const getInteriorsStatus = useSelector((state: any) => state?.get_all_interiors?.status);

  React.useEffect(() => {
    dispatch(getAllInteriors({}))
    dispatch(getAllModels({}))
    dispatch(getTopModels({}))
    // dispatch(getAllDesigners({}))
    // dispatch(getAllBrands({}))
  }, [])

  return (
    <>
      <section style={{ background: "#fafafa" }}>
        <LandingPage />
      </section>
    </>
  )
}
