import React, { Component } from 'react';
import{ Button} from 'reactstrap';

class LogoutButton extends Component {
    
    handleClick = () => {
        localStorage.clear()
        this.props.history.push('/login');
        
    }
    render() {
      return <Button onClick={this.handleClick.bind(this)}>Log Out</Button>;
    }
  }


  export default LogoutButton;