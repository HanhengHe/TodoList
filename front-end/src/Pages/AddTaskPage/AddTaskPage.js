import React, { useContext, useState } from "react";
// import { useNavigate } from 'react-router-dom';

import Card from "../../Public/Component/UIElements/Card";
import Button from "../../Public/Component/FormElements/Button"
import { GetUsersHandler } from "../../Handler/GetUsersHandler";
import AuthContext from "../../Handler/AuthContext";
import { AddTaskHandler } from "../../Handler/AddTaskHandler";

import "./AddTaskPage.css"

const AddTaskPage = () => {

    const options = GetUsersHandler();
    const auth = useContext(AuthContext);
    // const navigater = useNavigate();

    const [to, setTo] = useState(options.length > 0 ? options[0] : '');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Card className="authentication">
            <h2>Add a new task</h2>
            <hr/>
            <form>
                <div className="input-group">
                    <label>From: </label>
                    <label>{auth.userName}</label>         
                </div>
                <div className="input-group">
                    <label>To</label>
                    <select value={to} onChange={e => {setTo(e.target.value)}}>
                        {options.map((options) => (
                            <option key={options.key} value={options.value}>{options.label}</option>))}
                    </select>                
                </div>
                <div className="input-group">
                    <label>Title</label>
                    <input className="title-input" value={title} onInput={e => setTitle(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Description</label>
                    <textarea  value={description} onInput={e => setDescription(e.target.value)}/>
                </div>
            </form>
            <div className="btn-group">
                <Button onClick = {() => {
                    const msg = AddTaskHandler(title, auth.userName, to, description);
                    // navigater(`/${auth.userId}/task_dispatched`);
                }}>
                    SUBMIT
                </Button>
            </div>
        </Card>
    );
};

export default AddTaskPage;