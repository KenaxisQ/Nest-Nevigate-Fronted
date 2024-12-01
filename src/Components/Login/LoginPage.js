import { useState } from 'react';
import { Login } from './Login/Login';
import './LoginPage.css'
import { Register } from './Register/Register';
export const LoginPage = () => {
    const [displayTab, setDisplayTab] = useState(<Login />);
    const setTab = (tabname) =>{
        if(tabname === 'Register')
        {
        setDisplayTab(<Register />);
        }
        else{
        setDisplayTab(<Login />);
        }
    }
    return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6 login-field-center'>
        <ul class="nav nav-pills nav-justified" id="ex1" role="tablist">
            <li class="nav-item" role="presentation" id="nav-item-login">
                <button
                    class="nav-link active"
                    id="tab-login"
                    onClick={() => {setTab('Login')}}
                >Login</button>
            </li>
            <li class="nav-item" role="presentation" id="nav-item-login">
                <button
                    class="nav-link"
                    id="tab-login"
                    onClick={() => {setTab('Register')}}
                >Register</button>
            </li>
        </ul>
        <div class="tab-content">
            {displayTab}
        </div>
            </div>
            <div className='col-md-3'></div>
        </div>
    </div>
    );
}