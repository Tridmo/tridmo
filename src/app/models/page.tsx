"use client"

import React, { Suspense } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels, selectAllModels } from '@/data/get_all_models';
import { getAllColors, selectAllColors } from '@/data/get_all_colors';
import { getAllStyles } from '@/data/get_all_styles';
import ProductCrumb from '@/components/breadcrumbs/model_crumb';
import { searchModels } from '@/data/search_model';
import ModelsPage from '@/components/screens/models';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Models() {
  return (
    <>
      <section style={{ background: "#fafafa" }}>
        <Suspense>
          <ModelsPage />
        </Suspense>
      </section>
    </>
  )
}
