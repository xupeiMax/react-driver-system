import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Store from '../sources/store';
import './question.css';
import Answer from '../components/answer';
import MultiAnswer from '../components/multianswer';
import logo from '../assets/images/tx.jpg';

class Question extends Component{
    constructor(props) {
        super(props);
        this.state = {
          user: JSON.parse(Store.fetch('USER'))
        };
    }
    componentDidMount() { }
    next(type) {
        this.props.next(type);
    }
    render(){
        let questionEle = this.props.questionEle;
        let qNum = this.props.qNum + 1;
        let spanEle = null;
        let answerEle = null;
        let user = this.state.user;

        if(questionEle.options.length > 2){
            if(questionEle.check.length > 1){
                spanEle = (<span>多选题</span>)
                answerEle = (<MultiAnswer item={questionEle.options} ans={questionEle.check} desc={questionEle.description}></MultiAnswer>)
            }else{
                spanEle = (<span>单选题</span>)
                answerEle = (<Answer item={questionEle.options} ans={questionEle.check} desc={questionEle.description}></Answer>)
            }
        }else{
            spanEle = (<span>判断题</span>)
            answerEle = (<Answer item={questionEle.options} ans={questionEle.check} desc={questionEle.description}></Answer>)            
        }
        
        return(
            <div className="component-question">
                <div className="ques" key={questionEle._id}>{spanEle}{this.props.model?'':qNum + '. '} {questionEle.title}</div>
                {questionEle.flash ? (<div className="flash"><embed src={questionEle.flash} width="300" height="150"></embed></div>): ''}
                {answerEle}
                <div className="btn mt30 prev" onClick={this.next.bind(this, -1)}>上一题</div>
                <div className="btn mt30 next" onClick={this.next.bind(this, 1)}>下一题</div> 
                <div className="comment-area panel panel-default">
                    <div className="panel-heading">
                        <h3>评论区</h3>
                    </div>
                    <div className="panel-body">
                        <ul className="media-list">
                            <li className="media">
                                <div className="pull-left">
                                    <a className="comment">
                                        <img src={logo} width="64" height="64" />
                                    </a>
                                </div>
                                <div className="media-body">
                                    <h4 className="media-heading">xupei</h4>
                                    <p>真坑！</p>
                                    <div className="media">
                                        <div className="pull-left">
                                            <a className="comment">
                                                <img src={logo} width="64" height="64" />
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <h4 className="media-heading">dayao</h4>
                                            <p>是的！</p>                                            
                                        </div>                                
                                    </div>
                                </div>
                                
                            </li>
                            <hr/>
                            <div id="comment">
                                <form>
                                    <input type="hidden" name="comment[question]" value={questionEle._id} />
                                    {user === null ?'': (<input type="hidden" name="comment[from]" value={user._id} />)}
                                    <div className="form-group">
                                        <textarea className="form-control" name="comment[content]" rows="3"></textarea>
                                        {user === null ?(<span className="btn-link"><Link to="/signin">登录后评论</Link></span>):(<button className="btn btn-primary" type="submit">提交</button>)}
                                    </div>
                                </form>
                            </div>
                        </ul>
                    </div>
                </div>
            </div> 
        )
    }
}

export default Question;