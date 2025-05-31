"use client"

import AddInterior from "@/components/screens/interiors/add_new";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInteriorCategories } from "../../../data/categories";
import { getAllStyles } from "../../../data/get_all_styles";

export default function NewInterior() {
  const dispatch = useDispatch<any>();
  const stylesData__status = useSelector(
    (state: any) => state?.get_all_styles.status
  );
  const categoriesDate__status = useSelector(
    (state: any) => state?.categories?.interior_status
  );

  useEffect(() => {
    if (stylesData__status == "idle") {
      dispatch(getAllStyles());
    }
    if (categoriesDate__status == "idle") {
      dispatch(getInteriorCategories());
    }
  }, [stylesData__status, categoriesDate__status, dispatch]);

  return (
    <section style={{ background: "#fafafa" }}>
      <AddInterior />
    </section>
  );
}
