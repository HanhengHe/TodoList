import React from 'react';

import TaskList from "../TaskItems/TaskList"

import './TreeView.css'

const TreeView = prop => {
    return (
        <div className="treeView_container">
            <ul className='treeView_list'>
                {prop.items.map(singTask => (
                    <details key={singTask.userId}>
                        <summary>{`${singTask.userName}`}</summary>
                        <TaskList items={singTask.tasks}/>
                    </details>
                ))}
            </ul>
        </div>
    );
}

export default TreeView;