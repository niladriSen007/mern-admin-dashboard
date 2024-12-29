import { Image, Space, TableProps, Tag, Typography } from "antd"
import dayjs from "dayjs"
import { Product } from "../types"

export const columns: TableProps<Product>["columns"] = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    render: (_text: string, record: Product) => {
      return (
        <div>
          <Space>
            <Image width={60} src={record.imageUrl} />
            <Typography.Text>{record.name}</Typography.Text>
          </Space>
        </div>
      )
    },
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Status",
    dataIndex: "isPublish",
    key: "isPublish",
    render: (_: boolean, record: Product) => {
      return (
        <>
          {record.isPublished ? (
            <Tag color="green">Published</Tag>
          ) : (
            <Tag color="red">Draft</Tag>
          )}
        </>
      )
    },
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (_: boolean, record: Product) => {
      return (
        <>
         {record.category.name}
        </>
      )
    },
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_: string, record: Product) => {
      return (
        <Typography.Text>
          {" "}
          {dayjs(record?.createdAt ?? new Date()).format("DD MMM YYYY")}
        </Typography.Text>
      )
    },
  },
]
