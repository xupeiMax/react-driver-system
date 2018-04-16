import React, { Component } from 'react';
import Pubsub from 'pubsub-js';

import './home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.denglu = this.denglu.bind(this);
    }
    componentDidMount() { }
    denglu(e) {
        e.preventDefault();        
        Pubsub.publish('DENG_LU');
    }
    render() {

        let userMessage;
        if (this.props.loggedIn) {
            userMessage = (
                <div className="welcome">
                    <h2>{`欢迎回来， ${this.props.name}！`}</h2>
                </div>
            )
        } else {
            userMessage = (
                <form onSubmit={this.denglu}>
                    <div className="form-group">
                        <label>用户名</label>
                        <input type="text" name="name" placeholder="请输入用户名"/>
                    </div>
                    <div className="form-group">
                        <label>密码</label>
                        <input type="password" name="psw" placeholder="请输入密码" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="提交"/>
                    </div>
                </form>
            )
        }
        return (
            <div className="wrap">
                <div className="inner">
                    <h1>驾考服务平台</h1>
                    {userMessage}
                </div>
            </div>
        )
        
    }
}



export default Home;