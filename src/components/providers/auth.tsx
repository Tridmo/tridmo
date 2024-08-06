import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "../../data/login";
import { getUpdatedAccessToken } from '../../data/re-update_access_token'
// import Cookies from 'js-cookie'
import Cookies from 'js-cookie'
const AuthContext = createContext({});
import { getMyProfile, selectMyProfile } from '../../data/me';
import { getChatToken, selectChatToken } from "../../data/get_chat_token";
import { setAuthToken } from "../../utils/axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import useHash from "../hooks/use_hash";
import { toast } from "react-toastify";

import { getProfile } from '../../data/get_profile'
import { setLoginState, setOpenModal, setVerifyState, setWarningMessage, setWarningState } from '../../data/modal_checker'
import { getSetVerified } from '../../data/set_verified'
import { getMyInteriors } from '../../data/get_my_interiors'
import { getSavedModels } from '../../data/get_saved_models'
import { myInteriorsLimit, projectsLimit, savedModelsLimit } from '../../types/filters'
import { getMyProjects } from '../../data/get_my_projects'
import { accountBannedMessage } from "../../variables";
import { tokenFactory } from "../../utils/chat";
import { getNotifications, selectNotificationsStatus } from "../../data/get_notifications";


export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch<any>();
  const update_cookie_status = useSelector((state: any) => state?.update_access_token?.status);
  const myProfile = useSelector(selectMyProfile)
  const myProfileStatus = useSelector((state: any) => state?.profile_me?.status)
  const myProfileError = useSelector((state: any) => state?.profile_me?.error)
  const tokenStatus = useSelector((state: any) => state?.get_chat_token?.status)
  const chatToken = useSelector(selectChatToken)
  const notifications_status = useSelector(selectNotificationsStatus);

  const pathname = usePathname()
  const router = useRouter();
  const params = useParams();
  const hash = useHash();

  const handleLogout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('chatToken')
    dispatch(setAuthState(false))
    router.push(pathname)
    router.refresh();
  }

  useEffect(() => {
    if (myProfile) {
      if (notifications_status === 'idle') {
        dispatch(getNotifications());
      }
    }
  }, [myProfile, notifications_status]);


  useEffect(() => {
    async function loadUserFromCookies() {

      if (Cookies.get('accessToken')) {
        setAuthToken(Cookies.get('accessToken'))

        if (myProfileStatus === 'idle' && !myProfile) {
          await dispatch(getMyProfile({}))
        }
        if (myProfile && (!Cookies.get('chatToken') || !chatToken)) {
          dispatch(getChatToken())
          await tokenFactory()
        }
        if (myProfileStatus === 'failed') {
          if (myProfileError) {
            if (myProfileError?.reason == 'token_expired') {
              handleLogout()
              dispatch(setLoginState(true))
              dispatch(setOpenModal(true))
            }
            if (myProfileError?.reason == 'banned') {
              handleLogout()
              dispatch(setWarningMessage(accountBannedMessage))
              dispatch(setWarningState(true))
              dispatch(setOpenModal(true))
            }
          }
          dispatch(setAuthState(false));
        }

        dispatch(setAuthState(true));
      }

      // if (Cookies.get('refreshToken')) {
      //   if (update_cookie_status === "idle" && !Cookies.get('accessToken')) {
      //     dispatch(getUpdatedAccessToken())
      //     if (update_cookie_status === 'succeeded') {
      //       dispatch(setAuthState(true));

      //       if (myProfileStatus === 'idle') {
      //         await dispatch(getMyProfile({}))
      //       }

      //     }
      //   }
      // } else {
      //   dispatch(setAuthState(false));
      // }
    }
    loadUserFromCookies();
  }, [myProfile, Cookies, myProfileStatus]);

  useEffect(() => {
    if (hash) {
      const hashParams = new URLSearchParams(hash.slice(1))

      const accessToken = hashParams.get('access_token')
      const refreshToken = hashParams.get('refresh_token')
      const expiresAt = hashParams.get('expires_at');
      const expiresIn = hashParams.get('expires_in');


      if (accessToken && refreshToken && expiresAt) {
        Cookies.set(
          'accessToken',
          accessToken,
          { expires: new Date(parseInt(expiresAt) * 1000), path: '/', sameSite: 'Lax', secure: true },
        )

        Cookies.set(
          'refreshToken',
          refreshToken,
          { path: '/', sameSite: 'Lax', secure: true }
        )

        const x = setTimeout(() => {
          dispatch(getProfile({ Authorization: `Bearer ${accessToken}` }))
          dispatch(getMyInteriors({ Authorization: `Bearer ${accessToken}`, limit: myInteriorsLimit }))
          dispatch(getMyProjects({ Authorization: `Bearer ${accessToken}`, limit: projectsLimit }))
          dispatch(getSavedModels({ Authorization: `Bearer ${accessToken}`, limit: savedModelsLimit }))
          router.replace('/');
          toast.success("Электронная почта успешно подтверждена");
          dispatch(setAuthState(true))
          dispatch(setVerifyState(false))
          dispatch(getSetVerified({ Authorization: `Bearer ${accessToken}` }))
          clearTimeout(x)
        }, 10)
      }
      else {
        const x = setTimeout(() => {
          toast.error("Не удалось подтвердить электронную почту! Пожалуйста, попробуйте еще раз");
          router.push('/');
          clearTimeout(x)
        }, 0)
      }
    }
    if (pathname && pathname.includes("unauthorized_client")) {
      setTimeout(() => {
        toast.error("Не удалось подтвердить электронную почту! Пожалуйста, попробуйте еще раз");
        router.push('/');
      }, 0)
    }
  }, [router, dispatch, params, hash])

  return (
    <AuthContext.Provider
      value={{}}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
