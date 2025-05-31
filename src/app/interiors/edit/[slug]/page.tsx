"use client"

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import EditInterior from "../../../../components/screens/interiors/edit";
import { getInteriorCategories } from "../../../../data/categories";
import { getAllStyles } from "../../../../data/get_all_styles";
import { getOneInterior } from "../../../../data/get_one_interior";

export default function EditInteriorPage() {
  const dispatch = useDispatch<any>();
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
