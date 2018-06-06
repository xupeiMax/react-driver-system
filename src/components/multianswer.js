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
            youranswer: [],
            youranswernum: []            
        };
        this.check = this.check.bind(this);
    }
    componentDidMount() {
        Pubsub.subscribe("NEXT", (msg) => {
            this.setState({
                check: [],
                result: '',
                descflag: false
            })
        })
    }

    componentWillUnmount() {
        Pubsub.unsubscribe("NEXT");
    }

    check(index){
        console.log(index)
        let abc = 'A';
        let youranswer = this.state.youranswer;
        let youranswernum = this.state.youranswernum;        
        let check = this.state.check;
        switch (index) {
            case 0:
                abc = 'A'
                break;
            case 1:
                abc = 'B'
                break;
            case 2:
                abc = 'C'
                break;
            case 3:
                abc = 'D'
                break;
            default:
                break;
        }
        if (check[index] === 'checked'){
            check[index] = '';
            youranswer.splice(youranswer.indexOf(abc))
            youranswernum.splice(youranswer.indexOf(index))            
        }else{
            youranswer[youranswer.length] = abc; 
            youranswernum[youranswernum.length] = index;            
            check[index] = 'checked'
        }
        this.setState({
            youranswer: youranswer,
            youranswernum: youranswernum,            
            check: check
        })
    }

    confirm(e){
        let ans = this.props.ans.split('');
        let ansnum = [];
        ans.forEach(i=>{
            switch (i) {
                case "A":
                    ansnum.push(0);
                    break;
                case "B":
                    ansnum.push(1);
                    break;
                case "C":
                    ansnum.push(2);
                    break;
                case "D":
                    ansnum.push(3);
                    break;
                default:
                    ansnum.push(0);
                    break;
            }
        })
        let youranswer = this.state.youranswer;        
        let youranswernum = this.state.youranswernum;   
        let check = this.state.check;
        let result = this.state.result;
        if (ans.sort().toString() === youranswernum.sort().toString()){
            console.log("right")
            youranswernum.forEach(i=>{
                check[i] = "right"
            })
        }else{
            console.log("error")
            ansnum.forEach(i=>{
                if (youranswernum.indexOf(i) > -1){
                    check[i] = "right"                    
                }else{
                    check[i] = "blue"
                }
            })
            youranswer.forEach((v,i) => {
                if (ans.indexOf(v) < 0) {
                    check[i] = "error"
                }
            })
        }
        result = "答案：" + ans.join("、")
        this.setState({
            check: check,
            result: result,
            descflag: true
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
                {this.state.descflag ? (<p>解析： {this.props.desc}</p>) : ''}                                
            </div>
        )
    }
}



export default MultiAnswer;