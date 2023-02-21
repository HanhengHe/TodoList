import React, { useReducer, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import AddTask from "../AddTask/AddTask"

import AuthContext from '../../../Handler/AuthContext'

import './NavLinks.css';

const underLinkStyle = { textDecoration: "underline" };
const normalStyle = { textDecoration: "none" };

const underlineReducer = (state, action) => {
    switch (action.type){
    case 'MAIN PAGE': 
      return {
        MainPage: true,
        MyTasks: false,
        TasksDispatched: false,
        ShowAddTask: true
      };
    case 'MY TASKS': 
      return {
        MainPage: false,
        MyTasks: true,
        TasksDispatched: false,
        ShowAddTask: true
      };
    case 'TASKS DISPATCHED':
      return {
        MainPage: false,
        MyTasks: false,
        TasksDispatched: true,
        ShowAddTask: true
      };
    case 'RESET':
      return {
        MainPage: false,
        MyTasks: false,
        TasksDispatched: false,
        ShowAddTask: false
      };
    default: {
      throw Error('Unknown action.');
    }
  }
}

const NavLinks = () => {

  const auth = useContext(AuthContext); 

  const [underlineState, dispatch] = useReducer(underlineReducer, { 
    MainPage: true,
    MyTasks: false,
    TasksDispatched: false,
    ShowAddTask: auth.token ? true : false
  });

  const navigater = useNavigate();

  return (
    <React.Fragment>
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact="true"
            onClick={() => {dispatch({ type: 'MAIN PAGE' });}} style={ underlineState.MainPage ? underLinkStyle : normalStyle}>
            MAIN PAGE
          </NavLink>
        </li>
        {auth.token && (
        <li>
          <NavLink to={`/${auth.userId}/my_task`} 
            onClick={() => {dispatch({ type: 'MY TASKS' });}} style={ underlineState.MyTasks ? underLinkStyle : normalStyle}>
            MY TASKS
          </NavLink>
        </li>)}
        {auth.token && (
        <li>
          <NavLink to={`/${auth.userId}/dispatched_task`} 
            onClick={() => {dispatch({ type: 'TASKS DISPATCHED' });}} style={ underlineState.TasksDispatched ? underLinkStyle : normalStyle}>
            TASKS DISPATCHED
          </NavLink>
        </li>)}
        <li>
            {auth.token ? (<button onClick={auth.logout}>LOGOUT</button>) : (<button onClick={() => navigater('/auth')}>LOGIN</button>)}
        </li>
      </ul>
      {auth.token && <div><AddTask 
        hidden={auth.token && underlineState.ShowAddTask ? "" : "hidden"} 
        onClick={() => {
          navigater('/AddTask');
          dispatch({ type: 'RESET' });
        }}/>
      </div>}
    </React.Fragment>
  );
};

export default NavLinks;
