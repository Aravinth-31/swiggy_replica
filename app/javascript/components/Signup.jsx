import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import $ from 'jquery';
import { Post, Interceptor } from '../utils/Helper';

export default props => {
    const [state, setState] = useState({ phoneNumber: props.phoneNumber, name: '', email: '', password: '' })
    const [errors, setErrors] = useState('errors');
    useEffect(() => Interceptor(), [])

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    const Signup = async (e) => {
        e.preventDefault();
        if (state.phoneNumber.length != 10) {
            setErrors('Invalid phone number')
            $('.error').addClass('show');
        }
        else {
            $('.error').removeClass('show');
        }
        const url = '/api/v1/home/signup'
        try {
            const response = await Post(url, state);
            console.log(response);
            if (response.result == 'exists') {
                setErrors('Account exists, Please Login');
                $('.error').addClass('show');
            }
            else {
                const { name, email, phone_number } = response;
                localStorage.setItem('user', JSON.stringify({ name, email, phoneNumber: phone_number }));
                props.setUser({ name, email, phoneNumber: phone_number });
                props.setLogin('');
                props.setNumber('');
            }
        } catch (err) { console.log(err); }
    }

    return (
        <div className='Signup'>
            <div className='form'>
                <div className='close' onClick={() => props.setLogin('')}>X</div>
                <br /><br />
                <img style={{ float: 'right', 'height': '120px' }} src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r'></img>
                <h2>Sign Up</h2>
                <p>or <span className='switch' onClick={() => props.setLogin('login')}>login to your account</span><br /><b style={{ fontSize: '30px', marginTop: '-20px', letterSpacing: '-1px' }}>___</b></p>
                <br />
                <form onSubmit={Signup}>
                    <fieldset className="form-group p-0 m-0">
                        {/* <label htmlFor="exampleInputPhoneNumber" className="m-0 bmd-label-floating">Phone Number</label> */}
                        <input type="numbers" className="form-control m-0" name='phoneNumber' value={state.phoneNumber} onChange={handleChange} placeholder='Phone Number' id="exampleInputPhoneNumber" required />
                    </fieldset>
                    <fieldset className="form-group p-0 m-0">
                        {/* <label htmlFor="exampleInputName" className="m-0 bmd-label-floating">Name</label> */}
                        <input type="text" className="form-control m-0" name='name' value={state.name} onChange={handleChange} placeholder='Name' id="exampleInputName" required />
                    </fieldset>
                    <fieldset className="form-group p-0 m-0">
                        {/* <label htmlFor="exampleInputEmail" className="m-0 bmd-label-floating">Email</label> */}
                        <input type="email" className="form-control m-0" name='email' value={state.email} onChange={handleChange} placeholder='Email' id="exampleInputEmail" required />
                    </fieldset>
                    <fieldset className="form-group p-0 m-0">
                        {/* <label htmlFor="exampleInputPassword" className="bmd-label-floating p-0 m-0">Password</label> */}
                        <input type="password" className="form-control m-0" name='password' value={state.password} onChange={handleChange} placeholder='Password' id="exampleInputPassword" required />
                    </fieldset>
                    <p className='error text-danger pl-2 mt-1'>* {errors}</p>
                    <p className='refer'>Have a referal code?</p>
                    <button className="form-control mt-2 mb-1">SIGN UP</button>
                    <p className='terms text-secondary m-0'>By creating an account, I accept the <a href='https://www.swiggy.com/terms-and-conditions'>Terms & Conditions</a></p>
                </form>
            </div>
        </div>
    )
}