import React, { Component } from 'react';
// import Option from './option';
import './coach.css';
import logo from '../assets/images/tx.jpg';
import Pubsub from 'pubsub-js';

class TimeSection extends Component {
    constructor(props) {
        super(props);
    }
    doReserveHandler(index,id,e){
        let data = {
            index: index,
            id:id
        }
        Pubsub.publish('DO_RESERVATION', data);        
        // this.props.doReserve(index);
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        let students = this.props.studentitem;
        let index = this.props.index;
        let id = this.props.id;
        
        let timesection = ['8:00-10:00','10:00-12:00','14:00-16:00','16:00-18:00'];
        return (
            <li className="component-timesection" onClick={this.doReserveHandler.bind(this,index,id)}>
                <p>{timesection[index]}</p>
                <p>共可预约3人 已约{students.length}人</p>
            </li>
        )
    }
}

class Coach extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.doReserve = this.doReserve.bind(this);        
    }
    componentDidMount() { 


    }

    componentWillUnmount(){
    }

    doReserve(idx){

    }

    render() {
     
        let coach = this.props.coachitem;
        let timeSection = coach.students;
        let id = coach.id;
        let listEle = null;
        listEle = timeSection.map((item,index) => {
            return (
                <TimeSection key={index} studentitem={item} index={index} id={id} doReserve={this.doReserve}></TimeSection>
            );
        })
        return (
                <li className="component-coach col-md-5">
                    <div className="media">
                        <div className="pull-left">
                            <a href="#">
                                <img className="media-object" src={coach.coach.avatarUrl || logo} alt="logo" width="55" height="55"  />
                            </a>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">{coach.coach.name}</h4>
                            <p>{coach.coach.tel}</p>  
                        </div>
                    </div>
                    <ul>
                    {listEle}                 
                    </ul>
                </li>
              
        )
    }
}



export default Coach;