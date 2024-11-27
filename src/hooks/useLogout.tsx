import { useMutation } from "@tanstack/react-query"
import { logoutUser } from "../http/apiCalls"
import { useAuthStore } from "../store/store"

export const useLogout = () => {
  const { logout: logoutUserDataFromStore } = useAuthStore()
  const { mutate: userLogoutMutation } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,
    onSuccess: () => {
      logoutUserDataFromStore()
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    userLogoutMutation,
  }
}
