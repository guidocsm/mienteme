
import './App.css';
import Home from './pages/index/Home';
import React, { Component } from 'react'
import { Switch, Route, Redirect, Navbar } from 'react-router-dom'
// import Footer from './layout/Footer/Footer'
// import Navbar from './layout/Navigation/Navbar'
import SignupPage from './pages/Signup/SignupPage';
import LoginPage from './pages/Login/LoginPage';
import AllUsers from './pages/allUsers/allUsers';
import AuthService from './services/auth.service';
// import UserProfile from './pages/allUsers/UserProfile';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedUser: undefined
    }

    this.authService = new AuthService()
  }

  componentDidMount() {
    this.authService.isloggedin()
      .then(response => this.storeUser(response.data))
      .catch(err => this.storeUser(null))
  }

  storeUser = (user) => {
    this.setState({ loggedUser: user })
  }

  logout = () => {
    this.authService.logout()
      .then(response => this.storeUser(null))
      .catch(err => console.log(err))
  }


  render() {
    return (
      <>

        {/* <Navbar storeUser={this.storeUser} loggedUser={this.state.loggedUser} /> */}

        <main>
          <Switch>
            <Route path="/" exact render={() => <Home logout={this.logout} loggedUser={this.state.loggedUser}/>} />
            <Route path="/allUsers" exact render={() => <AllUsers />} />
            {/* <Route path="/user/:id" render={(props) => <UserProfile {...props} />} /> */}
            {this.state.loggedUser ?
              <Redirect to="/" />
              :
              <>
                
                <Route path="/singup" render={(props) => <SignupPage {...props} storeUser={this.storeUser} />} />
                <Route path="/login" render={(props) => <LoginPage {...props} storeUser={this.storeUser} />} />
              </>
            }
      
          </Switch>
        </main>

        {/* <Footer /> */}
      </>
    )
  }
}

export default App;