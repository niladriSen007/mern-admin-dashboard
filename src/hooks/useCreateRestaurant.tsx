import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateRestaurantDataProps } from "./types"
import { createRestaurant } from "../http/apiCalls"

export const useCreateRestaurant = () => {
  
  const queryClient = useQueryClient()
  const {mutate : createRestaurantMutation} = useMutation({
    mutationKey: ["createUser"],
    mutationFn: async(restaurantData:CreateRestaurantDataProps) => await createRestaurant(restaurantData),
    onSuccess:() =>{
      queryClient.invalidateQueries({
        queryKey: ["allTenants"],
      })
      console.log("User created successfully")
    },
    onError:(error) =>{
      console.error(error)
    }
  })

  return {
    createRestaurantMutation
  }
}