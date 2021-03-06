import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Register from './components/Register';
import NavBar from './components/NavBar';
import { tokenCheck } from './actions/auth';
import axios from 'axios';
import { tokenCheck, logout } from './actions/auth';
import Home from './components/Home';
import Auth from './components/Auth';

class App extends React.Component {
  state = { user: {} } 
  
  loginUser = () => {
    let user = tokenCheck();
    for ( let key of Object.keys(user) ) {
      axios.defaults.headers.common[key] = user[key]
    }

    this.setState({ user });
  }

  logoutUser = () => {
    axios.delete('/auth/sign_out')
      .then( () => {
        logout()
        this.setState({ user: {} })
    });
  }

  componentDidMount() {
    let user = tokenCheck();
    if (user) {
      for ( let key of Object.keys(user) ) {
        axios.defaults.headers.common[key] = user[key]
      }

      axios.get('/auth/validate_token')
        .then( ({ data: { data }}) => {
          this.setState({ user: {...user, ...data } }) 
        })
    }
  }

  render() {
    let { user } = this.state;
    return (
      <div>
        <NavBar logoutUser={this.logoutUser} user={this.state.user.id} />
        <Container>
          { user.id ? <Home user={user} /> : <Auth loginUser={this.loginUser} /> }
        </Container>
      </div>
    )
  }

export default App;