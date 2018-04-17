import React, { Component } from 'react';
import Store from '../sources/store';
import './lesson1.css';
import { question } from '../sources/question';
import Answer from '../components/answer';
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
    next(){
        var id = this.state.cur_id;
        id++;
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
                    <div className="ques" key={questionEle.id}>{this.state.cur_id * 1 + 1}.{questionEle.question}</div>
                    <Answer item={questionEle.answer} ans={questionEle.check}></Answer>
                    <div className="btn prev">上一题</div>
                    <div className="btn next" onClick={this.next.bind(this)}>下一题</div>                    
                </div>
            </div>
        );
       
    }
}



export default Lesson1;