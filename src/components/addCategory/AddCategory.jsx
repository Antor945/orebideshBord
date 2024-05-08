import React, { useEffect, useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Input, message } from 'antd';
import { Space } from 'antd';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const AddCategory = () => {

    const [categoryName, setCategoryName] = useState();
    const [discription, setDiscription] = useState();
    const [showEdit, setShowEdit] = useState(false)



    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [messageApi, contextHolder] = message.useMessage();

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const filterOption = (input, option) =>
        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    const onChange = (value) => {
        setStoreName(value);
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
    const descriptionText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const handleClick = () => {

        if (!categoryName) {
            warning('Category name please')
        } else if (!descriptionText || !discription) {
            warning('Enter your discription')
        }
        if (categoryName && discription || descriptionText) {

            axios.post('http://localhost:8000/api/v1/category/createCategory', {
                name: categoryName,
                description: discription || descriptionText,
            }).then(() => {
                success('Category create successfuly done');
                setCategoryName('');
                setDiscription("")
            })

        }
    }


    return (
        <div style={{ marginLeft: "30px" }}>
            <div>
                <h4>Category Name</h4>
                <Input onChange={(e) => setCategoryName(e.target.value)} value={categoryName} placeholder=' Enter Product Name' />
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
            <>
                {contextHolder}
                <Space>
                    <Button onClick={handleClick} style={{ top: '20px' }} type="primary">Submit</Button>
                </Space>
            </>
        </div>
    )
}



export default AddCategory