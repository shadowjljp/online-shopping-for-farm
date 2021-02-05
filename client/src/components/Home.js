import React, { Component } from 'react';
import HomeView from './HomeView';

class Home extends Component {
    render() {
      if(this.props.isLoggedIn) {        
        if(this.props.isAdmin) {
          //render the admin products page
          return (
            <HomeView logInMsg={"Welcome to VegeFruit Farms! You are logged in."} adminView={"Admin view"} toPage={"/proudcts"}></HomeView>
          )
        }
        else {
          //render the regular user product page
          return (
            <HomeView logInMsg={"Welcome to VegeFruit Farms! You are logged in."} adminView={"Not admin view"} toPage={"/products"}></HomeView>
          )
        }
      }
      else {
        //render the login page
        return ( 
          <HomeView logInMsg={"Welcome to VegeFruit Farms!"} adminView={"Please login"} toPage={"/login"}></HomeView> 
        )
      }
    }
  }

  export default Home;