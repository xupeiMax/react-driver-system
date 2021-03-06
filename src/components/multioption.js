import React, { Component } from 'react';
import './option.css';


class MultiOption extends Component {
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
        let spanClassName = 'component-option';
        if (this.props.focus === 'checked'){
            spanClassName += ' selected';
        }
        if (this.props.focus === 'right'){
            spanClassName = 'component-option right';
        }
        if (this.props.focus === 'error') {
            spanClassName = 'component-option error';
        }
        if (this.props.focus === 'blue') {
            spanClassName = 'component-option blue';
        }
        return (

            <span className={spanClassName} onClick={this.check.bind(this, this.props.index)}>
                {this.props.children}
            </span>
        )
    }
}



export default MultiOption;