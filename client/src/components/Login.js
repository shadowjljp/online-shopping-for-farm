import React, { Component } from 'react';
import $ from 'jquery';
import{ Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';


class Login extends Component {
  state = {
    isLoggedIn: false,
    isAdmin: false,
    user_id: "0"
};

  submitForm = (e) => {
      e.preventDefault();

      const loginUser = {
        email: $("#email").val(),
        password: $("#password").val(),
      }

    //send post request
    fetch('http://localhost:5000/users/login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUser),
    })
    .then(response => response.json())
    .then(data => {
      if(data.error) {
        //output any error found from server side validation
        $('#loginError').html(data.error);
      }   
      else { //Login was successful
        //set login and admin info
        this.setState({isLoggedIn: true, isAdmin: data.authority, user_id: data.id});
        this.getLoginInfo();
        //redirect page
        this.props.history.push('/');
        

      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }

  getLoginInfo = () => {
    this.props.callbackFromParent(this.state.isLoggedIn);
    this.props.callbackFromParent2(this.state.isAdmin);
    this.props.callbackFromParent3(this.state.user_id);
  }

  render() {
    return (
      
      <Container>
        <h1>Log In to Account</h1>
        <span className="text-danger" id="loginError"></span>
        <Form onSubmit={this.submitForm} method="POST">
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Enter email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Enter password" />
          </FormGroup>
          <Button type="submit">Log In</Button>
          <Link to="/signup">New user? Sign up here</Link>
        </Form>
      </Container>
      
    );
  }
}

export default Login;


