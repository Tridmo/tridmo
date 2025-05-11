"use client"

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStyles } from '@/data/get_all_styles';
import { getAllInteriors } from '@/data/get_all_interiors';
import LandingPage from '../components/screens/landing';
import { getAllModels } from '../data/get_all_models';
import { getAllDesigners, getDesignersForLandingPage } from '../data/get_all_designers';
import { getAllBrands, getBrandsForLandingPage } from '../data/get_all_brands';
import { getTopModels } from '../data/get_top_models';
import { getLandingModels, getLandingTopModels } from '../data/get_landingpage_models';
import { getMainStats } from '@/data/get_main_stats';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Home() {
  const dispatch = useDispatch<any>();
  const router = useRouter();



  React.useEffect(() => {
    dispatch(getTopModels())
    dispatch(getAllInteriors({}))
    dispatch(getLandingTopModels())
    dispatch(getLandingModels())
    dispatch(getDesignersForLandingPage())
    dispatch(getBrandsForLandingPage({ orderBy: 'models_count' }))
    dispatch(getMainStats())
  }, [])

  return (
    <>
      <section style={{ background: "#fafafa" }}>
        <LandingPage />
      </section>
    </>
  )
}
