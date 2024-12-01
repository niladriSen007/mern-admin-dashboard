import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider } from "antd"
import "antd/dist/reset.css"
import { createRoot } from "react-dom/client"
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary.tsx"
import "./index.css"
import { router } from "./router/router.tsx"

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
        {router}
      </ConfigProvider>
    </QueryClientProvider>
  </ErrorBoundary>
)
