import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../http/apiCalls"
import { UpdateUserDataProps } from "./types"

export const useUpdateUser = (userId : number) => {
  const queryClient = useQueryClient()
  const { mutate: updateUserMutation } = useMutation({
    mutationKey: ["updateUser", userId],
    mutationFn: async (userData: UpdateUserDataProps) =>
      await updateUser(userData,userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      })
      console.log("User updated successfully")
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    updateUserMutation,
  }
}