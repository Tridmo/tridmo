import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectBrandsForLandingPage } from "../../../../data/get_all_brands";
import { selectDesignersForLandingPage } from "../../../../data/get_all_designers";
import { IMAGES_BASE_URL } from "../../../../utils/env_vars";
import InfiniteLinearCarousel from "../../../carousel/infinite_linear_carousel";

export function MorePagesSection() {
  const brands = useSelector(selectBrandsForLandingPage);
  const designers = useSelector(selectDesignersForLandingPage);
  const router = useRouter();
  return (
    <Grid container width={"100%"} justifyContent="space-between" gap={1}>
      <Grid
        onClick={() => router.push("/designers")}
        item
        xs={12}
        sm={12}
        md={5.9}
        lg={5.95}
        xl={5.95}
        sx={{ cursor: "pointer" }}
      >
        <InfiniteLinearCarousel
          title="Дизайнеры"
          speed={80}
          cardStyle={
            !designers
              ? {
                  height: 148,
                  border: "none",
                  padding: "0",
                }
              : {
                  height: 148,
                }
          }
          logoStyle={{ width: 100, height: 100 }}
          items={designers?.map((designer) => {
            // const [firstName, lastName] = (designer?.full_name as string)?.trim()?.split(' ')
            return {
              name: designer?.company_name,
              link: `/designers`,
              logo: designer?.image_src
                ? `${IMAGES_BASE_URL}/${designer?.image_src}`
                : `https://ui-avatars.com/api/?name=${designer?.company_name}&background=0D8ABC&color=fff&size=100`,
            };
          })}
        />
      </Grid>

      <Grid
        onClick={() => router.push("/brands")}
        item
        xs={12}
        sm={12}
        md={5.9}
        lg={5.95}
        xl={5.95}
        sx={{ cursor: "pointer" }}
      >
        <InfiniteLinearCarousel
          title="Бренды"
          showNames={false}
          cardStyle={{
            height: 148,
            border: "none",
            padding: "0",
          }}
          logoStyle={{
            width: 148,
            height: 148,
            borderRadius: "12px",
          }}
          items={
            brands
              ? brands?.map((brand) => ({
                  name: brand?.name,
                  link: `/brands`,
                  logo: `${IMAGES_BASE_URL}/${brand?.image_src}`,
                }))
              : []
          }
        />
      </Grid>
    </Grid>
  );
}
