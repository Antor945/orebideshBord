import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd';
import { render } from 'react-dom';
import axios from 'axios';

const AllSubCategory = () => {
    const [categoryData, setCategoryData] = useState([])

    const columns = [
        {
            title: 'serial',
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
            title: 'status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'isActive',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive) => <p>{isActive ? "Active" : "inActive"}</p>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Space><Button danger >Delete</Button></Space>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        async function getAllSubCategory() {
            const categoryData = await axios.get('http://localhost:8000/api/v1/category/getSubcategory');
            setCategoryData(categoryData.data)
        }
        getAllSubCategory();
    }, [])

    console.log();

    return (
        <Table columns={columns} dataSource={categoryData} />
    )
}

export default AllSubCategory