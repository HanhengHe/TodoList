import React from 'react';

import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import MainPage from './Pages/MainPage/MainPage'
import MyTasks from './Pages/MyTasks/MyTasks'
import TasksDispatched from './Pages/TasksDispatched/TasksDispatched'
import AddTaskPage from './Pages/AddTaskPage/AddTaskPage'
import MainNavigation from './Public/Component/Navigation/MainNavigation'
import AuthPage from './Pages/AuthPage/AuthPage'

import { useAuth } from './Handler/AuthHook'
import AuthContext from './Handler/AuthContext';

function App() {

    // const {token, login, logout, userId} = useAuth();

    // test
    let {token, login, logout, userName, userId} = useAuth();
    token = "test";

    const routes = token ? (
        <Routes>
            <Route path="/" exact="true" element={<MainPage/>}/>
            <Route path="/AddTask" element={<AddTaskPage/>}/>
            <Route path="/:userId/my_tasks" element={<MyTasks/>}/>
            <Route path="/:userId/task_dispatched" element={<TasksDispatched/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    ) : (
        <Routes>
            <Route path="/" exact="true" element={<MainPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    );

    return (
        <AuthContext.Provider value={
            {
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                userName: userName,
                login: login,
                logout: logout
            }
        }>
            <BrowserRouter>
                <MainNavigation/>
                <main>{routes}</main>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
