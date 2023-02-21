import React, {useState, useContext} from "react";

import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../Public/util/validators';
import Card from "../../Public/Component/UIElements/Card";
import AuthContext from "../../Handler/AuthContext";
import Button from "../../Public/Component/FormElements/Button"
import Input from "../../Public/Component/FormElements/Input"
import {useForm} from "../../Handler/FormHandler";

import "./AuthPage.css"

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    };

    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr/>
            <form>
                {!isLoginMode && (
                    <Input element="input" id="name" type="text" label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name."
                        onInput={inputHandler}/>)}
                <Input element="input" id="email" type="email" label="E-Mail"
                    validators={
                        [VALIDATOR_EMAIL()]
                    }
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}/>
                <Input element="input" id="password" type="password" label="Password"
                    validators={
                        [VALIDATOR_MINLENGTH(5)]
                    }
                    errorText="Please enter a valid password, at least 5 characters."
                    onInput={inputHandler}/>
            </form>
            <div className="btn-group">
                <Button onClick={authSubmitHandler}
                    disabled={!formState.isValid}>
                    {isLoginMode ? 'LOGIN' : 'SIGNUP'} 
                </Button>
                <Button inverse
                    onClick={switchModeHandler}>
                    SWITCH TO {
                    isLoginMode ? 'SIGNUP' : 'LOGIN'} 
                </Button>
            </div>
        </Card>
    );
};

export default AuthPage;
