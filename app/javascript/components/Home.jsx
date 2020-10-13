import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright, faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Interceptor, Get } from '../utils/Helper';
import Login from './Login';
import Signup from './Signup';

export default () => {
    var locs = [
        'Abolhar', 'Achalpur', 'Adilabad', 'Adityapur', 'Dahod', 'Damoh', 'Darbhanga',
        'Darjeeling', 'Kayamkulam', 'Khammam', 'Khandwa'
    ]
    const [locations, setLocations] = useState([]);
    const [login, setLogin] = useState('');
    const [phoneNumber, setNumber] = useState('');
    const [user, setUser] = useState({ name: '', phoneNumber: '', email: '' })
    useEffect(() => {
        const getloc = async () => {
            const url = '/api/v1/home/location';
            try {
                const response = await Get(url);
                console.log(response);
                setLocations(response)
            } catch (err) { console.log(err); }
        }
        getloc();
    }, []);
    useState(() => {
        const localuser = JSON.parse(localStorage.getItem('user')) || { name: '', phoneNumber: '', email: '' };
        console.log(localuser);
        setUser(localuser);
    });
    return (
        <div className='Home'>
            <div className='row'>
                <div className='col-7 pt-5'>
                    <br />
                    <div className='row pr-5'>
                        <div className='col-6 d-flex justify-content-center'>
                            <img src="https://i.pinimg.com/originals/69/df/f3/69dff3d81877bb46865f656de053e96e.png" className='w-50' alt="Logo" />
                        </div>
                        <div className='col-6 d-flex justify-content-end align-items-center'>
                            {
                                user.name ?
                                    <button className='bg-white px-5 py-2' onClick={() => {
                                        localStorage.setItem('user', JSON.stringify({ name: '', email: '', phoneNumber: '' }));
                                        setUser({ name: '', email: '', phoneNumber: '' });
                                    }
                                    }>{user.name}</button> :
                                    <>
                                        <button className="login" onClick={() => setLogin('login')}>Login</button>
                                        <button className='signin' onClick={() => setLogin('signup')}>Sign up</button>
                                    </>
                            }
                        </div>
                    </div>
                    <br /><br />
                    <div className='container'>
                        <h1>Cooking gone wrong?</h1>
                        <h4 className='text-secondary pb-3'>Order food from favourite restaurants near you.</h4>
                        <br />
                        <div className='search-box d-flex'>
                            <div className='search col-6 p-3'>
                                <input type='text' className='form-control' placeholder='Enter your delivery location'></input>
                            </div>
                            <div className='col-6 d-flex justify-content-end p-0'>
                                <div className='locate d-flex align-items-center p-2'>
                                    <button><FontAwesomeIcon icon={faSearchLocation} className='text-dark' />Locate Me</button>
                                </div>
                                <div className='find d-flex align-items-center'>
                                    FIND FOOD
                            </div>
                            </div>
                        </div>
                        <br />
                        <h6 className='text-muted'>POPULAR CITIES IN INDIA</h6>
                        <p className='cities'>
                            <span className='text-secondary'>Ahmedabad</span>
                            <span className='text-muted'>Bangalore</span>
                            <span className='text-secondary'>Chennai</span>
                            <span className='text-muted'>Delhi</span>
                            <span className='text-secondary'>Gurgeon</span>
                            <span className='text-muted'>Hydrabad</span>
                            <span className='text-secondary'>Kolkata</span>
                            <span className='text-muted'>Mumbai</span><br />
                            <span className='text-secondary'>Pune</span>
                            <span className='text-muted'>& more.</span>
                        </p>
                    </div>
                </div>
                <div className='col-5'>
                    <img style={{ objectFit: 'cover' }} className='w-100' src='https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/NorthIndian_u554zm'></img>
                </div>
            </div>
            <div className='features' style={{ background: 'rgb(43,30,22)' }}>
                <div className='d-flex justify-content-around images'>
                    <div className='d-flex justify-content-center'>
                        <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_210,h_398/4x_-_No_min_order_x0bxuf" alt="no minimum order" />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_412/4x_Live_order_zzotwy" alt="live order tracking" />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn" alt="lightening fast delivery" />
                    </div>
                </div><br />
                <div className='d-flex justify-content-around titles'>
                    <div className='d-flex justify-content-center'>
                        <h5>No Minimum Order</h5>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <h5>Live Order Tracking</h5>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <h5>Lightening-Fast-Delivery</h5>
                    </div>
                </div>
                <div className='d-flex justify-content-around titles'>
                    <div className='d-flex justify-content-center'>
                        <span>Order in for yourself or for the group,</span>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <span>Know where your order is at all times,</span>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <span>Experience Swiggy's superfast delivery</span>
                    </div>
                </div>
                <div className='d-flex justify-content-around titles'>
                    <div className='d-flex justify-content-center'>
                        <span>with no restrictions on order value</span>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <span>from the restaurant to your doorstep</span>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <span>for food delivered fresh & on time</span>
                    </div>
                </div>
            </div>
            <div className='apps row'>
                <div className='col-5 app'>
                    <h1>Restaurants in<br /><span style={{ paddingLeft: '5px' }}>your pocket</span></h1>
                    <br />
                    <h5 className='text-muted'>Order from your favorite restaurants & track<br />on the go, with the all-new Swiggy app.</h5>
                    <br /><br />
                    <div className='row'>
                        <a href="" className='col-5 pl-4'><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/play_ip0jfp" className='h-50' alt="" /></a>
                        <a href="" className='col-5 pl-2'><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/iOS_ajgrty" className='h-50' alt="" /></a>
                    </div>
                </div>
                <div className='col-3'>
                    <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/pixel_wbdy4n" alt="" />
                </div>
                <div className='col-3'>
                    <br /><br /><br /><br />
                    <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/iPhone_wgconp_j0d1fn" alt="" />
                </div>
            </div>
            <div className='footer'>
                <div className='row'>
                    <div className='col-3'>
                        <span className='title text-muted'><b>COMPANY</b></span><br /><br />
                        <ul>
                            <li><a href=''>About Us</a></li>
                            <li><a href=''>Team</a></li>
                            <li><a href=''>Career</a></li>
                            <li><a href=''>Swiggy Blog</a></li>
                            <li><a href=''>Bug Bounty</a></li>
                            <li><a href=''>Swiggy Pop</a></li>
                            <li><a href=''>Swiggy Super</a></li>
                        </ul>
                    </div>
                    <div className='col-3'>
                        <span className='title text-muted'><b>CONTACT</b></span><br /><br />
                        <ul>
                            <li><a href=''>Help & Support</a></li>
                            <li><a href=''>Partner with us</a></li>
                            <li><a href=''>Ride with us</a></li>
                        </ul>
                    </div>
                    <div className='col-3'>
                        <span className='title text-muted'><b>LEGAL</b></span><br /><br />
                        <ul>
                            <li><a href=''>Terms & Conditions</a></li>
                            <li><a href=''>Refund & Cancellation</a></li>
                            <li><a href=''>Privacy Policy</a></li>
                            <li><a href=''>Cookie Policy</a></li>
                            <li><a href=''>Offer Terms</a></li>
                        </ul>
                    </div>
                    <div className='col-3'>
                        <a href="">
                            <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icon-AppStore_lg30tv" alt="" />
                        </a>
                        <br /><br /><br />
                        <a href="">
                            <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icon-GooglePlay_1_zixjxl" alt="" />
                        </a>
                    </div>
                </div>
                <br />
                <hr style={{ borderTop: '1px solid white', opacity: '0.3' }} />
                <br />
                <div className='locations'>
                    <h6 className='text-muted'><b>WE DELIVER TO</b></h6>
                    <div className='row'>
                        <div className='col-3'>
                            <ul>
                                {locations.splice(0, Math.ceil(locations.length / 4)).map((location, index) => <li key={index}>{location.name}</li>)}
                            </ul>
                        </div>
                        <div className='col-3'>
                            <ul>
                                {locations.splice(0, Math.ceil(locations.length / 3)).map((location, index) => <li key={index}>{location.name}</li>)}
                            </ul>
                        </div>
                        <div className='col-3'>
                            <ul>
                                {locations.splice(0, Math.ceil(locations.length / 2)).map((location, index) => <li key={index}>{location.name}</li>)}
                            </ul>
                        </div>
                        <div className='col-3'>
                            <ul>
                                {locations.splice(0, locations.length).map((location, index) => <li key={index}>{location.name}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                <br />
                <hr style={{ borderTop: '1px solid white', opacity: '0.3' }} />
                <br />
                <div className='d-flex justify-content-between community'>
                    <div>
                        <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza" className='h-50' alt="" />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCopyright} /> 2020 Swiggy
                    </div>
                    <div className='d-flex media'>
                        <a href=""><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-facebook_tfqsuc" alt="" /></a>
                        <a href=""><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-pinterest_kmz2wd" alt="" /></a>
                        <a href=""><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-instagram_b7nubh" alt="" /></a>
                        <a href=""><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_48,h_48/icon-twitter_gtq8dv" alt="" /></a>
                    </div>
                </div>
            </div>
            {
                login === 'login' ?
                    <div className='Loger'>
                        <Login setLogin={setLogin} setNumber={setNumber} setUser={setUser}></Login>
                    </div> : login == 'signup' ?
                        <div className='Loger'>
                            <Signup  phoneNumber={phoneNumber} setLogin={setLogin} setUser={setUser} setNumber={setNumber}></Signup>
                        </div> : null
            }
        </div>
    );
}