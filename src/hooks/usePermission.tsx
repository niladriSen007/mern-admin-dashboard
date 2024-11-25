export const usePermission = () => {
  const allowedPermissions = ["ADMIN", "MANAGER"]

  const _hasPermission = (role: string) => {
    if (role) return allowedPermissions?.includes(role)
    return false
  }

  return {
    isAllowed: _hasPermission,
  }
}
