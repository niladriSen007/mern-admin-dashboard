import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { useMutation } from "@tanstack/react-query"
import { Alert, Button, Checkbox, Flex, Form, Input, Typography } from "antd"
import { memo } from "react"
import { useLogout } from "../../../hooks/useLogout"
import { usePermission } from "../../../hooks/usePermission"
import { useUserDataFetch } from "../../../hooks/useUserDataFetch"
import { loginUser } from "../../../http/apiCalls"
import { useAuthStore } from "../../../store/store"
import {
  BottomTextStyles,
  ButtonStyles,
  FormStyles,
  InputStyles,
  LinkStyles,
} from "../styles/Login.styles"
import { LoginUserData } from "../types"

const LoginForm = memo(() => {
  
  const { setUserData } = useAuthStore()
  const { isAllowed } = usePermission()
  const { userLogoutMutation } = useLogout()
  const { userDataFetch } = useUserDataFetch()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (values: LoginUserData) => loginUser(values),
    onSuccess: async () => {
      const { data } = await userDataFetch()
      if (!isAllowed(data?.data?.roles)) {
        userLogoutMutation()
        return
      }
      setUserData(data?.data)
      
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
      {isError && (
        <Alert
          message={error?.message}
          type="error"
          showIcon
          style={{ marginBottom: "1rem" }}
        />
      )}

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please enter your username!" },
          { type: "email", message: "Please enter valid username!" },
        ]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="john@example.com"
          style={InputStyles}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter valid password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="*********"
          style={InputStyles}
        />
      </Form.Item>

      <Flex justify="space-between">
        <Form.Item name="remember" valuePropName="checked" label={null}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a href="/" style={{ marginTop: "4px" }}>
          Forgot password?
        </a>
      </Flex>

      <Form.Item label={null}>
        <Button
          loading={isPending}
          type="primary"
          htmlType="submit"
          style={ButtonStyles}
        >
          Log in
        </Button>
        <Typography.Text style={BottomTextStyles}>
          Don't have an account?{" "}
          <a href="/" style={LinkStyles}>
            Sign up
          </a>
        </Typography.Text>
      </Form.Item>
    </Form>
  )
})
export default LoginForm
