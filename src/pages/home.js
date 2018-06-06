import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import Pubsub from 'pubsub-js';
// import $ from "jquery";

import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        // $.ajax({
        //   "url": `http://localhost:3001/`
        // }).then((result) => {
        //   console.log(result)
        // })
    }

    render() {
        let userMessage;
        // console.log(this.props)
        if (this.props.user) {
            userMessage = (
                <div className="welcome">
                    <h2>{`欢迎回来， ${this.props.user.name}！`}</h2>
                </div>
            )
        } else {
            userMessage = (
                <div><h3>您还未登录，请先<span><Link to='/signin'>登录</Link></span> 或 <span><Link to="/signup">注册</Link></span></h3></div>
            )
        }
        return (
            <div className="wrap">
                <div className="inner">
                    <h2>驾考服务平台</h2>
                    {userMessage}
                </div>
            </div>
        )
        
    }
}



export default Home;