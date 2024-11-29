import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createUser, registerAdmin } from "../http/apiCalls"
import { CreateUserDataProps } from "./types"

export const useCreateUser = () => {

  const queryClient = useQueryClient()
  const {mutate : createUserMutation} = useMutation({
    mutationKey: ["createUser"],
    mutationFn: async(userData:CreateUserDataProps) => userData?.role === "ADMIN" ? await registerAdmin(userData) : await createUser(userData),
    onSuccess:() =>{
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
      })
      console.log("User created successfully")
    },
    onError:(error) =>{
      console.error(error)
    }
  })

  return {
    createUserMutation
  }
}