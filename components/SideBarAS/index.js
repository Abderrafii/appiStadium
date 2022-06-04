import React, {useState} from "react";
import {useRouter} from "next/router";
import {
    AppstoreOutlined,
    DesktopOutlined,
    PieChartOutlined,
    PlusSquareOutlined,
    TeamOutlined,
    UnorderedListOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Menu, Layout} from "antd";

function getItem(label, key, icon, children, cb = null) {
    return {
        key,
        icon,
        children,
        label,
        onClick: cb,
    };
}

const SideBarAS = () => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    const items = [
        getItem('Option 1', '1', <PieChartOutlined/>),
        getItem('Option 2', '2', <DesktopOutlined/>),
        getItem(
            'Users',
            'system_users',
            <UserOutlined/>,
            [
                getItem(
                    'List',
                    'system_users_list',
                    <UnorderedListOutlined/>,
                    null,
                    () => router.push('/admin/users')
                ),
                getItem('New', 'system_users_new', <PlusSquareOutlined/>, null, () =>
                    router.push('/admin//users/add')
                ),
            ],
        ),

        getItem(
            'Namespaces',
            'namespaces',
            <AppstoreOutlined/>,
            [
                getItem(
                    'List',
                    'ns_list',
                    <UnorderedListOutlined/>,
                    null,
                    () => router.push('/admin/namespaces')
                ),
                getItem('New', 'ns_new', <PlusSquareOutlined/>, null, () =>
                    router.push('/admin/namespaces/add')
                ),
            ],
        ),
    ];
    return (
        <Layout.Sider
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
                    <TeamOutlined/>
                    <span>Users</span>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};

export default SideBarAS;