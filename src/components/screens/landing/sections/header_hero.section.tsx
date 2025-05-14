import { Box, Grid, Skeleton } from "@mui/material";
import SimpleTypography from "../../../typography";
import StatsCard from "../../../stats_card";
import SearchInput from "../../../inputs/search";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectTopModels } from "../../../../data/get_top_models";
import { setModelNameFilter } from "../../../../data/handle_filters";
import { getAllModels } from "../../../../data/get_all_models";
import { Carousel } from "../../../custom_card/carousel";

export function HeaderHeroSection() {

  const router = useRouter();
  const dispatch = useDispatch<any>();
  const [searchVal, setSearchVal] = useState("");
  const topModels = useSelector(selectTopModels);

  function handleSearch(e) {
    e.preventDefault();
    dispatch(setModelNameFilter(searchVal));
    const newUrl = `/models/?name=${searchVal}`;
    router.push(newUrl);
    dispatch(
      getAllModels({
        name: searchVal,
      })
    );
  }


  return (
    <Grid
      spacing={2}
      container
      columns={{ xs: 1, sm: 2 }}
      sx={{
        marginLeft: 0,
        alignItems: "center",
        justifyContent: { xs: 'center', sm: 'center', md: 'space-between', lg: 'space-between' },
      }}
    >
      <Grid width={{ xs: "100%", sm: "100%", md: 'unset', lg: 'unset' }}
        margin={{ xs: 'auto', sm: 'auto', md: 0, lg: 0 }}
        sx={{ display: 'felx', justifyContent: { sm: 'center', md: 'flex-start' } }}
      >
        <Box
          my={4}
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={{ xs: 'center', sm: 'center', md: 'flex-start', lg: 'flex-start' }}
        >
          <SimpleTypography
            text="Теперь дизайн не только на бумаге."
            className="hero__title"
            variant={"h1"}
            sx={{
              margin: { xs: '0 auto 16px auto !important', sm: '0 auto 16px auto !important', md: '0 0 16px 0 !important', lg: '0 0 16px 0 !important' },
              textAlign: { xs: 'center', sm: 'center', md: 'start', lg: 'start' }
            }}
          />
          <SimpleTypography
            text="Единственная площадка для дизайнеров и производителей мебели в Узбекистане."
            className="hero__desc"
            sx={{ textAlign: { xs: 'center', sm: 'center', md: 'start', lg: 'start' }, m: '0 !important' }}
          />
          <StatsCard />
          <Box mt="18px" width={{ xs: "80%", sm: '60%', md: "60%" }}
            display={'flex'}
            justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start', lg: 'flex-start' }}
          >
            <form style={{ width: '100%' }} onSubmit={handleSearch}>
              <SearchInput
                sx={{
                  width: "100%",
                  p: "12px 14px",
                  background: '#fff'
                }}
                startIcon={true}
                withButton={true}
                onChange={setSearchVal}
                placeHolder="Поиск моделей"
              />
            </form>
          </Box>
        </Box>
      </Grid>
      <Grid
        display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }}
        width={"auto"}
        margin={{ xs: "auto", lg: "0px 44px 0px 0px" }}
      >
        {topModels && topModels?.data?.models?.length ? (
          <Carousel
            slides={topModels?.data?.models}
            speed={5000}
            slideWidth={354}
            slideHeight={396}
            manualMode={false}
            autoScroll
          />
        ) : (
          <Skeleton variant="rectangular" width={322} height={322} />
        )}
      </Grid>
    </Grid>
  )
}