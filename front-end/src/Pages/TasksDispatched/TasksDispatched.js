import React from 'react'

import TreeView from "../../Public/Component/UIElements/TreeView"
import AddTask from "../../Public/Component/AddTask/AddTask"

import { queryDispatchedPage } from "../../Handler/QueryHandler"

import "./TasksDispatched.css"

const TasksDispatched = () => {
    
    const MULTITASKS = queryDispatchedPage();

    return (
        <React.Fragment>
            {<div className="task-list">
                <TreeView items={MULTITASKS}/>
            </div>}
            {<div><AddTask/></div>}
        </React.Fragment>
    );
}

export default TasksDispatched;