import { Typography } from "antd"
import { ReactNode } from "react"

export interface ChipProps {
  color: string
  backgroundColor: string
  borderColor: string
  label: string | ReactNode
}

const Chip = ({ color, backgroundColor, borderColor, label }: ChipProps) => {
  return (
    <Typography.Text
      style={{
        fontWeight: "normal",
      }}
    >
      <div
        style={{
          color,
          backgroundColor,
          border: `1px solid ${borderColor}`,
          width: "100px",
          padding: "5px",
          borderRadius: "50px",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </Typography.Text>
  )
}
export default Chip
