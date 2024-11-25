import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store/store"
const AuthLayout = () => {
  
  const { user } = useAuthStore()
  if (!user) return <Navigate to="/unauth/login" replace={true} />

  return (
    <>
      <Outlet />
    </>
  )
}
export default AuthLayout
