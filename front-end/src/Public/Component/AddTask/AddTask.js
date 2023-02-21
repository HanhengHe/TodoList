import React from 'react'
import ReactDOM from 'react-dom';

import "./AddTask.css"

const AddTask = props => {
    const AddTaskComponent = <button className="add-task-btn" hidden={ props.hidden } onClick={ props.onClick }>+</button>;
    return ReactDOM.createPortal(AddTaskComponent, document.getElementById('add-task-hook'));
}

export default AddTask;