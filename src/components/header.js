import React, { Component } from 'react';
import { Link } from "react-router-dom";

import logo from '../assets/images/tx.jpg';
import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount() { }


    render() {
        let userProfile;
        if (this.props.loggedIn) {
            userProfile = (
                <div className="login-wrap">
                    <img src={logo} width="55" alt="" />
                    <span className="nichen text-overflow">{this.props.name}</span>
                </div>
            )
        }else{
            userProfile = (
                <div className="login-wrap">
                    <span><Link to="./">登录</Link></span><span> | </span><span><Link to="./">注册</Link></span>
                </div>
            )
        }
        return (
            <div className="component-header">
                <h1 className="caption"><Link to="./">驾考服务</Link></h1>
                <ul>
                    <li><Link to="/lesson1">科目一</Link></li>
                    <li><Link to="/lesson2">科目二</Link></li>
                    <li><Link to="/lesson3">科目三</Link></li>
                    <li><Link to="/lesson4">科目四</Link></li>                    
                </ul>
                {userProfile}
            </div>
        )
    }
}



export default Header;