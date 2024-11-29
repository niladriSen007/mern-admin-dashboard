import { Space, TableProps } from "antd"
import dayjs from "dayjs"
import { RestaurantDataType } from "../types"
import { NavLink } from "react-router-dom"

export const columns: TableProps<RestaurantDataType>["columns"] = [
  {
    title: <span style={{
      fontSize: "16px",
      fontWeight: "bold"
    }}>ID</span>,
    dataIndex: "id",
    key: "id",
    render: (_, record) => (
      <Space size="middle">
        <NavLink to={`/restaurants/${record?.id}`}>{record?.id}</NavLink>
      </Space>
    ),
  },
  {
    title: <span style={{
      fontSize: "16px",
      fontWeight: "bold"
    }}>Restaurant name</span>,
    dataIndex: "name",
    key: "name",
  },
  {
    title: <span style={{
      fontSize: "16px",
      fontWeight: "bold"
    }}>Address</span>,
    dataIndex: "address",
    key: "address",
  },
  {
    title: <span style={{
      fontSize: "16px",
      fontWeight: "bold"
    }}>Manager name</span>,
    dataIndex: "users",
    key: "users",
    render: (_, record) => {
      return (
        <Space direction="vertical" style={{
          fontSize: "14px",
          fontWeight: "lighter"
        }}>
          {record?.users?.map((user) => (
            <span key={user.id}>
              <Space size="small" >
                <span>{user?.firstName}</span>
                <span>{user?.lastName}</span>
              </Space>
            </span>
          ))}
        </Space>
      )
    },
  },
  {
    title: <span style={{
      fontSize: "16px",
      fontWeight: "bold"
    }}>Manager email</span>,
    dataIndex: "users",
    key: "users",
    render: (_, record) => {
      return (
        <Space direction="vertical" style={{
          fontSize: "14px",
          fontWeight: "lighter"
        }}>
          {record?.users?.map((user) => (
            <span key={user.id}>
              <Space size="small">
                <span>{user?.email}</span>
              </Space>
            </span>
          ))}
        </Space>
      )
    },
  },
  {
    title: <span style={{
      fontSize: "16px",
      fontWeight: "bold"
    }}>Created at</span>,
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => (
      <Space size="middle">
      <span>{dayjs(record?.createdAt).format('DD MMM YYYY')}</span>
      </Space>
    ),
  },
]
