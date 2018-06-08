import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Pubsub from 'pubsub-js';
import $ from 'jquery';
import Store from '../sources/store';
import './lesson1.css';
// import { QUESTIONS } from '../sources/question';
import Question from '../components/question';
import Test from '../components/test';


class Lesson1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: [],            
            cur_id: Store.fetch("question_id") === null ? 0:Store.fetch("question_id"),
            model: '',
            sui_id: [],
            idx: 0
        };
    }

    componentDidMount() { 
        var that = this;
        $.ajax({
          "url": `http://localhost:3001/question?subject=1`
        }).then((result) => {
          if(result.success){
            console.log(result.data)
            that.setState({
                question: result.data
            })
        }
        })
    }

    componentWillUnmount() {
        Store.save(this.state.cur_id, "question_id");
    }

    next(type){
        var cur_id = this.state.cur_id;
        var sui_id = this.state.sui_id;
        var idx = this.state.idx;
        var model = this.state.model;
        if(type > 0){
            switch (model) {
                case "shunxu":
                    if (cur_id < this.state.question.length - 1) cur_id++;
                    this.setState({
                        cur_id: cur_id
                    })
                    break;
                case "random":
                    sui_id[sui_id.length] = Math.floor(Math.random() * this.state.question.length);
                    idx++;
                    this.setState({
                        sui_id: sui_id,
                        idx: idx
                    })               
                    break;
                default:
                    if (cur_id < this.state.question.length - 1) cur_id++;
                    this.setState({
                        cur_id: cur_id
                    })
                    break;
            }
        }else{
            switch (model) {
                case "shunxu":
                    if(cur_id > 0){
                        cur_id--;
                        this.setState({
                            cur_id: cur_id
                        })
                    }
                    break;
                case "random":
                    if (idx > 0) {
                        idx--;
                        this.setState({
                            idx: idx
                        })
                }
                    break;   
                default:
                    if (cur_id > 0) {
                        cur_id--;
                        this.setState({
                            cur_id: cur_id
                        })
                    }
                    break;
            }
        }
        Pubsub.publish("NEXT");
    }

    setModel(model){
        this.setState({
            model: model,
            sui_id: [Math.floor(Math.random() * this.state.question.length)]
        })
    }
    render() {
        let question = this.state.question;
        let questionEle = null;
        if (question.length === 0) {
            return (
                <h2>还没有题目哦！</h2>
            )
        } else {

            if(this.state.model === "random"){
                questionEle = question[this.state.sui_id[this.state.idx]];
            }else{
                questionEle = question[this.state.cur_id];
            }
            const Index = () =>(
                <div className="modelwrap">
                    <Link to="/lesson1/exercise">
                        <div className="ques-model" onClick={this.setModel.bind(this,"shunxu")}>顺序做题
                        </div>
                    </Link>
                    <Link to="/lesson1/exercise">
                        <div className="ques-model" onClick={this.setModel.bind(this, "random")}>随机做题
                        </div>
                    </Link>
                    <Link to="/lesson1/exam">
                        <div className="ques-model" onClick={this.setModel.bind(this, "test")}>模拟考试
                        </div>
                    </Link>
                </div>
      
            )
            const Dowork = () => (
                <Question questionEle={questionEle} qNum={this.state.cur_id} next={this.next.bind(this)} model={this.state.model==="random"}></Question>
            )
            return (
                <div className="component-lesson1">
                    <div className="inner">
                        <Router>
                            <Switch>
                                <Route exact path="/lesson1" component={Index} />
                                <Route path="/lesson1/exercise" component={Dowork} />
                                <Route path="/lesson1/exam" component={Test} />                            
                            </Switch>
                        </Router>
                           
                    </div>
                    
                </div>
            );
           
        }
        }
}



export default Lesson1;