import React, { Component } from 'react';
import './lesson2.css';
import Coach from '../components/coach';
import { RESERVATIONS } from '../sources/reservation';
import Pubsub from 'pubsub-js';
import Store from '../sources/store';

class TimeBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleClick = this.handleClick.bind(this);        
    }
    handleClick(e) {
        this.props.isActive(this.props.index);

        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        let timeboxClassName = 'timebox';
        timeboxClassName += this.props.active ? ' active' : '';
        return (
            <div className={timeboxClassName} onClick={this.handleClick}><span>{this.props.m}-{this.props.d}</span><span>{this.props.w}</span></div>
        )
    }
}

class Lesson2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: RESERVATIONS,            
            timeArr:[],
            username: ''
        };
        this.isActive = this.isActive.bind(this);
    }

    componentDidMount() {
        let user = JSON.parse(Store.fetch('USER'));
        if(user){
            this.setState({
                username: user.name
            })
        }
        this.isActive();
        // console.log(this.state.username)
        Pubsub.subscribe('DO_RESERVATION', (msg,data)=>{
            let index = data.index;
            let id = data.id;
            let name = this.state.username;
            let reservations = this.state.reservations;
            if(name){
                for (let i = 0; i < reservations.length;i++){
                    if (reservations[i].id === id) {
                        let students = reservations[i].students[index];
                        if (students.indexOf(name) > -1) {
                            students.splice(students.indexOf(name), 1);
                            alert("您已成功取消预约！");
                        } else {
                            if(students.length === 3) {
                                alert("抱歉，已约满。请预约其它时间！");
                                return false;
                            }
                            students.push(name);
                            alert("您已成功预约！");                            
                        }
                        this.setState({
                            reservations: reservations
                        })
                        break;
                    }
                }
            } else{
                alert("您还未登录，请登录后预约！")
            }
        });        
    }

    componentWillUnmount() {
        Pubsub.unsubscribe('DO_RESERVATION')
    }

    isActive(idx) {
        var index = idx || 0;
        var arr = [];
  
        arr[index] = true;

        this.setState({
            timeArr: arr
        })
    }
    
    render() {
        let week = ['周日','周一','周二','周三','周四','周五','周六'];
        let timebox = [];        
        for(let i = 0;i < 7;i++){
            let now = new Date();
            now.setDate(now.getDate() + i);
            let m = now.getMonth() + 1;
            let d = now.getDate();
            let w = now.getDay();
            timebox.push(<TimeBox key={i} index={i} m={m} d={d} w={week[w]} active={this.state.timeArr[i]} isActive={this.isActive}/>)
        }
        
        let listEle = null;
        let reservations = this.state.reservations;
        listEle = reservations.map((item) => {
            return (
                <Coach key={item.id} coachitem={item}></Coach>
            );
        })

        return (
            <div className="container">
                <div className="row clearfix">
                    <div className="arrow"><span className="glyphicon glyphicon-chevron-left"></span></div>
                    {timebox}
                    <div className="arrow"><span className="glyphicon glyphicon-chevron-right pull-right"></span></div>
                </div>
                <div className="col-md-12">
                    <form method="get" action="">
                    <div className="input-group">
                        <input className="form-control" type="text" name="q" />
                        <span className="input-group-btn"><button id="search" className="btn btn-default" type="submit">搜索</button></span>
                    </div>
                    </form>
                </div>
                <ul className="media-list">
                {listEle}
                </ul>
            </div>
        )
    }
}

export default Lesson2;