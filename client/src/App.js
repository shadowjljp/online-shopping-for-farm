import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import ProductData from './components/ProductData';
import ProductDetail from './components/ProductDetail';
import OrderHistory from './components/OrderHistory';
import NavBar from './components/NavBar';
import NavBarLoggedIn from './components/NavBarLoggedIn';
import Footer from './components/Footer';
import ProductEdit from './components/ProductEdit';
import Create from './components/create';
import OrderSuccess from './components/OrderSuccess';

class App extends Component {
  state = {
    isLoggedIn: this.convertStringToBoolean(localStorage.getItem('isLoggedIn')), //localStorage converts the boolean to strings so convert back to boolean
    isAdmin: this.convertStringToBoolean(localStorage.getItem('isAdmin')),
    shoppingCart: [],
    user_id: localStorage.getItem('user_id')

  };

  convertStringToBoolean(string) {
    if (string == "true")
      return true;
    else
      return false;
  }

  //for passing data from child component to parent component
  //get the login data from Login component
  myCallback = (dataFromLogin) => {
    localStorage.setItem('isLoggedIn', dataFromLogin);
    this.setState({
      isLoggedIn: dataFromLogin,
    });
  }


  //get the admin data from Login component
  myCallback2 = (dataFromLogin) => {
    localStorage.setItem('isAdmin', dataFromLogin);
    this.setState({
      isAdmin: dataFromLogin
    });
  }

    //get the user id data from Login component
    myCallback3 = (dataFromLogin) => {
      localStorage.setItem('user_id', dataFromLogin);
      this.setState({
        user_id: dataFromLogin
      });
    }


  render () {
    if(this.state.isLoggedIn) {
      //display the correct view depending on if user is logged in
      return (
        <Router>
          <NavBarLoggedIn></NavBarLoggedIn>
           
            <Route path="/login" exact render={(props) => (
                <Login {...props} callbackFromParent={this.myCallback} callbackFromParent2={this.myCallback2} callbackFromParent3={this.myCallback3}/> )}/> 
            <Route path="/signup" exact component={Signup} />
            <Route path="/" exact render={(props) => (
                <Home {...props} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} /> )} />
            <Route path="/order-history" exact render={(props) => (
                <OrderHistory {...props} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} user_id={this.state.user_id} /> )} />
            <Route path="/shopping-cart" exact render={(props) => (
                <ShoppingCart user_id={this.state.user_id} /> )} />
            <Route path="/products" exact component={ProductData} />
            <Route path="/products/:id" exact render={(props) =>(< ProductDetail {...props} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin}/>)} />
            <Route path="/products/:id/edit" exact render={(props) =>(< ProductEdit {...props} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin}/>)} />
            <Route path="/create" exact component={Create} />
            <Route path="/order-success" exact render={(props) => (<OrderSuccess {...props}  /> )} />
            {/* <Route path="/order-success" exact component={OrderSuccess} /> */}
          <Footer className="footer"></Footer>
            
        </Router>
        
      );
    } else {
      return (
        <Router>
          <NavBar></NavBar>
           
            <Route path="/login" exact render={(props) => (
                <Login {...props} callbackFromParent={this.myCallback} callbackFromParent2={this.myCallback2} callbackFromParent3={this.myCallback3}/> )}/> 
            <Route path="/signup" exact component={Signup} />
            <Route path="/" exact render={(props) => (
                <Home {...props} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} /> )} />
            <Route path="/order-history" exact render={(props) => (
                <OrderHistory {...props} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin} user_id={this.state.user_id} /> )} />
            <Route path="/shopping-cart" exact render={(props) => (
                <ShoppingCart /> )} />
            <Route path="/products" exact component={ProductData} />
            <Route path="/products/:id" exact render={(props) =>(< ProductDetail />)} />
            <Route path="/products/:id/edit" exact render={(props) =>(< ProductEdit {...props} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin}/>)} />
          <Footer className="footer"></Footer>
  
        </Router>
        
      );
    }

  }
  
}

export default App;
