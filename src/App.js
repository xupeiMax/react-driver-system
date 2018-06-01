import React, { Component } from 'react';
import './App.css';
// import $ from 'jquery'
import { BrowserRouter as HashRouter, Route, Switch } from 'react-router-dom'
import Pubsub from 'pubsub-js'
import Store from './sources/store';

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
      name: Store.fetch('USER_NAME')
    };
  }
  componentDidMount() {
     
    Pubsub.subscribe('DENG_LU', (msg,name,psw) => {
      this.setState({
          loggedIn: true,
          name: name
      });
      Store.save(name,'USER_NAME')
    })

  }

  componentWillUnmount(){
    Pubsub.unsubscribe('DENG_LU')
    
    // Store.delete('USER_NAME')
  }

  render() {
    const Index = () => (
      <Home
        loggedIn={this.state.name} name={this.state.name}
      />
    );
    const Nav = () => (
      <Header
        loggedIn={this.state.name} name={this.state.name}
      />
    );
    return (
      <HashRouter >
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
      </HashRouter>
    );
  }
}

export default App;
