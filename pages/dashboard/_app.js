import 'antd/dist/antd.css';
import React, {useState} from 'react';
import {Breadcrumb, Layout} from 'antd';
import {authContext} from '../../context/myContext';
import NamespaceSideBarAS from "../../components/SideBarAS/namespace";

const {Header, Content} = Layout;

const DashboardApp = ({Component, pageProps}) => {
    const bread = Component.breadcrumb ? Component.breadcrumb : [];
    return (
        <Layout style={{minHeight: '100vh'}}>
            <NamespaceSideBarAS/>
            <Layout className='site-layout'>
                <Header className='site-layout-background' style={{padding: 0}}/>
                <Content style={{margin: '0 16px',}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        {bread.map((item, index) => (
                            <Breadcrumb.Item key={index}>
                                {item.name}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                    <div className='site-layout-background' style={{padding: 24, minHeight: 360}}>
                        <Component {...pageProps} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default function NamespaceApp({Component, pageProps}) {
    const [user, setUser] = useState(null);
    return (
        <authContext.Provider value={{user, setUser}}>
            <DashboardApp Component={Component} pageProps={pageProps}/>
        </authContext.Provider>
    );
}
