import { Flex, Image, Space, Table, TableProps } from "antd";
import Chip from "../../components/common/Chip";
interface DataType {
  key: string;
  userName: string;
    status: string[];
   role: string;
   email:string;
   imgUrl: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'User name',
    dataIndex: 'userName',
    key: 'userName',
    render: (text,record) => <Space > <Image style={{
      width: 40,
      height: 40,
      borderRadius: 50,
    }} src={record.imgUrl} />{text}</Space>,
  },
  {
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
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Created at',
    key: 'creationDate',
    render: () => (
      <Space size="middle">
        <span>{"12 Nov 2032"}</span>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    imgUrl : "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    userName: 'John Brown',
    status: ['active'],
    role: 'Admin',
    email: "j@j.com"
  },
  {
    key: '2',
    imgUrl : "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    userName: 'Rakesh k',
    status: ['active'],
    role: 'Manager',
    email: "j@j.com"
  },
  {
    key: '3',
    imgUrl : "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
    userName: 'Virat',
    status: ['banned'],
   role: 'Customer',
   email: "j@j.com"
  },
];

const Users = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} />;
    </div>
  )
}
export default Users