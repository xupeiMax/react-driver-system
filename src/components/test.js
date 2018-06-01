import React, { Component } from 'react';
import './test.css';

class Test extends Component {
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
            <span className="red">
               132456789
            </span>
        )
    }
}



export default Test;