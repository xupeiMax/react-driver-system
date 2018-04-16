import React, { Component } from 'react';
import './App.css';
// import $ from 'jquery'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Pubsub from 'pubsub-js'

import Header from './components/header'
import Home from './pages/home'
import Lesson1 from './pages/lesson1'
import Lesson2 from './pages/lesson2'
import Lesson3 from './pages/lesson3'
import Lesson4 from './pages/lesson4'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      name: '青青'
    };
  }
  componentDidMount() {
    Pubsub.subscribe('DENG_LU', (msg) => {
      this.setState({
          loggedIn: true
      })
    })

  }
  render() {
    const Index = () => (
      <Home
        loggedIn={this.state.loggedIn} name={this.state.name}
      />
    );
    const Nav = () => (
      <Header
        loggedIn={this.state.loggedIn} name={this.state.name}
      />
    );
    return (
      <Router >
        <section>
          <Nav />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/lesson1" component={Lesson1} />
            <Route path="/lesson2" component={Lesson2} />
            <Route path="/lesson3" component={Lesson3} />
            <Route path="/lesson4" component={Lesson4} />            
          </Switch>
        </section>
      </Router>
    );
  }
}

export default App;
