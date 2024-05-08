import { Button, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { render } from 'react-dom';

const Allcategory = () => {
    const [categoryData, setCategoryData] = useState([])

    const columns = [
        {
            title: 'Serial',
            dataIndex: 'serial',
            key: 'serial',
            render: (_, record, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'isActive',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) => <p>{isActive ? "Active" : "inActive"}</p>
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Space><Button danger >Delete</Button></Space>
                </>
            ),
        }
    ];

    useEffect(() => {
        async function getAllCategory() {
            const categoryData = await axios.get('http://localhost:8000/api/v1/category/getCategory');
            setCategoryData(categoryData.data);
        }
        getAllCategory();
    }, [])

    return (
        <Table
            dataSource={categoryData}
            columns={columns} />
    )
}

export default Allcategory