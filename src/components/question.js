import React, { Component } from 'react';
import './question.css';
import Answer from '../components/answer';
import MultiAnswer from '../components/multianswer';

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
            <div>
                <div className="ques" key={questionEle.id}>{spanEle}{this.props.cur_id * 1 + 1}.{questionEle.question}</div>
                {answerEle}
                <div className="btn prev" onClick={this.next.bind(this, -1)}>上一题</div>
                <div className="btn next" onClick={this.next.bind(this, 1)}>下一题</div>   
            </div> 
        )
    }
}

export default Question;