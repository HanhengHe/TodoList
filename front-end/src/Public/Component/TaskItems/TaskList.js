import React from 'react';

import TaskItem from './TaskItem';
import './TaskList.css'

const TaskList = props => {
    return (
        <ul className='task-list'>
            {props.items.map(task => (
                <TaskItem 
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    check_disable={task.check_disable}
                    item_title={task.item_title}
                    item_title_editable={task.item_title_editable}
                    item_description={task.item_description}
                    item_description_editable={task.item_description_editable}>
                </TaskItem>
            ))}
        </ul>
    );
};

export default TaskList;