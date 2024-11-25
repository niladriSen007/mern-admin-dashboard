import { CSSProperties } from "react"
const linkTextColor = "#1890ff"
export const LayoutStyles: CSSProperties = {
  display: "grid",
  placeItems: "center",
  height: "100vh",
  width: "100vw",
}

export const CardStyles: CSSProperties = {
  width: "400px",
  margin: "0 auto",
  borderRadius: "10px",
  boxShadow: "2px 2px 16px  #808080",
}

export const ButtonStyles: CSSProperties = {
  width: "100%",
  fontSize: "16px",
  height: "36px",
  fontWeight: "bold",
}

export const MainContentStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export const FormStyles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}

export const LogoStyles: CSSProperties = {
  fontSize: "32px",
  fontWeight: "bolder",
}
export const LogoContainerStyles: CSSProperties = {
  marginTop: "16px",
}
export const InputStyles: CSSProperties = {
  marginBottom: "4px",
  border: "1px solid #AEAEAE",
}
export const LinkStyles: CSSProperties = {
  marginLeft: "4px",
  color: linkTextColor,
  textDecoration: "underline",
}
export const BottomTextStyles: CSSProperties = {
  marginTop: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
