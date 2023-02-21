import React, { useContext } from 'react'

import TreeView from "../../Public/Component/UIElements/TreeView"

import AuthContext from '../../Handler/AuthContext'
import { queryMainPage } from "../../Handler/QueryHandler"

import "./MainPage.css"

const MainPage = () => {
    
    const MULTITASKS = queryMainPage();

    return (
        <React.Fragment>
            {<div className="task-list">
                <TreeView items={MULTITASKS}/>
            </div>}
        </React.Fragment>
    );
}

export default MainPage;