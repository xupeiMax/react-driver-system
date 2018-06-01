import React, { Component } from 'react';
import './option.css';


class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: []
        };
    }
    componentDidMount() { }
    check(i) {
        this.props.check(i);
    }

    render() {
       
        return (
   
            <span className={`component-option ${this.props.focus == null ? '' : `${this.props.focus?'right':'error'}`}`}  onClick={this.check.bind(this, this.props.index)}>
                {this.props.children}
            </span>
        )
    }
}



export default Option;