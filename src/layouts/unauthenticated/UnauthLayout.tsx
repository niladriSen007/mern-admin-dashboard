import { memo } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "../../store/store"

const UnauthLayout = memo(() => {
  const location = useLocation()
  const { user } = useAuthStore()
  if (user) {
    const returnTo = new URLSearchParams(location.search).get("returnTo") ?? "/"
    return <Navigate to={returnTo} replace={true} />
  }
  return <Outlet />
})
export default UnauthLayout
