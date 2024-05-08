import React, { useEffect, useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Input, Select, message } from 'antd';
import { Space } from 'antd';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const AddSubCategory = () => {

    const [subCategoryName, setSubCategoryName] = useState();
    const [discription, setDiscription] = useState();
    const [showEdit, setShowEdit] = useState(false)
    const [categoryData, setCategoryData] = useState([]);
    const [categoryName, setCategoryName] = useState('')



    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [messageApi, contextHolder] = message.useMessage();

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const filterOption = (input, option) =>
        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    const onChange = (value) => {
        setCategoryName(value);
    };
    const onSearch = (value) => {
    };
    const warning = (warning) => {
        messageApi.open({
            type: 'warning',
            content: warning,
        });
    };
    const success = (success) => {
        messageApi.open({
            type: 'success',
            content: success,
        });
    };


    const cancelEdit = () => {
        setShowEdit(!showEdit)
    }

    useEffect(() => {
        async function getCategory() {
            const data = await axios.get('http://localhost:8000/api/v1/category/getCategory');
            let arr = [];
            data.data.map((item) => {
                arr.push({
                    value: item._id,
                    label: item.name,
                });
                setCategoryData(arr);
            });
        };
        getCategory();
    }, []);


    const descriptionText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const handleClick = () => {
        if (!subCategoryName) {
            warning('Category name please')
        } else if (!descriptionText || !discription) {
            warning('Enter your discription')
        }
        if (subCategoryName && discription || descriptionText) {

            axios.post('http://localhost:8000/api/v1/category/subCategory', {
                name: subCategoryName,
                category: categoryName,
                description: discription || descriptionText,
            }).then(() => {
                success('Category create successfuly done');
                setSubCategoryName('');
                setDiscription("")
            })

        }
    }
    return (
        <div style={{ marginLeft: "30px" }}>
            <div>
                <h4>Sub Category Name</h4>
                <Input onChange={(e) => setSubCategoryName(e.target.value)} value={subCategoryName} placeholder=' Enter Product Name' />
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: "center", gap: "30px" }}>
                    <h4>Discription</h4>
                    <div style={{ display: 'flex', alignItems: "center", gap: "10px" }}>
                        <h2 style={{ fontSize: "15px" }}>Edit text</h2>
                        <div onClick={cancelEdit}>
                            {
                                showEdit ?
                                    <ImCross style={{ fontSize: "15px" }} />

                                    :
                                    <FaEdit style={{ fontSize: "20px" }} />
                            }
                        </div>
                    </div>
                </div>
                {
                    showEdit ?
                        <Editor
                            value={editorState}
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={onEditorStateChange}
                        />
                        :
                        <textarea name="" id="" style={{
                            width: "100%", resize: "none", paddingLeft: "10px",
                            paddingTop: "10px", outline: "none", border: "2px solid", borderRadius: "5px"
                        }}
                            value={discription}
                            onChange={(e) => setDiscription(e.target.value)} />
                }
            </div>
            <div>
                <Select
                    style={{ width: "300px" }}
                    showSearch
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={categoryData}
                />
            </div>
            <>
                {contextHolder}
                <Space>
                    <Button onClick={handleClick} style={{ top: '20px' }} type="primary">Submit</Button>
                </Space>
            </>
        </div>
    )
}

export default AddSubCategory