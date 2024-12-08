import axios from "axios"
import { useAuthStore } from "../store/store"

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

const fetchRefreshToken = async () => {
  await axios.post(
    `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/auth/refresh`,
    {},
    { withCredentials: true }
  )
}
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error, "error")
    const originalRequest = error.config

    if (error?.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true
        const previousHeaders = { ...originalRequest.headers }
        await fetchRefreshToken()
        return api.request({ ...originalRequest, headers: previousHeaders })
      } catch (e: unknown) {
        console.error(e)
        useAuthStore.getState().logout()
        return Promise.reject(e as Error)
      }
    }
    return Promise.reject(error as Error)
  }
)
