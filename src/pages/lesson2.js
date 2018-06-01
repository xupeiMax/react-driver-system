import React, { Component } from 'react';
import './lesson2.css';
import Coach from '../components/coach';
import { reservations } from '../sources/reservation';
import Pubsub from 'pubsub-js';
import Store from '../sources/store';

class TimeBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
            timeArr:[],
            username: Store.fetch('USER_NAME')
        };
        this.isActive = this.isActive.bind(this);
    }

    componentDidMount() {
        this.isActive();
        console.log(this.state.username)
        Pubsub.subscribe('DO_RESERVATION', (msg,data)=>{
            let index = data.index;
            let id = data.id;
            if(this.state.username){
            } else{
                alert("您还未登录，请登录后预约！")
            }
            // for(let i)
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