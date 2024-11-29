import { Space, TableProps } from "antd"

import { RestaurantDataType } from "../types"
import { NavLink } from "react-router-dom"

export const columns: TableProps<RestaurantDataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (_, record) => (
      <Space size="middle">
        <NavLink to={`/restaurants/${record?.id}`}>{record?.id}</NavLink>
      </Space>
    ),
  },
  {
    title: "Restaurant name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Manager name",
    dataIndex: "users",
    key: "users",
    render: (_, record) => {
      return (
        <>
          {record?.users?.map((user) => (
            <span key={user.id}>
              <Space size="small">
                <span>{user?.firstName}</span>
                <span>{user?.lastName}</span>
              </Space>
            </span>
          ))}
        </>
      )
    },
  },
  {
    title: "Manager email",
    dataIndex: "users",
    key: "users",
    render: (_, record) => {
      return (
        <>
          {record?.users?.map((user) => (
            <span key={user.id}>
              <Space size="small">
                <span>{user?.email}</span>
              </Space>
            </span>
          ))}
        </>
      )
    },
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => (
      <Space size="middle">
        <span>{record?.createdAt}</span>
      </Space>
    ),
  },
]
