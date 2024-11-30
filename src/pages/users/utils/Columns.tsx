import { Image, Space, TableProps } from "antd"
import { DataType } from "../types"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

export const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "User name",
    dataIndex: "userName",
    key: "userName",
    render: (_, record: DataType) => (
      <Space>
        <Image
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={`https://api.dicebear.com/9.x/personas/svg?seed=${record.id}`}
          alt="avatar"
        />
        {record.firstName}
        {record.lastName}
      </Space>
    ),
  },
  /*   {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <Flex gap={10}>
        {status.map((stat) => {
          let color = stat=='banned' ? '#FF2727' : '#219653';
          if (stat === 'loser') {
            color = 'volcano';
          }
          return (
            <Chip color={color} key={stat} borderColor={color} backgroundColor={color == '#FF2727' ? "#FFE5E5" : "#D1F2EB"} label={stat.toUpperCase()} />

          );
        })}
      </Flex>
    ),
  }, */
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "roles",
    key: "roles",
    render: (text) => {
      let color
      let backgroundColor
      if (text === "ADMIN") {
        color = "#FF2727"
        backgroundColor = "#FFE5E5"
      } else if (text === "MANAGER") {
        color = "blueviolet"
        backgroundColor = "#E8DAEF"
      } else {
        color = "#219653"
        backgroundColor = "#D1F2EB"
      }
      return (
        <span
          style={{
            color,
            backgroundColor,
            padding: "8px",
            borderRadius: "10%",
            textTransform: "capitalize",
            fontWeight: "bolder",
          }}
        >
          {text}
        </span>
      )
    },
  },
  {
    title: "Tenant",
    dataIndex: "tenant",
    key: "tenant",
    render: (_, record) => (
      <Space>
        {record?.tenant ? <Link to={`/restaurants/${record?.tenant?.id}`}>{record?.tenant?.name}</Link> : "N/A"}
      </Space>
    ),
  },
  {
    title: "Created at",
    key: "createdAt",
    dataIndex: "createdAt",
    render: (_,record) => {
      return(
        <Space size="middle">
          <span>{dayjs(record?.createdAt ?? new Date()).format("DD MMM YYYY")}</span>
        </Space>
      )
    },
  },
]
