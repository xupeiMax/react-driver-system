import React, { Component } from 'react';
import './login.css';
import Pubsub from 'pubsub-js';
// import $ from "jquery";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.signin = this.signin.bind(this);
        this.signup = this.signup.bind(this);   
        this.onchangehandler = this.onchangehandler.bind(this);     
    }
    componentDidMount() {

    }
    onchangehandler(e){
        var value = e.target.value;
        this.setState({
            role: value
        })
    }
    signin(e) {
        e.preventDefault();
        const userName = e.target.elements[0].value;
        const psw = e.target.elements[1].value;
        let data = {
            user:{
                name: userName,
                password: psw
            }
        }
        Pubsub.publish("SIGN_IN",data);
    }

    signup(e) {
        e.preventDefault();
        const userName = e.target.elements[0].value;
        const psw = e.target.elements[1].value;
        // const role = e.target.elements[2].value;
        // console.log(this.state.role)
        let data = {
            user: {
                name: userName,
                password: psw,
                role: this.state.role
            }
        }
        Pubsub.publish("SIGN_UP", data);
    }

    render() {
        let type = this.props.login;
        let ele;
        if(type === "signup"){
            ele = (
                <div>
                <h2>注册</h2>
                <form onSubmit={this.signup}>
                        <div className="form-group">
                            <label>用户名</label>
                            <input type="text" name="user[name]" placeholder="请输入用户名"/>
                        </div>
                        <div className="form-group">
                            <label>密码</label>
                            <input type="password" name="user[password]" placeholder="请输入密码" />
                        </div>
                        <div className="form-radio">
                            <input type="radio" name="user[role]" value="0" defaultChecked onChange={this.onchangehandler} />学员
                            <input type="radio" name="user[role]" value="50" onChange={this.onchangehandler} />教练                            
                        </div>
                        <div className="form-group">
                            <input type="submit" value="提 交"/>
                        </div>
                </form>
                </div>
            );
        } else {
            ele=(
                <div>
                <h2>登录</h2>
               <form onSubmit={this.signin}>
                        <div className="form-group">
                            <label>用户名</label>
                            <input type="text" name="user[name]" placeholder="请输入用户名"/>
                        </div>
                        <div className="form-group">
                            <label>密码</label>
                            <input type="password" name="user[password]" placeholder="请输入密码" />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="提 交"/>
                        </div>
                </form>
                </div>
            );
        }
        return (
             <div className="component-login">
             {ele}
             </div>
        )
    }
}



export default Login;