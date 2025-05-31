// 24px, 24px, 32px, 24px
import styles from "@/styles/main.module.scss";
import { Close, DoneAll, Sync } from "@mui/icons-material";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationCounts,
  getNotifications,
  selectNotificationCounts,
  selectNotifications,
  selectNotificationsStatus,
} from "../../data/get_notifications";
import { switch_on } from "../../data/toggle_cart";
import { notificationActionMessages } from "../../types/variables";
import instance from "../../utils/axios";
import { IMAGES_BASE_URL } from "../../utils/env_vars";
import formatDate from "../../utils/format_date";
import { CustomTooltip } from "../tooltip";
import EmptyData from "../views/empty_data";

const ContainerStyle = {
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  maxWidth: "1200px",
  alignItems: "center",
};

const BgBlur = {
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
};

const LoaderStyle = {
  zIndex: "10",
  position: "relative",
};

const CheckoutBar = () => {
  const dispatch = useDispatch<any>();
  const isAuthenticated = useSelector(
    (state: any) => state?.auth_slicer?.authState
  );
  const notifications_status = useSelector(selectNotificationsStatus);
  const notificationsData = useSelector(selectNotifications);
  const notificationCounts = useSelector(selectNotificationCounts);
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [pagination, setPagination] = React.useState<any>();
  const [allSeen, setAllSeen] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetchInitial();
  }, [isAuthenticated, dispatch]);

  function fetchInitial() {
    if (isAuthenticated) {
      dispatch(getNotifications());
    }
  }

  React.useEffect(() => {
    if (notificationsData) {
      let fetched: any[] = [];
      setNotifications((prevNotifications) => {
        const existingIds = new Set(prevNotifications.map((ntf) => ntf.id));
        fetched = notificationsData.data.notifications.filter(
          (ntf) => !existingIds.has(ntf.id)
        );
        return [...prevNotifications, ...fetched];
      });
      markAsSeenVisible(fetched.map((e) => e.id));
      setPagination(notificationsData?.data?.pagination);
    }
  }, [notificationsData]);

  const markAsSeenVisible = async (arr) => {
    try {
      const res = await instance.put(`/notifications`, { notifications: arr });
      if (res?.data?.success) {
        dispatch(getNotificationCounts());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const markAsSeenAll = async () => {
    try {
      const res = await instance.put(`/notifications/all`);
      if (res?.data?.success) {
        setAllSeen(true);
      }
      dispatch(getNotificationCounts());
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoreNotifications = async () => {
    if (pagination?.next) {
      const nextPage = pagination.next + 1;
      try {
        const res = await instance.get(
          `/notifications/?limit=${pagination?.limit}&page=${nextPage}`
        );
        if (res?.data?.success) {
          let fetched: any[] = [];
          setNotifications((prevNotifications) => {
            const existingIds = new Set(prevNotifications.map((ntf) => ntf.id));
            fetched = res.data.data.notifications.filter(
              (ntf) => !existingIds.has(ntf.id)
            );
            return [...prevNotifications, ...fetched];
          });
          setHasMore(res.data.data.pagination.next !== null);
          setPagination(res.data.data.pagination);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  };

  const closeRightBar = () => {
    dispatch(switch_on(false));
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: "24px 18px 32px 18px",
        marginBottom: "10px",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
        width: { lg: "500px", md: "500px", sm: "65vw", xs: "85vw" },
        height: "100%",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: { lg: "30px", md: "30px", sm: "24px", xs: "22px" },
              display: "inline-block",
            }}
          >
            Уведомления
            <Typography
              sx={{
                fontSize: { lg: "26px", md: "26px", sm: "20px", xs: "18px" },
                display: "inline-block",
                color: "#686868",
              }}
            >
              (
              {`${
                notifications_status === "succeeded"
                  ? notificationCounts?.data?.unread_count ?? "0"
                  : "0"
              }`}
              )
            </Typography>
          </Typography>

          <Box>
            <CustomTooltip sx={{ zIndex: 1111111 }} title={"Обновить"}>
              <IconButton onClick={fetchInitial}>
                <Sync />
              </IconButton>
            </CustomTooltip>

            <CustomTooltip
              sx={{ zIndex: 1111111 }}
              title={"Oтметить все как прочитанное"}
            >
              <IconButton onClick={markAsSeenAll}>
                <DoneAll />
              </IconButton>
            </CustomTooltip>
          </Box>
        </Box>

        <Divider sx={{ mt: "10px", width: "100%" }} />

        {notifications_status === "succeeded" ? (
          <Box className={styles.hidden_scrollbar}>
            {notifications.length > 0 ? (
              <Box
                id="notifications_scroll_box"
                className={styles.hidden_scrollbar}
                sx={{
                  zIndex: 11120,
                  mt: "20px",
                  height: "87dvh",
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    width: 0,
                  },
                }}
              >
                <InfiniteScroll
                  className={styles.hidden_scrollbar}
                  style={{
                    padding: "0 6px",
                  }}
                  scrollThreshold={1}
                  scrollableTarget="notifications_scroll_box"
                  dataLength={notifications.length}
                  next={fetchMoreNotifications}
                  hasMore={hasMore}
                  loader={
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      Уведомлений больше нет
                    </p>
                  }
                  refreshFunction={() => {
                    dispatch(getNotifications());
                  }}
                  pullDownToRefresh
                  pullDownToRefreshThreshold={50}
                  pullDownToRefreshContent={
                    <h3 style={{ textAlign: "center" }}>
                      &#8595; Потяните вниз, чтобы обновить
                    </h3>
                  }
                  releaseToRefreshContent={
                    <h3 style={{ textAlign: "center" }}>
                      &#8593; Отпустите, чтобы обновить
                    </h3>
                  }
                >
                  {!!notifications &&
                    !!notifications.length &&
                    notifications.map((ntf, index) => (
                      <Grid
                        key={ntf.id}
                        item
                        xs={12}
                        sx={{
                          p: "12px 10px 20px 10px",
                          my: "6px",
                          position: "relative",
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          borderRadius: "4px",
                          bgcolor: !!ntf?.seen || allSeen ? "#fafafa" : "#fff",
                          boxShadow: `0px 1px 2px ${
                            !!ntf?.seen || allSeen ? "0px" : "1px"
                          } rgba(0, 0, 0, 0.1)`,
                        }}
                      >
                        <LazyLoadImage
                          src={
                            ntf?.notifier?.image_src
                              ? `${IMAGES_BASE_URL}/${ntf?.notifier?.image_src}`
                              : "/img/avatar.png"
                          }
                          alt="image"
                          effect="blur"
                          width={46}
                          height={46}
                          placeholderSrc="/img/avatar.png"
                          delayTime={500}
                          style={{
                            objectFit: "cover",
                            borderRadius: "23px",
                          }}
                        />

                        <Box
                          sx={{
                            width: "84%",
                            mx: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            "& > p": { width: "100%" },
                          }}
                        >
                          <p
                            style={{
                              marginBottom: ntf?.message ? 0 : "8px",
                              marginTop: "8px",
                              fontSize: "14px",
                            }}
                          >
                            <Link
                              href={`/designers/${ntf?.notifier?.username}`}
                              passHref
                              onClick={closeRightBar}
                              className={styles.bold_link_hover}
                            >
                              {ntf?.notifier?.full_name}
                            </Link>
                            {notificationActionMessages[ntf?.action_id]}
                            {ntf?.product && (
                              <Link
                                href={`/${ntf.product.entity}/${ntf.product.slug}`}
                                passHref
                                onClick={closeRightBar}
                                className={styles.bold_link_hover}
                              >
                                {`${ntf?.product?.name}${
                                  ntf.action_id == "new_interior_comment"
                                    ? ": "
                                    : ""
                                }`}
                              </Link>
                            )}
                            {!!ntf?.message && (
                              <span>
                                "
                                {ntf?.message?.length > 32
                                  ? ntf?.message?.slice(0, 32) + "..."
                                  : ntf?.message}
                                "
                              </span>
                            )}
                          </p>
                        </Box>

                        <IconButton
                          className="mark_read_btn"
                          onClick={() => "handle mark as read"}
                          sx={{
                            opacity: 0,
                            pointerEvents: "none",
                            transition: "all 0.4s ease",
                            top: 1,
                            right: 1,
                            position: "absolute",
                          }}
                        >
                          <Close />
                        </IconButton>

                        <Typography
                          sx={{
                            bottom: 1,
                            right: 6,
                            position: "absolute",
                            fontSize: "12px",
                            fontWeight: "400",
                            color: "#b6b6b6",
                          }}
                        >
                          {formatDate(ntf?.created_at, true)}
                        </Typography>
                      </Grid>
                    ))}
                </InfiniteScroll>
              </Box>
            ) : (
              <Box>
                <EmptyData
                  text="Нет уведомлений"
                  boxShadow={false}
                  border={false}
                />
              </Box>
            )}
          </Box>
        ) : (
          <>
            <Box sx={BgBlur} />
            <Box>
              <Box sx={ContainerStyle}>
                <CircularProgress sx={LoaderStyle} />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
export default CheckoutBar;
