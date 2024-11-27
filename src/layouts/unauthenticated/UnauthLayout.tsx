import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store/store"
import { memo } from "react"

const UnauthLayout = memo(() => {
  const { user } = useAuthStore()
  if (user) return <Navigate to="/" replace={true} />
  return <Outlet />
})
export default UnauthLayout
