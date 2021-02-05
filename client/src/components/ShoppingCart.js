import React, { Component } from 'react';
import{ Container, Button, Input, Table } from 'reactstrap';
import CheckoutButton from './CheckoutButton';

class ShoppingCart extends Component {
    state = {
        shoppingCart: []
    }

    componentDidMount() {
        //get shopping cart list
        fetch('http://localhost:5000/shopping-cart')
      .then(res => res.json())
      .then((data) => {
        this.setState({ shoppingCart: data })
      })
      .catch(console.log)

    }

     //calculate total order price
     calcOrderTotal = (suborder) => {
        var total = 0;
        for(var i in suborder) {
            total += suborder[i].weight*suborder[i].price
        }
        return total.toFixed(2);
    }

    //update the state whenever input is changed
    handleChange = (e, index) => {
        let change = this.state.shoppingCart.slice(); //creates the clone of the state
        change[index].weight = e.target.value;
        change[index].sub_total = e.target.value*2
        this.setState({
            shoppingCart: change
        })
    }

    //update the quantity weight value
    updateSuborder = (id, newWeight) => {
        const newChange = {
            weight: newWeight
          }
        fetch('http://localhost:5000/shopping-cart/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newChange),
        })
      .then(res => res.json())
      .then((data) => {
        this.setState({ shoppingCart: data })
      })
      .catch(console.log)
     }

     //delete a suborder
    deleteSuborder = (id) => {
        fetch('http://localhost:5000/shopping-cart/'+id, {
            method: 'DELETE',
        })
      .then(res => res.json())
      .then((data) => {
        this.setState({ shoppingCart: data })
      })
      .catch(console.log)

     }

    
    
    render() {
      return (
        <div>
            <div style={divStyle1}>
              <h1>Shopping Cart</h1>
            </div>
            <Container>
              {/* <h1>Shopping Cart</h1> */}
              <Table>
                <thead>
                    <tr>
                    <th>Product</th>
                    <th>Weight</th>
                    <th></th>
                    <th>Sub Total</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.state.shoppingCart.map((suborder,index) => (
                        <tr key={suborder._id}>
                            <td>{suborder.product_name}</td>
                            <td><Input type="number" value={this.state.shoppingCart[index].weight || ""} onChange={(e)=> this.handleChange(e, index)}></Input></td>
                            <td><Button onClick={()=> this.updateSuborder(suborder._id, this.state.shoppingCart[index].weight )}>Update</Button></td>
                            <td>${(this.state.shoppingCart[index].weight*this.state.shoppingCart[index].price).toFixed(2)}</td>
                            <td><Button onClick={()=> this.deleteSuborder(suborder._id)}>Delete</Button></td>
                        </tr>
                    ))}
                    <tr>
                        <td className="bold">Order Total</td>
                        <td></td>
                        <td></td>
                        <td className="bold">${this.calcOrderTotal(this.state.shoppingCart)}</td>
                        <td></td>      
                    </tr>
                </tbody>
              </Table>
              <CheckoutButton total={this.calcOrderTotal(this.state.shoppingCart)} user_id={this.props.user_id} history={this.props.history}></CheckoutButton>
            </Container>
          </div>  
      )
    }
  }

  var divStyle1 = {
    color: 'black',
    backgroundImage: 'url(/pumpkins.jpg)',
    backgroundSize: 'cover', 
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    padding: '3em 0',
    textAlign: 'center'
  }


  export default ShoppingCart;