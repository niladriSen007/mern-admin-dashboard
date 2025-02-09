import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TenantDataType } from "../pages/users/types"
import { updateTenant } from "../http/apiCalls"

export const useUpdateTenant = (tenantId : number) => {
  const queryClient = useQueryClient()
  const { mutate: updateTenantMutation } = useMutation({
    mutationKey: ["updateTenant", tenantId],
    mutationFn: async (tenantData: TenantDataType) =>
      await updateTenant(tenantData,tenantId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTenants"],
      })
      //console.log("Tenant updated successfully")
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return {
    updateTenantMutation,
  }
}