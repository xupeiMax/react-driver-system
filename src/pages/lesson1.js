import React, { Component } from 'react';
import Store from '../sources/store';
import './lesson1.css';
import { question } from '../sources/question';
import Question from '../components/question';
import Pubsub from 'pubsub-js';


class Lesson1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cur_id: 0
        };
    }

    componentDidMount() { 
        this.setState({
            cur_id: Store.fetch()
        })
    }

    componentWillUnmount() {
        Store.save(this.state.cur_id);
    }

    next(type){
        var id = this.state.cur_id;
        if(type > 0){
            id++;
        }else{
            id--;
        }
        Pubsub.publish("NEXT");
        this.setState({
            cur_id: id
        })
    }

    render() {
        let questionEle = null;
        questionEle = question[this.state.cur_id];
        return (
            <div className="question-wrap">
                <div className="inner">
                    <Question questionEle={questionEle} cur_id={this.state.cur_id} next={this.next.bind(this)}></Question>                
                </div>
            </div>
        );
       
    }
}



export default Lesson1;