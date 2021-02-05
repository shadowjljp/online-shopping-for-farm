import React, { Component } from 'react';
import{ Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';

class CheckoutButton extends Component {
    
    handleClick = () => {
        //add to orders collection
        //send post request
        const order = {
            user_id: this.props.user_id,
		    total: this.props.total
        }
        fetch('http://localhost:5000/orders/add', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

        })
        .catch((error) => {
            console.error('Error:', error);
        });
        this.props.history.push('/order-success');
        
    }
    render() {
      return <Button onClick={this.handleClick.bind(this)}>Checkout</Button>;
    }
  }


  export default withRouter(CheckoutButton);