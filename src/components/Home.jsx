import React, { useState } from 'react';
import {
    UsergroupAddOutlined,
    ProductOutlined,
    LoginOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Col, Divider, Menu, Row, Switch } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}


const Home = () => {
    const [mode, setMode] = useState('inline');
    const [theme, setTheme] = useState('light');
    const navigate = useNavigate()

    const items = [
        getItem('User ', 'sub1', <UsergroupAddOutlined />, [
            getItem('Login', '/registration', <LoginOutlined />),
            getItem('Merchent', '2', <UserOutlined />),
        ]),
        getItem('Product', 'sub2', <ProductOutlined />, [
            getItem('Add product', '/AddProduct'),
            getItem('All product', '/Allproduct'),
        ]),
        getItem('Category', 'sub3', <SettingOutlined />, [
            getItem('All Category', '/AllCategory'),
            getItem('Add Category', '/addCategory'),
        ]),
        getItem('Sub Category', 'sub4', <SettingOutlined />, [
            getItem('All Sub Category', '/allsubcategory'),
            getItem('Add Sub Category', '/addSubCategory'),
        ])
    ];

    const onClick = (e) => {
        navigate(e.key);
    };



    return (
        <>

            <Row>
                <Col span={4}>
                    <Menu
                        onClick={onClick}
                        // style={{
                        //     width: 256,
                        // }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode={mode}
                        theme={theme}
                        items={items}
                    />
                </Col>
                <Col span={18}>
                    <Outlet/>
                </Col>
            </Row>
        </>
    )
}

export default Home