import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './product.css';
import ProductDetail from './ProductDetail';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Products extends React.Component {
  state = {
    products: this.props.products
}
componentDidMount() {
  //console.log(this.props.products)

}


  render() {
    const filterText = this.props.filterText;
    const category = this.props.category;
    return (
      <div>
      
          {this.props.products.filter(function (product) {
          if (filterText !='' && product.Name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            console.log('filterText'+filterText);
            return false;
          }
          if(product.Type.toLowerCase().localeCompare(category) !==0 && category.localeCompare("All") !== 0 && category !==''){
            return false;
          }
          return true;}).map((product,index) => (
            
            <div class="card" key={product._id}>     
            <div><Link to={"/products/"+product._id} render={(props) =>(< ProductDetail {...props} id={product._id} isLoggedIn={this.state.isLoggedIn} isAdmin={this.state.isAdmin}/>)}>
                    <img alt="pic" src={ '/images/'+ product.Name + '.jpg'}></img></Link></div>
          {/* <div><Link to={{pathname : product._id,state:{ids: product}          
          }} ><img alt="pic" src={ '/images/'+ product.Name + '.jpg'}></img></Link></div> */}
          <div class="card-body">
          <p class="card-title">Product Name : {product.Name}</p>
            <h6 class="card-subtitle mb-2 text-muted">Price : $ {product.Price}</h6>
            <p class="card-text">Product Weight : {product.Stock_weight} lbs</p>
            <Link className="btn" to={{pathname: "/products/"+product._id, state:{ids: product._id}}}>Details</Link>
          </div>
        </div>



        ))}

      </div>

      // <div>{rows}</div>
    )
  }

  /*return (
    <div>
      <h1>Products List</h1>
      {
        props.products.filter(function (product) {
          if (product.Name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return false;
          }
          if(product.category.localeCompare(category) !==0 && category.localeCompare("All") !== 0 && category !==''){
            return false;
          }
          return true;
        }).map((product) => (
          <div class="card">
          <div><a href={"/products/"+product.Name}><img alt = "pic" src={'./images/Lettuce.jpg'} ></img></a></div>
            <div class="card-body">
              <h5 class="card-title">{product.Name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{product.Price}</h6>
              <p class="card-text">{product.Description}</p>
            </div>
          </div>
        ))
      }
    </div>
  )*/
};

export default Products