import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';


const OrderSuccess = (props) => {
  return (
    <Container >
        <h2>Your order has been processed. Thank you for purchasing from VegeFruit Farms!</h2>
        <Link to="/">Return to Home Page</Link>
    </Container>
  );
}

export default OrderSuccess;
