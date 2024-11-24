import { lazy, memo, Suspense } from 'react';
import { LockFilled } from '@ant-design/icons';
import { Card, Layout, Space } from 'antd';
const Logo = lazy(() => import('../../components/logo/Logo'));
const LoginForm = lazy(() => import('./_components/LoginForm'));
import { CardStyles, LayoutStyles, LogoContainerStyles, LogoStyles, MainContentStyles } from './styles/Login.styles';
import LoginFallback from './_components/LoginFallback';

const LoginPage = memo(() => {
  return (
    <Suspense fallback={<LoginFallback />}>
      <Layout style={LayoutStyles}>
        <Space
          direction="vertical"
          size="large"
          align="center">
          <Layout.Content
            style={MainContentStyles}>
            <Logo />
          </Layout.Content>
          <Card style={CardStyles}
            title={
              <Space size={'small'} direction='horizontal' align='center' style={LogoContainerStyles} >
                <LockFilled />
                <span style={LogoStyles}>Sign in</span>
              </Space>
            }>
            <LoginForm />
          </Card>
        </Space>
      </Layout>
    </Suspense>
  )
})
export default LoginPage