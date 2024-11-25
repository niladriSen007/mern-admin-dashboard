import { Image, Layout } from "antd"

const Loading = () => {
  return (
    <Layout style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
    }}>
      <Image src="/Loader.svg" alt="loading" />
    </Layout>
  )
}
export default Loading