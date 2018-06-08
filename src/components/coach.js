import React, { Component } from 'react';
import './coach.css';
import logo from '../assets/images/tx.jpg';
import Pubsub from 'pubsub-js';
import Store from '../sources/store';

class TimeSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(Store.fetch('USER'))            
        }
    }
    doReserveHandler(index,id,e){
        let data = {
            index: index,
            id:id
        }
        Pubsub.publish('DO_RESERVATION', data);        
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        let students = this.props.studentitem;
        let index = this.props.index;
        let id = this.props.id;
        
        let timesection = ['8:00-10:00','10:00-12:00','14:00-16:00','16:00-18:00'];
        return (
            <li className={`component-timesection ${this.props.focus ? 'seleted':''}`} onClick={this.doReserveHandler.bind(this,index,id)}>
                <p>{timesection[index]}</p>
                {this.state.user && this.state.user.role * 1 > 0 ? (<p>{students.join('、')}</p>):(<p>共可预约3人 已约{students.length}人</p>)}
            </li>
        )
    }
}

class Coach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }
    componentDidMount() { 
        let user = JSON.parse(Store.fetch('USER'));
        if (user) {
            this.setState({
                username: user.name
            })
        }

    }

    componentWillUnmount(){
    }

    render() {
     
        let coach = this.props.coachitem;
        let timeSection = coach.students;
        let id = coach.id;
        let listEle = null;
        listEle = timeSection.map((item,index) => {
            return (
                <TimeSection key={index} studentitem={item} index={index} id={id} focus={item.indexOf(this.state.username) > -1}></TimeSection>
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