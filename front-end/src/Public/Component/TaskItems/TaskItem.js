import React from 'react';

import Card from '../UIElements/Card'

import './TaskItem.css'
import '../../Style/Style-InputText.css'
import '../../Style/Style-CheckBox.css'
import '../../Style/Style-Button.css'

const TaskItem = props => {

    return (
        <div className='task-items'>
            <Card>
                <div className='task-item_card_style'>
                    <div className='task-item'>
                        <div className='task-item_context'>
                            <input className='task-item_CheckBox' type="checkbox" onChange={() => {}}
                                disabled={props.check_disable}>
                            </input>
                            <input className='task-item_Title' type="text" onChange={() => {}}
                                value={props.item_title}
                                disabled={!props.item_title_editable}>
                            </input>
                        </div>
                        <div className='task-description'>
                            <textarea  className='task-item_Description' value={props.item_description} onChange={() => {}}
                            disabled={!props.item_description_editable}/>
                        </div>
                    </div>
                    <div className='task-item_Controller'>
                        <button className="round-button">X</button>
                        <button className="round-button">↑</button>
                        <button className="round-button">↓</button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TaskItem;