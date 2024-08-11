'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import useHash from '../hooks/use_hash'
import { getAllModels } from '../../data/get_all_models'
import { getAllInteriors } from '../../data/get_all_interiors'
import { getAllStyles } from '../../data/get_all_styles'
import Cookies from 'js-cookie'
import { getProfile, resetMyProfile } from '../../data/get_profile'
import { toast } from 'react-toastify'
import { setAuthState } from '../../data/login'
import { setVerifyState } from '../../data/modal_checker'
import { getAllDesigners } from '../../data/get_all_designers'
import { getAllBrands } from '../../data/get_all_brands'
import { setCategoryFilter, setCategoryNameFilter, setColorFilter, setStyleFilter, setPageFilter, } from '../../data/handle_filters'
import { getSetVerified } from '../../data/set_verified'
import { getMyInteriors } from '../../data/get_my_interiors'
import { getSavedInteriors } from '../../data/get_saved_interiors'
import { getSavedModels } from '../../data/get_saved_models'
import { myInteriorsLimit, projectsLimit, savedModelsLimit } from '../../types/filters'
import { getMyProjects } from '../../data/get_my_projects'
import { getNotificationCounts } from '../../data/get_notifications'

const NavigationContext = createContext({})

export function NavigationEvents() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getNotificationCounts())
  }, [])

  return (
    <NavigationContext.Provider value={{}} />
  )
}

export const useNavigation = () => useContext(NavigationContext);
