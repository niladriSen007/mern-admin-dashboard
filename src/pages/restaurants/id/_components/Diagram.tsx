import React from "react"
import { RestaurantDataType } from "../../types"

interface DiagramProps {
  tenantData: RestaurantDataType
}

const Diagram = ({ tenantData }: DiagramProps) => {
  const boxStyle: React.CSSProperties = {
    color: "blueviolet",
    textAlign: "center",
    lineHeight: "30px",
    borderRadius: "5px",
    padding: "16px",
    fontSize: "36px",
    fontWeight: "bold",
  }

  return (
    <div
      style={{
        height: "200px",
      }}
    >
      <div style={{ ...boxStyle }}>
        {tenantData?.name}, {tenantData?.address}
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "40px",
          fontSize: "20px",
          alignItems: "center",
          
        }}
      >
       <span style={{
          fontSize: "24px",
          fontWeight: "bold",
       }}> Manager name :</span>
        {tenantData?.users?.map((user) => (
          <div
            key={user.id}
            style={{ 
             
             }}
          >
            {user.firstName} {user.lastName}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Diagram
