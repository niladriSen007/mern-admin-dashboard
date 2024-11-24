import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert, Button, Checkbox, Flex, Form, Input } from "antd";
import { memo } from 'react';
import { getSelfData, loginUser } from '../../../http/apiCalls';
import { ButtonStyles, FormStyles, InputStyles } from "../styles/Login.styles";
import { LoginUserData } from '../types';

const LoginForm = memo(() => {

  const login = async (values: LoginUserData) => {
    const { email, password } = values
    try {
      const { data } = await loginUser({
        email,
        password
      })
      return data;
    } catch (error) {
      throw new Error(error as string)
    }
  }

  const getSelf = async () => {
    try {
      const { data } = await getSelfData()
      console.log(data)
      return data;
    } catch (error) {
      throw new Error(error as string)

    }
  }


  const { data: userData, refetch } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    staleTime: 1000 * 60 * 5,
    enabled: false
  })

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      refetch()
      console.log(userData)
    },

  })


  return (
    <Form
      initialValues={{ remember: true }}
      style={FormStyles}
      onFinish={(values) => {
        mutate(values)
      }}
    >
      {
        isError && <Alert message={error?.message} type="error" showIcon style={{ marginBottom: '1rem' }} />
      }
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please enter your username!' },
          { type: 'email', message: 'Please enter valid username!' }
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="john@example.com" style={InputStyles} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter valid password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="*********" style={InputStyles} />
      </Form.Item>

      <Flex justify="space-between" >
        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a href="/" style={{ marginTop: "4px" }}>Forgot password</a>
      </Flex>

      <Form.Item label={null}>
        <Button loading={isPending} type="primary" htmlType="submit" style={ButtonStyles}  >
          Log in
        </Button>
      </Form.Item>
    </Form>

  )
})
export default LoginForm