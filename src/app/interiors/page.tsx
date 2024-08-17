"use client"

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getAllStyles } from '@/data/get_all_styles';
import { getAllInteriors } from '@/data/get_all_interiors';
import InteriorsPage from '../../components/screens/interiors';
import { interiorsLimit } from '../../types/filters';

declare global {
  interface Window {
    tc: any; // whatever type you want to give. (any,number,float etc)
  }
}

export default function Interiors() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const searchParams = useSearchParams()

  return (
    <>
      <section style={{ background: "#fafafa" }}>
        <Suspense>
          <InteriorsPage />
        </Suspense>
      </section>
    </>
  )
}
