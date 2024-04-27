
// 24px, 24px, 32px, 24px
import * as React from 'react'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image'
import { switch_on } from '../../data/toggle_cart';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import axios from '../../utils/axios'
import Cookies from 'js-cookie'
import { ErrorOutlineSharp } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
// import { reset, selectGetOrders } from '../../data/get_orders';
import { refreshModel } from '../../data/handle_filters'
import { resetOneModel } from '../../data/get_one_model';
import SimpleTypography from '../typography';
import { toast } from 'react-toastify';
import { resetOneInterior } from '../../data/get_one_interior'
import { selectOneModel } from '../../data/get_one_model';
import { selectOneInterior } from '../../data/get_one_interior';
import Buttons from '../buttons';
import EmptyData from '../views/empty_data';
import { getNotifications, selectNotifications } from '../../data/get_notifications';
const notifications = [
  {
    img: "/img/fake-model-img.png",
    title: "Black kids’ bed",
    desc: "Classic, Natuzzi",
    price: "$3.50",
  },
  {
    img: "/img/fake-model-img.png",
    title: "Black kids’ bed",
    desc: "Classic, Natuzzi",
    price: "$3.50",
  },
  {
    img: "/img/fake-model-img.png",
    title: "Black kids’ bed",
    desc: "Classic, Natuzzi",
    price: "$3.50",
  },
  {
    img: "/img/fake-model-img.png",
    title: "Black kids’ bed",
    desc: "Classic, Natuzzi",
    price: "$3.50",
  },
  {
    img: "/img/fake-model-img.png",
    title: "Black kids’ bed",
    desc: "Classic, Natuzzi",
    price: "$3.50",
  },
  {
    img: "/img/fake-model-img.png",
    title: "Black kids’ bed",
    desc: "Classic, Natuzzi",
    price: "$3.50",
  },
  {
    img: "/img/fake-model-img.png",
    title: "Black kids’ bed",
    desc: "Classic, Natuzzi",
    price: "$3.50",
  },
  {
    img: "/img/fake-model-img.png",
    title: "Black kids’ bed",
    desc: "Classic, Natuzzi",
    price: "$3.50",
  },
]

const ContainerStyle = {
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  maxWidth: "1200px",
  alignItems: "center",
}

const BgBlur = {
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  // background: "#fff",
  // filter: "blur(2px)"
}

const LoaderStyle = {
  // width: "100px !important",
  // height: "100px !important",
  zIndex: "10",
  position: "relative"
}


