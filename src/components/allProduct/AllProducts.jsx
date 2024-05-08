import { Button, Space, Table, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const AllProducts = () => {

    const [product, setProduct] = useState([]);
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        async function getAllData() {
            const AllProductData = await axios.get('http://localhost:8000/api/v1/product/getAllProduct')
            setProduct(AllProductData.data);
        }
        getAllData();
    }, [product]);

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
            title: 'Image',
            dataIndex: 'Image',
            key: 'Image',
            render: () => (
                <img width={80} src="https://m.media-amazon.com/images/I/71PGYEFoiuL._AC_SL1500_.jpg" alt="" />
            ),
        },
        {
            title: 'Store id',
            dataIndex: 'store',
            key: 'store',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    {contextHolder}
                    <Space><Button danger onClick={() => handleDelete(record._id)}>Delete</Button></Space>
                </>


            ),
        }
    ];

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Delete successful',
        });
    };
    
    const handleDelete = (record) => {
        success()
        setTimeout(() => {
            axios.post('http://localhost:8000/api/v1/product/deleteProduct', {
            id: record
        });
        }, 500);
    };




    return (
        <Table dataSource={product} columns={columns} />
    )
}

export default AllProducts







