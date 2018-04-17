import React, { Component } from 'react';
import MultiOption from './multioption';
import './answer.css';
import Pubsub from 'pubsub-js';


class MultiAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: [],
            result: '',
            youranswer: []            
        };
        this.check = this.check.bind(this);
    }
    componentDidMount() {
        Pubsub.subscribe("NEXT", (msg) => {
            this.setState({
                check: [],
                result: ''
            })
        })
    }

    componentWillUnmount() {
        Pubsub.unsubscribe("NEXT");
    }

    check(index){
        console.log(index)
        let youranswer = this.state.youranswer;
        let check = this.state.check;
        if (check[index] === 'checked'){
            check[index] = '';
            youranswer.splice(youranswer.indexOf(index))
        }else{
            youranswer[youranswer.length] = index; 
            check[index] = 'checked'
        }
        this.setState({
            youranswer: youranswer,
            check: check
        })
    }

    confirm(e){
        let ans = this.props.ans;
        let youranswer = this.state.youranswer;
        let check = this.state.check;
        let result = this.state.result;
        if (ans.sort().toString() === youranswer.sort().toString()){
            console.log("right")
            youranswer.forEach(i=>{
                check[i] = "right"
            })
        }else{
            console.log("error")
            ans.forEach(i=>{
                if (youranswer.indexOf(i) > 0){
                    check[i] = "right"                    
                }else{
                    check[i] = "blue"
                }
            })
            youranswer.forEach(i=>{
                if (ans.indexOf(i) < 0) {
                    check[i] = "error"
                }
            })
        }
        ans.forEach(i=>{
            switch (i) {
                case 0:
                    result += "A"
                    break;
                case 1:
                    result += "B"
                    break; 
                case 2:
                    result += "C"
                    break; 
                case 3:
                    result += "D"
                    break;
                default:
                    break;
            }
        })
        result = "答案：" + result.split("").join("、")
        this.setState({
            check: check,
            result: result
        })
        e.target.style.display = "none"
    }
    render() {
        let item = this.props.item;
        let check = this.state.check;
        let liEle = null;
    
        liEle = (
            <ul>
                <li><MultiOption index={0} focus={check[0]} check={this.check}>A</MultiOption>{item[0]}</li>
                <li><MultiOption index={1} focus={check[1]} check={this.check}>B</MultiOption>{item[1]}</li>
                <li><MultiOption index={2} focus={check[2]} check={this.check}>C</MultiOption>{item[2]}</li>
                <li><MultiOption index={3} focus={check[3]} check={this.check}>D</MultiOption>{item[3]}</li>
            </ul>
        )

        return (
            <div className="component-answer">
                {liEle}
                <div className="confirm" onClick={this.confirm.bind(this)}>确认答案</div>
                <p>{this.state.result}</p>
            </div>
        )
    }
}



export default MultiAnswer;