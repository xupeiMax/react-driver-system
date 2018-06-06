import React, { Component } from 'react';
import Option from './option';
import './answer.css';
import Pubsub from 'pubsub-js';


class Answer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: [],
            result:'',
            descflag: false
        };
        this.check = this.check.bind(this);
    }
    componentDidMount() { 
        Pubsub.subscribe("NEXT",(msg)=>{
            this.setState({
                check: [],
                result: ''
            })
        })

    }

    componentWillUnmount(){
        Pubsub.unsubscribe("NEXT");
    }
    check(index){
        var ans = this.props.ans;
        console.log(ans)
        var ansIdx = 0;
        switch (ans) {
            case "A":
                ansIdx = 0;
                break;
            case "B":
                ansIdx = 1;
                break;
            case "C":
                ansIdx = 2;
                break;
            case "D":
                ansIdx = 3;
                break;
            default:
                ansIdx = 0;            
                break;
        }
        var check = this.state.check;
        if (ansIdx !== index) {
            check[index] = false;
        }
        check[ansIdx] = true;
        this.setState({
            check: check,
            result: '答案：' + ans,
            descflag: true
        });
    }
    render() {
        let item = this.props.item;
        let liEle = null;
        if (item[2]) {
            liEle = (
                <ul>
                    <li><Option index={0} focus={this.state.check[0]} check={this.check}>A</Option>{item[0]}</li>
                    <li><Option index={1} focus={this.state.check[1]} check={this.check}>B</Option>{item[1]}</li>
                    <li><Option index={2} focus={this.state.check[2]} check={this.check}>C</Option>{item[2]}</li>
                    <li><Option index={3} focus={this.state.check[3]} check={this.check}>D</Option>{item[3]}</li>
                </ul>
            )
        } else {
            liEle = (
                <ul>
                    <li><Option index={0} focus={this.state.check[0]} check={this.check}>A</Option>{item[0]}</li>
                    <li><Option index={1} focus={this.state.check[1]} check={this.check}>B</Option>{item[1]}</li>
                </ul>
            )
        }

        return (
            <div className="component-answer">
                {liEle}
                <p>{this.state.result}</p>
                {this.state.descflag ? (<p>解析： {this.props.desc}</p>) : ''}                                                              
            </div>
        )
    }
}



export default Answer;