import '../styles/globals.css';
import 'antd/dist/antd.css';
import React, {useEffect, useState} from 'react';
import {Breadcrumb, Layout} from 'antd';
import {authContext} from '../context/myContext';
import {publicRoutes} from '../routes';
import {paths} from '../Utils/constants';
import {useRouter} from 'next/router';
import SideBarAS from "../components/SideBarAS";

const {Header, Content} = Layout;

const MyApp = ({Component, pageProps}) => {
    const bread = Component.breadcrumb ? Component.breadcrumb : [];
    return (
        <Layout style={{minHeight: '100vh'}}>
            <SideBarAS/>
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

export default function App({Component, pageProps}) {
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

    if (Component.getLayout) {
        return <authContext.Provider value={{user, setUser}}>
            {Component.getLayout(Component, pageProps)}
        </authContext.Provider>

    }
    return (
        <authContext.Provider value={{user, setUser}}>
            <MyApp Component={Component} pageProps={pageProps}/>
        </authContext.Provider>
    );
}
