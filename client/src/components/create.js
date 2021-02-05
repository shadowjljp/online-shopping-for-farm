import React, { Component } from 'react';
import $ from 'jquery';
import{ Container, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';

class Create extends Component {
  
    submitForm = (e) => {
        e.preventDefault();

        const newProduct = {
          Name: $("#Name").val(),
          Price: $("#Price").val(),
          Stock_weight: $("#Stock_weight").val(),
          Type: $("#Type").val(),
          Image_id: $("#Image_id").val(),
          Description: $("#Description").val(),
          Show: $("#Show").val(),
        }
            
        //send post request
        fetch('http://localhost:5000/PRODUCTS/create', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        })
        .then(response => response.json())
        .catch((error) => {
          console.error('Error:', error);
        });
        // window.location = "/products";
        //this.props.history.push('/login');
            
        
    }

  render() {
    return (
      <Container>
          <h1>Add a Product</h1>
      <Form id="AddForm" onSubmit={this.submitForm} method="POST" >
        <FormGroup>
          <Label for="Name">Product Name</Label>
          <Input type="text" name="Name" id="Name" placeholder="Enter Product Name" />
          <span id="NameMsg"></span>
        </FormGroup>
        <FormGroup>
          <Label for="Price">Price</Label>
          <Input type="number" step="any" name="Price" id="Price" placeholder="Enter Product Price" />
          <span id="PriceMsg"></span>
        </FormGroup>
        <FormGroup>
          <Label for="Stock_weight">Stock Weight(lbs)</Label>
          <Input type="number" step="any" name="Stock_weigt" id="Stock_weight" placeholder="Enter Available Stock Weight" />
          <span id="StockMsg"></span>
        </FormGroup>
        <FormGroup>
          <Label for="Type">Product Type</Label>
          <Input type="text" name="Type" id="Type" placeholder="Enter Product Type" />
          <span className="text-danger" id="TypeMsg"></span>
        </FormGroup>
        <FormGroup>
          <Label for="Image_id">Image_id</Label>
          <Input type="text" name="Image_id" id="Image_id" placeholder="Enter Image_id" />
          <span className="text-danger" id="ImageMsg"></span>
        </FormGroup>
        <FormGroup>
          <Label for="Description">Product Description</Label>
          <Input type="text" name="Description" id="Description" placeholder="Enter Product Description" />
          <span className="text-danger" id="DescriptionMsg"></span>
        </FormGroup>
        <FormGroup>
          <Label for="Show">Show Product (true/false)</Label>
          <Input type="text" name="Show" id="Show" placeholder="To show product?" />
          <span className="text-danger" id="ShowMsg"></span>
        </FormGroup>
        <Button type="submit">Create</Button>
        
      </Form>

      </Container>
      
    );
    
  }

}

export default Create;