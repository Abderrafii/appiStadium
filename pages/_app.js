import 'antd/dist/antd.css';
import '../styles/globals.css';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { authContext, LoadContext } from '../context/myContext';
import { publicRoutes } from '../routes';
import { paths } from '../Utils/constants';
import { useRouter } from 'next/router';
import SelectAS from '../components/SelectAS';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, cb = null) {
  return {
    key,
    icon,
    children,
    label,
    onClick: cb,
  };
}

const MyApp = ({ Component, pageProps }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem(
      'Users',
      'system_users',
      <UserOutlined />,
      [
        getItem(
          'List',
          'system_users_list',
          <UnorderedListOutlined />,
          null,
          () => router.push('/users')
        ),
        getItem('New', 'system_users_new', <UserAddOutlined />, null, () =>
          router.push('/users/add')
        ),
      ],
      () => {
        // alert('ok')
      }
    ),
    getItem('Team', 'sub2', <TeamOutlined />, [
      getItem('Team 1', '6'),
      getItem('Team 2', '8'),
    ]),
    getItem('Files', '9', <FileOutlined />),
  ];
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        className='bg-slate-700 m-2 rounded-2xl  '
        width={250}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        {/* <div className="logo"/> */}
        <Menu
          className='rounded-t-2xl bg-slate-700 text-white '
          defaultSelectedKeys={['1']}
          mode='inline'
          items={items}>
          <Menu.Item>
            <TeamOutlined />
            <span>Users</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}>
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <div
            className='site-layout-background'
            style={{
              padding: 24,
              minHeight: 360,
            }}>
            <SelectAS
              defaultValue={'system_users_list'}
              options={[
                { value: 'lucy', label: 'Lucy (101)' },
                { value: 'lucy2', label: 'Lucy (102)' },
                { value: 'lucy3', label: 'Lucy (103)' },
                { value: 'luc4', label: 'Lucy (104)' },
                { value: 'lucy5', label: 'Lucy (105' },
                { value: 'lucy6', label: 'Lucy (106)' },
              ]}
            />
            <Component {...pageProps} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // on initial load - run auth check
    //authCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck() {
    // redirect to login page if accessing a private page and not logged in
    const userData = JSON.parse(localStorage.getItem('userData'));
    const isPublicRoute =
      publicRoutes.filter((route) => route.path === router.pathname).length > 0;
    if (userData === null && !isPublicRoute) {
      router
        .push(paths.SIGN_IN)
        .then((r) => console.log('redirected to login'));
    } else {
      setUser(userData);
    }
  }

  return (
    <authContext.Provider value={{ user, setUser }}>
      <LoadContext.Provider value={[loading, setLoading]}>
        <MyApp Component={Component} pageProps={pageProps} />
      </LoadContext.Provider>
    </authContext.Provider>
  );
}
