import React from 'react'

import TreeView from "../../Public/Component/UIElements/TreeView"
import AddTask from "../../Public/Component/AddTask/AddTask"

import { queryMyPage } from "../../Handler/QueryHandler"

import "./MyTasks.css"

const MyTasks = () => {
    
    const MULTITASKS = queryMyPage();

    return (
        <React.Fragment>
            {<div className="task-list">
                <TreeView items={MULTITASKS}/>
            </div>}
            {<div><AddTask/></div>}
        </React.Fragment>
    );
}

export default MyTasks;