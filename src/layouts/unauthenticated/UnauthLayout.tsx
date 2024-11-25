import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store/store"

const UnauthLayout = () => {
  const { user } = useAuthStore()
  if (user) return <Navigate to="/" replace={true} />
  return <Outlet />
}
export default UnauthLayout
