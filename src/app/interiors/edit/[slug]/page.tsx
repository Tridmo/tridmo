"use client"

import AddInterior from "@/components/screens/interiors/add_new";
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStyles } from '../../../../data/get_all_styles';
import { getInteriorCategories } from '../../../../data/categories';
import { notFound, useParams } from 'next/navigation';
import { getOneInterior } from "../../../../data/get_one_interior";
import EditInterior from "../../../../components/screens/interiors/edit";

export default function EditInteriorPage() {
  const dispatch = useDispatch<any>()
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const stylesData__status = useSelector((state: any) => state?.get_all_styles.status);
  const categoriesDate__status = useSelector((state: any) => state?.categories?.interior_status)
  const params = useParams<{ slug: string }>();

  useEffect(() => {
    dispatch(getOneInterior(params.slug))
  }, [params])

  useEffect(() => {
    if (stylesData__status == 'idle') {
      dispatch(getAllStyles())
    }
    if (categoriesDate__status == 'idle') {
      dispatch(getInteriorCategories())
    }
  }, [stylesData__status, categoriesDate__status, dispatch])

  return (
    <section style={{ background: "#fafafa" }}>
      <EditInterior />
    </section>
  );
}
