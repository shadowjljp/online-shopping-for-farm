import React, { Component } from 'react';
import{ Container, Table} from 'reactstrap';
import LogoutButton from './LogoutButton';

class OrderHistory extends Component {
    
    state = {
        ordersList: [],
        orderIdList: []
    }

    getOrderNums(list) {
        //get the unique order numbers 
        var orderList = []
        
        for(var i in list) {
            orderList.push(list[i].order_id)
        }
        var orderNums = [...new Set(orderList)];
        console.log(orderNums)
        return orderNums
    }

    componentDidMount() {
    
        //get orders list
        fetch('http://localhost:5000/orders/'+this.props.user_id)
      .then(res => res.json())
      .then((data) => {
        this.setState({ ordersList: data })
      })
      .catch(console.log)
    }
    render() {
      return (
          <div>
              <div style={divStyle1}>
              <h1>User Profile</h1>
              </div>
    
              <Container>
                <h2>Your Order History</h2>

              <Table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.ordersList.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>${order.total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h3>Log Out Here</h3>
            <LogoutButton history={this.props.history} ></LogoutButton>
          </Container>
          </div>
      )
    }
  }

  var divStyle1 = {
    color: 'black',
    backgroundImage: 'url(/orange.jpg)',
    backgroundSize: 'cover', 
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    padding: '3em 0',
    textAlign: 'center'
  }


  export default OrderHistory;