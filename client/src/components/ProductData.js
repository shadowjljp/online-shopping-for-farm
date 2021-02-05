import Products from './Products';
import SearchBar from './SearchBar';
import React, { Component } from 'react';
import { Container } from 'reactstrap';

class ProductData extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
          products:[],
          filterText: "",
          category:""
        }
        this.handlerSearch = this.handlerSearch.bind(this);
      }
      handlerSearch(filterText,category) {
        this.setState({
          filterText: filterText,
          category:category
        });
      }
      componentDidMount() {  //called after the page is rendered.
        fetch('http://localhost:5000/PRODUCTS') //ajax call
        .then(res => res.json())
        .then((data) => {
          
          this.setState({ products: data })  //set state varible video
        })
        .catch(console.log)
      }

    render() {
      return (
        <div>
          <Container>
            <SearchBar handlerSearch={this.handlerSearch} filterText={this.state.filterText} category={this.state.category}/>
            <Products products={this.state.products} filterText={this.state.filterText}  category={this.state.category}/>
          </Container>
          
        </div>
      );
    }
  }

  export default ProductData
