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
import {Layout, Menu} from "antd";
import {navigate, paths} from "../../Utils/constants";

function getItem(label, key, icon, children, cb = null) {
    return {
        key,
        icon,
        children,
        label,
        onClick: cb,
    };
}

const AdminSideBarAS = () => {
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
                    () => navigate(router, paths.LIST_SYSTEM_USERS)
                ),
                getItem('New', 'system_users_new', <PlusSquareOutlined/>, null, () =>
                    navigate(router, paths.ADD_SYSTEM_USER)
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
                    () => navigate(router, paths.LIST_NAMESPACES)
                ),
                getItem('New', 'ns_new', <PlusSquareOutlined/>, null, () =>
                    navigate(router, paths.ADD_NAMESPACE)
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

export default AdminSideBarAS;