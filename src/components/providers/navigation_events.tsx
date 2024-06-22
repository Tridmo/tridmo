'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getAllModels } from '../../data/get_all_models'
import { getAllInteriors } from '../../data/get_all_interiors'
import { getAllStyles } from '../../data/get_all_styles'
import Cookies from 'js-cookie'
import { getProfile, resetMyProfile } from '../../data/get_profile'
import { toast } from 'react-toastify'
import { setAuthState } from '../../data/login'
import { setVerifyState } from '../../data/modal_checker'
import useHash from '../hooks/use_hash'
import { getAllDesigners } from '../../data/get_all_designers'
import { getAllBrands } from '../../data/get_all_brands'
import { setCategoryFilter, setCategoryNameFilter, setColorFilter, setStyleFilter, setPageFilter, } from '../../data/handle_filters'
import { getSetVerified } from '../../data/set_verified'

const NavigationContext = createContext({})

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const params = useParams();
  const hash = useHash();


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
  }, [router, dispatch, params])

  return (
    <NavigationContext.Provider value={{}} />
  )
}

export const useNavigation = () => useContext(NavigationContext);
