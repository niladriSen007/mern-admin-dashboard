import { ConfigProvider } from "antd"
import "antd/dist/reset.css"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "./index.css"
import { router } from "./router/router.tsx"
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#5138EE",
            colorLink: "#5138EE",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </ErrorBoundary>
)