const CheckoutBar = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const notifications_status = useSelector((state: any) => state?.get_notifications?.status)
  const notifications = useSelector(selectNotifications)
  const [deleteItem, setDeleteItem] = React.useState({ status: false, model_id: null })

  React.useEffect(() => {
    if (notifications_status == 'idle') {
      dispatch(getNotifications())
    }
  }, [notifications_status])

  const closeRightBar = () => {
    dispatch(switch_on(false))
  }

  if (notifications_status === "succeeded") {
    return (
      <Box
        sx={{
          display: "flex",
          padding: "24px 24px 32px 24px",
          marginBottom: "10px",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          width: "100%",
          //  gap: "16px",
          height: "100%"
        }}
      >
        <Box sx={{ height: "0" }}>
          <Typography
            component="h3"
            sx={{
              fontSize: "30px",
              display: "inline-block",
            }}
          >Уведомления <Typography sx={{ fontSize: "30px", display: "inline-block", color: "#686868" }}>({`${notifications?.items?.length && notifications?.items[0] != null ? notifications?.items?.length : "0"}`})</Typography>
          </Typography>

          <Divider
            sx={{
              mt: "10px",
              width: "100%",
            }}
          />

          {/* Map every single model */}
          <Box >
            {notifications?.items[0] ? (
              <Box
                className='bar'
                sx={{
                  zIndex: "90",
                  mt: "20px",
                  overflowY: "scroll",
                  '&::-webkit-scrollbar': {
                    width: 0,
                  }
                }}
              >
                <Grid container>
                  {notifications?.items?.map((model: any, index: number) => (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      sx={{
                        p: "4px",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        borderRadius: "4px",
                        border: "1px solid #E0E0E0",
                        marginBottom: "16px",
                        '&:hover .MuiTypography-badge__title': {
                          color: "#7210BE"
                        },
                        '&:hover': {
                          border: "1px solid #B3B3B3",
                        }
                      }}
                    >
                      <Image
                        src={model?.product?.cover[0]?.image?.src}
                        width={80}
                        height={80}
                        // layout='fill'
                        objectFit='contain'
                        alt="Model card"
                      />

                      <Box
                        sx={{
                          mx: "10px",
                          width: "134px",
                          '&:hover': {
                            cursor: "pointer",
                          }
                        }}
                        onClick={() => {
                          dispatch(resetOneModel());
                          dispatch(switch_on(false))
                          if (model?.product?.model_id) {
                            router.push(`/products/${model?.product?.slug}`);
                          }
                          if (model?.product?.interior_id) {
                            router.push(`/interiors/${model?.product?.slug}`);
                          }
                        }}
                      >
                        <SimpleTypography text='' className='badge__title'>
                          {model?.product?.title}
                        </SimpleTypography>
                        <Typography sx={{ fontSize: "14px", color: "#686868" }}>
                          {model?.product?.style?.name}, {model?.product?.brand?.name}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: "500",
                          pr: "8px",
                          color: "#222",
                          borderRight: "1px solid #B3B3B3"
                        }}
                      >${model?.cost_amount}.00</Typography>

                      <Box sx={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: 'center',
                        "&:hover": {
                          background: "#F5F5F5",
                          cursor: "pointer",
                        },
                        ml: "10px",
                        width: "36px",
                        height: "36px",
                      }}
                      >

                        {
                          (deleteItem.status || notifications_status !== "succeeded") && (model?.id === deleteItem?.model_id) ?
                            <CircularProgress size="20px" /> :
                            <Image
                              src={"/img/delete-bin-line.svg"}
                              style={{ marginLeft: "20px", padding: "9.67px" }}
                              width={24}
                              height={24}
                              alt="Model card"
                            />
                        }
                      </Box>
                    </Grid>
                  ))
                  }

                </Grid>

                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: "40px",
                    mt: "24px",
                    padding: "9px 20px 9px 20px",
                    color: "#303030",
                    border: "1.7px solid #B3B3B3",
                    borderRadius: "4px",
                    '&:hover': {
                      border: "1.7px solid #7c7878",
                    }
                  }}
                  onClick={closeRightBar}
                ><ChevronLeftIcon /> Continue shopping</Button>

              </Box>
            ) : (
              <Box
                sx={{
                  margin: "36px 96px"
                }}
              >
                <EmptyData text='Нет уведомлений' boxShadow={false} border={false} />

              </Box>
            )}
          </Box>

        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        padding: "24px 24px 32px 24px",
        marginBottom: "10px",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
        width: "445px",
        //  gap: "16px",
        height: "100%"
      }}
    >
      <Box sx={{ height: "0" }}>
        <Typography
          component="h3"
          sx={{
            fontSize: "30px",
            display: "inline-block",
          }}
        >Уведомления <Typography
          sx={{
            fontSize: "30px",
            display: "inline-block",
            color: "#686868"
          }}>(
            {`0`}
            )</Typography>
        </Typography>

        <Divider
          sx={{
            mt: "10px",
            width: "100%",
          }}
        />

        {/* Map every single model */}

      </Box>
      <Box sx={BgBlur} />
      <Box>
        <Box sx={ContainerStyle}>
          <CircularProgress sx={LoaderStyle} />
        </Box>
      </Box>
    </Box>
  )
}
export default CheckoutBar