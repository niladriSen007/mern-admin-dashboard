import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { useAuthStore } from "../../store/store"
import { useUserDataFetch } from "../../hooks"

const RootLayout = () => {
  const { setUserData } = useAuthStore()
  const { data } = useUserDataFetch(false)

  useEffect(() => {
    if (data) setUserData(data?.data)
  }, [data, setUserData])

  return <Outlet />
}
export default RootLayout
