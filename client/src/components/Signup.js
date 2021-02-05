import React, { Component } from 'react';
import $ from 'jquery';
import{ Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';

class Signup extends Component {
  componentDidMount() {    

    //jQuery form validation
    $("#email").focusin(function() {
      $('#emailMsg').removeClass("text-danger text-success");
      $("#emailMsg").html("Enter an email address");
      $('#emailMsg').addClass("text-info");
      $('#emailMsg').show();
    });

        
    $("#email").focusout(function() {
      var emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if($("#email").val().match(emailRegEx)) {
        //check if email exists or not
        $.ajax({
          method: 'GET',
          url: 'http://localhost:5000/users',
          success: function(users) {
            var flag = false;
            $.each(users, function(i, user) {  
              if(user.email === $("#email").val() ) {
                flag = true;
              } 
              
              })  
              if(flag) {
              $('#emailMsg').removeClass("text-success text-info");
              $("#emailMsg").html("Email already exists");
              $('#emailMsg').addClass("text-danger");
              $('#emailMsg').show();
              } else {
                $('#emailMsg').removeClass("text-danger text-info");
                $("#emailMsg").html("Valid email");
                $('#emailMsg').addClass("text-success");
                $('#emailMsg').show(); 
            }           
          }
        });
        }
      else {
        $('#emailMsg').removeClass("text-success text-info");
        $("#emailMsg").html("Not a valid email");
        $('#emailMsg').addClass("text-danger");
        $('#emailMsg').show();
        }
      
    });

    $("#password").focusin(function() {
      $('#pswdMsg').removeClass("text-danger text-success");
      $("#pswdMsg").html("Password must be at least 6 characters with at least one uppercase letter, at least one lowercase letter, and at least one number");
      $('#pswdMsg').addClass("text-info");
      $('#pswdMsg').show();
      
    });

    $("#password").focusout(function() {
      var passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if($("#password").val().match(passwordRegEx)) {
        $('#pswdMsg').removeClass("text-info text-danger");
        $("#pswdMsg").html("Valid password");
        $('#pswdMsg').addClass("text-success");
        
        $('#pswdMsg').show();
      }
      else {
        $('#pswdMsg').removeClass("text-success text-info");
        $("#pswdMsg").html("Password not valid");
        $('#pswdMsg').addClass("text-danger");
        $('#pswdMsg').show();
      }
    });

      $("#phone").focusin(function() {
        $('#phoneMsg').removeClass("text-danger text-success");
        $("#phoneMsg").html("Enter a phone number XXX-XXX-XXXX");
        $('#phoneMsg').addClass("text-info");
        $('#phoneMsg').show();
        
      });

      $("#phone").focusout(function() {
        var phoneRegEx = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
        if($("#phone").val() !=="") {
          if($("#phone").val().match(phoneRegEx)) {
            $('#phoneMsg').removeClass("text-info text-danger");
            $("#phoneMsg").html("Valid phone number");
            $('#phoneMsg').addClass("text-success");
            $('#phoneMsg').show();
          }
          else {
            $('#phoneMsg').removeClass("text-success text-info");
            $("#phoneMsg").html("Phone number not valid");
            $('#phoneMsg').addClass("text-danger");
            $('#phoneMsg').show();
          }
        } else {
          $('#phoneMsg').hide();
        }
        
      });

      $("#address").focusin(function() {
        $('#addressMsg').removeClass("text-danger text-success");
        $("#addressMsg").html("Enter an address");
        $('#addressMsg').addClass("text-info");
        $('#addressMsg').show();
        
      });

      $("#address").focusout(function() {
        $('#addressMsg').hide();
      });

  }


 
    submitForm = (e) => {
        e.preventDefault();

        const newUser = {
          email: $("#email").val(),
          password: $("#password").val(),
          phone_number: $("#phone").val(),
          address: $("#address").val(),
          authority: 0
        }
            
        //send post request
        fetch('http://localhost:5000/users/add', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
        .then(response => response.json())
        .then(data => {
          //console.log('Success:', data);
          if(data.error) {
            //output any error found from server side validation
            $('#signupMsg').removeClass("text-success");
            $('#signupMsg').addClass("text-danger");
            $('#signupMsg').html(data.error);
          }   
          else { //Sign up was successful
            $('#signupForm').trigger("reset");
            $('#signupMsg').removeClass("text-danger");
            $('#signupMsg').addClass("text-success");
            $("#signupMsg").html("Sign up success");
            $('#emailMsg').hide();
            $('#pswdMsg').hide();
            $('#phoneMsg').hide();
            $('#addressMsg').hide();
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        //this.props.history.push('/login');
            
        
    }

  render() {
    return (
      <Container>
          <h1>Sign Up for an Account</h1>
          <span id="signupMsg"></span>
      <Form id="signupForm" onSubmit={this.submitForm} method="POST" >
        <FormGroup>
          <Label for="email">Email*</Label>
          <Input type="email" name="email" id="email" placeholder="Enter a email" />
          <span id="emailMsg"></span>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password*</Label>
          <Input type="password" name="password" id="password" placeholder="Enter a password" />
          <span id="pswdMsg"></span>
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone Number</Label>
          <Input type="text" name="phone" id="phone" placeholder="Enter phone number" />
          <span id="phoneMsg"></span>
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" placeholder="Enter address" />
          <span className="text-danger" id="addressMsg"></span>
        </FormGroup>
        <Button type="submit">Sign Up</Button>
        <Link to="/login">Already registered? Log in here</Link>
      </Form>

      </Container>
      
    );
    
  }

}

export default Signup;