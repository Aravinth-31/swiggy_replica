import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import $ from 'jquery';
import { Post, Interceptor } from '../utils/Helper';

export default props => {
    const [state, setState] = useState({ phoneNumber: '' });
    const [numbervalidate, setNumberValidate] = useState(false);
    useEffect(() => Interceptor(), [])

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    const Login = async (e) => {
        e.preventDefault();
        if (state.phoneNumber.length != 10) {
            $('.error').addClass('show');
            return;
        }
        else
            $('.error').removeClass('show');
        console.log(state);
        const url = '/api/v1/home/login'
        try {
            const response = await Post(url, state);
            console.log(response);
            if (response) {
                const { name, email, phone_number } = response;
                localStorage.setItem('user', JSON.stringify({ name, email, phoneNumber: phone_number }));
                props.setUser({ name, email, phoneNumber: phone_number });
                props.setLogin('');
            }
            else {
                props.setNumber(state.phoneNumber);
                props.setLogin('signup');
            }
        } catch (err) { console.log(err); }
    }

    return (
        <div className='Login'>
            <div className='form'>
                <div className='close' onClick={() => props.setLogin('')}>X</div>
                <br /><br />
                <img style={{ float: 'right', 'height': '120px' }} src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r'></img>
                <h2>Login</h2>
                <p>or <span className='switch' onClick={() => props.setLogin('signup')}>create an account</span><br /><b style={{ fontSize: '30px', marginTop: '-20px', letterSpacing: '-1px' }}>___</b></p>
                <br />
                <form onSubmit={Login}>
                    <fieldset className="form-group">
                        {/* <label htmlFor="exampleInputPhonenumber" className="bmd-label-floating">Phone Number</label> */}
                        <input type="numbers" className="form-control mb-0" value={state.phoneNumber} name='phoneNumber' placeholder='Phone Number' onChange={handleChange} id="exampleInputPhonenumber" required />
                        <div className='error text-danger pl-2'>Enter a valid phone number</div>
                    </fieldset>
                    <button className="form-control">LOGIN</button>
                </form>
            </div>
        </div>
    )
}