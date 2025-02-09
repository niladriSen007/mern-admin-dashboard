import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "../http/apiCalls"

export const useDeleteUser = (userId : number) => {
  const queryClient = useQueryClient()
  const { mutate: deleteUserMutation } = useMutation({
    mutationKey: ["deleteUser", userId],
    mutationFn: async () =>
      await deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      })
      //console.log("User deleted successfully")
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    deleteUserMutation,
  }
}