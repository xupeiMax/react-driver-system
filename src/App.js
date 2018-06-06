import React, { Component } from 'react';
import './App.css';
// import $ from 'jquery'
import { BrowserRouter as HashRouter, Route, Switch } from 'react-router-dom'
import Pubsub from 'pubsub-js'
import Store from './sources/store';

import Header from './components/header'
import Login from './components/login'
import Home from './pages/home'
import Lesson1 from './pages/lesson1'
import Lesson2 from './pages/lesson2'
import Lesson3 from './pages/lesson3'
import Lesson4 from './pages/lesson4'
import $ from "jquery"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loggedIn: false,
      // name: Store.fetch('USER_NAME'),
      user: JSON.parse(Store.fetch('USER'))
    };
  }
  componentDidMount() {
    // console.log('user:')
    // console.log(this.state.user)
    var that = this;
    // $.ajax({
    //   "url": `http://localhost:3001`
    // }).then((result) => {
    //   that.setState({
    //     user: result.user
    //   })
    //   console.log(result)
    // })
    Pubsub.subscribe('SIGN_IN', (msg,data) => {
      $.ajax({
        url: `http://localhost:3001/user/signin`,
        type: "POST",
        data: data,
        dataType: "json",
      }).then((result) => {
        if(result.success){
          that.setState({
            user: result.data
          })
          Store.save(JSON.stringify(result.data),'USER')
          // Store.save(result.data.name,'USER_NAME')
          window.location = '/';
        }else{
          alert(result.message)
        }
      })
      // this.setState({
      //     loggedIn: true,
      //     name: name
      // });
    })

    Pubsub.subscribe('SIGN_UP', (msg, data) => {
      $.ajax({
        url: `http://localhost:3001/user/signup`,
        type: "POST",
        data: data,
        dataType: "json",
      }).then((result) => {
        console.log(result)
        window.location = '/signin';        
      })

    })

  }

  componentWillUnmount(){
    Pubsub.unsubscribe('SIGN_IN')
    Pubsub.unsubscribe('SIGN_UP')    
    // Store.delete('USER_NAME')
  }

  render() {
    const Index = () => (
      <Home
        user={this.state.user}
      />
    );
    const Nav = () => (
      <Header
        user={this.state.user}
      />
    );
    const Signup = () => (
      <Login login="signup" />
    );
    const Signin = () => (
      <Login login="signin" />
    )
    return (
      <HashRouter >
        <section>
          <Nav />
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />            
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
