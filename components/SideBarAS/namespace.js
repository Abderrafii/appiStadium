import React, {useState} from "react";
import {useRouter} from "next/router";
import {AppstoreOutlined, PlusSquareOutlined, UnorderedListOutlined, UserOutlined} from "@ant-design/icons";
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

const NamespaceSideBarAS = () => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();

    const items = [
        getItem(
            'Trivia',
            'trivia',
            <UserOutlined/>,
            [
                getItem('Categories', 'cats', <AppstoreOutlined/>,
                    [
                        getItem('List', 'cats_list', <UnorderedListOutlined/>, null, () =>{}),
                        getItem('New', 'cats_new', <PlusSquareOutlined/>, null, () =>{}),
                    ]),
                getItem('Questions', 'questions', <AppstoreOutlined/>,
                    [
                        getItem('List', 'cats_list', <UnorderedListOutlined/>, null, () =>{}),
                        getItem('New', 'cats_new', <PlusSquareOutlined/>, null, () =>{}),
                    ]),
            ],
        ),

        getItem(
            'AppiGames',
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
            </Menu>
        </Layout.Sider>
    );
};

export default NamespaceSideBarAS;