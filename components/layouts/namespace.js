import 'antd/dist/antd.css';
import React from 'react';
import {Layout} from 'antd';
import NamespaceSideBarAS from "../SideBarAS/namespace";

const {Header, Content} = Layout;

const NamespaceApp = ({Component, pageProps}) => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <NamespaceSideBarAS/>
            <Layout className='site-layout'>
                <Header className='site-layout-background' style={{padding: 0}}/>
                <Content style={{margin: '0 16px',}}>
                    <div className='site-layout-background' style={{padding: 24, minHeight: 360}}>
                        <Component {...pageProps} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default NamespaceApp;
