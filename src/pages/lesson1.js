import React, { Component } from 'react';
import Store from '../sources/store'
import './lesson1.css';
import { question } from '../sources/question'


class Lesson1 extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        let listEle = null;
        listEle = question.map((item) => {
            return (
                <div key={item.id} item={item}>{item.question}</div>
            );
        })
        return (
            <ul>
                {listEle}
            </ul>
        );
    }
}



export default Lesson1;