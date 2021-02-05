import React, { Component } from 'react';
import { useLocation, Link } from "react-router-dom";
import{ Button} from 'reactstrap';
import './product.css';
import $ from 'jquery';

class ProductDetail extends Component {
    
    state = {
        product: "",
        quantity: 0
    }

    //update the state whenever input is changed
    handleChange = (e) => {
        $('#Msg').hide()
        this.setState({
            quantity: e.target.value,
            }
        );
    }
    handleClick = () => {

        if(this.state.quantity < this.state.product.Stock_weight) {
            const item = {
                Name: this.state.product.Name,
                Weight: this.state.quantity,
                Price: this.state.product.Price
            }

            //send post request
            fetch('http://localhost:5000/shopping-cart/add', {
                method: 'POST', 
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        else {
            $('#Msg').html("These is not enough inventory left")
        }
        

    }

    componentDidMount() {  //called after the page is rendered.
        console.log(this.props.history.location.state.ids)
        fetch('http://localhost:5000/products/'+this.props.history.location.state.ids) //ajax call
        .then(res => res.json())
        .then((data) => {
          console.log(data)
          this.setState({ product: data })  //set state varible video
        })
        .catch(console.log)
      }
    render() {
      return (
          <div>
            <div><img alt="pic" src={'/images/' + this.state.product.Name + '.jpg'}></img></div>
            <div class="card-body">
            <h5 class="card-title">Product Name : {this.state.product.Name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Price : $ {this.state.product.Price}</h6>
            <p class="card-text">Product Weight : {this.state.product.Stock_weight} lbs</p>
            <p class="card-text">Product Description : {this.state.product.Description}</p>
            <Link className="btn" to={{pathname: "/products/"+this.state.product._id+"/edit", state:{ids: this.state.product._id}}}>Edit</Link>
            <Link className="btn" to={{pathname: "/products/create"}}>Create</Link>
            <Link className="btn" to={{pathname: "/products/delete", state:{ids: this.state.product._id}}}>Delete</Link>
            <label>Quanity
            <input type="number" onChange={(e)=> this.handleChange(e)}></input>
            </label>
            
            <Button className="btn" onClick={this.handleClick} >Add to Shopping Cart</Button>
            <span id="Msg" className="text-danger"></span>
            </div>
          </div>

      );
    }
  }


// const ProductDetail = (props) => {

//     const { state } = useLocation();
//     const rows = [];


//     console.log('admin'+props.isAdmin)
//     console.log(props.id)
    
 /*       return (
            <div>
                {rows}
                <p><Link to={{pathname :state.ids._id+"/edit",state:{edit: state.ids}          
          }}><button>Edit</button></Link><Link to="/PRODUCTS/create"><button>Create</button></Link></p>
          
                <Link to="/products">Back to Products</Link>
            </div>
        )*/
//     rows.push(
//         <div class="card" key={props.ids}>
//             <div><img alt="pic" src={'/images/' + props.Name + '.jpg'}></img></div>
//             <div class="card-body">
//                 <h5 class="card-title">Product Name : {state.ids.Name}</h5>
//                 <h6 class="card-subtitle mb-2 text-muted">Price : $ {state.ids.Price}</h6>
//                 <p class="card-text">Product Weight : {state.ids.Stock_weight} lbs</p>
//                 <p class="card-text">Product Description : {state.ids.Description}</p>
//             </div>
//         </div>);

    
//         return (
//             <div>
//                 <h1>{props}</h1>
//                 {/* {rows}
//                 <p><Link to={{pathname :state.ids._id+"/edit",state:{edit: state.ids}          
//           }}><button>Edit</button></Link></p>
//                 <Link to="/products">Back to Products</Link> */}
//             </div>
//         )
   

// }


export default ProductDetail