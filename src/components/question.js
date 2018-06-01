import React, { Component } from 'react';
import './question.css';
import Answer from '../components/answer';
import MultiAnswer from '../components/multianswer';
// import { question } from '../sources/question';
// import { Link } from 'react-router-dom';

class Question extends Component{
    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
    componentDidMount() { }
    next(type) {
        this.props.next(type);
    }
    render(){
        // let id = this.props.match.params.id;
        // if(id < 1){
        //     id = 1
        // }
        // let questionEle = question[id -1];
        let questionEle = this.props.questionEle;
        let spanEle = null;
        let answerEle = null;
        if(questionEle.answer.length > 2){
            if(questionEle.check.length > 1){
                spanEle = (<span>多选题</span>)
                answerEle = (<MultiAnswer item={questionEle.answer} ans={questionEle.check}></MultiAnswer>)
            }else{
                spanEle = (<span>单选题</span>)
                answerEle = (<Answer item={questionEle.answer} ans={questionEle.check}></Answer>)
            }
        }else{
            spanEle = (<span>判断题</span>)
            answerEle = (<Answer item={questionEle.answer} ans={questionEle.check}></Answer>)            
        }
        return(
            <div className="component-question">
                <div className="ques" key={questionEle.id}>{spanEle}{this.props.model?'':questionEle.id + '. '} {questionEle.question}</div>
                {answerEle}
                <div className="btn mt30 prev" onClick={this.next.bind(this, -1)}>上一题</div>
                <div className="btn mt30 next" onClick={this.next.bind(this, 1)}>下一题</div> 
            </div> 
        )
    }
}

export default Question;