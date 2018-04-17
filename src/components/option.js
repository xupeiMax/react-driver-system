import React, { Component } from 'react';
import './option.css';
import Pubsub from 'pubsub-js';



class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: []
        };
    }
    componentDidMount() { }
    check(i) {
        Pubsub.publish('SELECTED',i);
    }

    render() {
       
        return (
   
            <span className={`option ${this.props.focus == null ? '' : `${this.props.focus?'right':'error'}`}`}  onClick={this.check.bind(this, this.props.index)}>
                {this.props.children}
            </span>
        )
    }
}



export default Option;