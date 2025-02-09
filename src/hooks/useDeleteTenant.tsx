import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTenant } from "../http/apiCalls"

export const useDeleteTenant = (tenantId : number) => {
  const queryClient = useQueryClient()
  const { mutate: deleteTenantMutation } = useMutation({
    mutationKey: ["deleteTenant", tenantId],
    mutationFn: async () =>
      await deleteTenant(tenantId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTenants"],
      })
      //console.log("Tenant deleted successfully")
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    deleteTenantMutation,
  }
}