
import React, { Component, useState } from 'react';
import { useLocation, Link } from "react-router-dom";
import{ Button} from 'reactstrap';
import './product.css';

class ProductEdit extends Component {
    
    state = {
        //product: "",
        Id: "",
        Name: "",
        Price: "",
        Stock_weight: "",
        Type: "",
        Image_id: "",
        Description: "",
        Show: ""


    }

    //update the state whenever input is changed
    handleChange = (e) => {
        console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value,
            }
        );
    }

    mySubmitHandler = (e)=>{
        console.log(this.props.history.location.state.ids)
        //console.log(state)
         //id:id
        //alert("data updated")
        e.preventDefault();
        const updateProduct = {
            Name: this.state.Name,
            Price: this.state.Price,
            Stock_weight: this.state.Stock_weight,
            Type: this.state.Type,
            Image_id: this.state.Image_id,
            Description: this.state.Description,
            Show: this.state.Show
          }

        fetch('http://localhost:5000/products/edit/'+this.state.Id, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateProduct),
        }).then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    componentDidMount() {  //called after the page is rendered.
        console.log(this.props.history.location.state.ids)
        fetch('http://localhost:5000/products/'+this.props.history.location.state.ids) //ajax call
        .then(res => res.json())
        .then((data) => {
          console.log(data)
          this.setState({ 
            Id: data._id,
            Name: data.Name,
            Price: data.Price,
            Stock_weight: data.Stock_weight,
            Type: data.Type,
            Image_id: data.Image_id,
            Description: data.Description,
            Show: data.Show.toString()
         }) //set state varible video
        })
        .catch(console.log)
      }
    render() {
      return (
          <div className="container"> 
            
            <form onSubmit={() => this.mySubmitHandler()} method="PUT">
                <div class="form-group">
                    Name:<input  type="text" name="Name" class="form-control" value={this.state.Name} onChange={(e)=> this.handleChange(e)} />
                </div>
                <div class="form-group">
                    Price:<input  type="number" name="Price" class="form-control" value={this.state.Price} onChange={(e)=> this.handleChange(e)} />
                </div>
                <div class="form-group">
                    Stock_weight:<input  type="number" name="Stock_weight" class="form-control" value={this.state.Stock_weight} onChange={(e)=> this.handleChange(e)} />
                </div>
                <div class="form-group">
                    Type:<input  type="text" name="Type" class="form-control" value={this.state.Type} onChange={(e)=> this.handleChange(e)} />
                </div>
                <div class="form-group">
                    Image_id:<input  type="text" name="Image_id" class="form-control" value={this.state.Image_id} onChange={(e)=> this.handleChange(e)}/>
                </div>
                <div class="form-group">
                    Description:<textarea  name="Description" class="form-control" value={this.state.Description} onChange={(e)=> this.handleChange(e)} ></textarea>
                </div>
                <div class="form-group">
                    show:<input  type="text" name="Show" value={this.state.Show} onChange={(e)=> this.handleChange(e)} />
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-info">Save</button>
                </div>
            </form>
          </div>

      );
    }
  }
// const ProductEdit = (props) => {
//     const rows=[];
//     const { state } = useLocation();
//     const [Name, setName] = useState("")
//     const [Price, setPrice] = useState(0)
//     const [Stock_weight, setStock_weight] = useState(0)
//     const [Type, setType] = useState("")
//     const [Image_id, setImage_id] = useState("")
//     const [Description, setDescription] = useState("")
//     const [show, setshow] = useState(0)

//     const mySubmitHandler = (e)=>{
//         console.log(state)
//          //id:id
//         //alert("data updated")
//         e.preventDefault();
//         const updateProduct = {
//             Name: Name,
//             Price: Price,
//             Stock_weight: Stock_weight,
//             Type: Type,
//             Image_id: Image_id,
//             Description: Description,
//             Show: show
//           }

//         fetch('http://localhost:5000/PRODUCTS/edit', {
//             method: 'POST', 
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updateProduct),
//           }) .then(response => response.json())
//           .catch((error) => {
//             console.error('Error:', error);
//           });
//     }
 
//   //  console.log('state.edit.name' + state.edit.Name)
//  //   console.log('state.edit.id' + state.edit._id)
//     rows.push(
//         <div class="card" key={state._id}>
//             <form onSubmit={() => mySubmitHandler(state.edit._id)}>
//                 <div class="form-group">
//                     Name:<input onChange = {(e)=>{setName(e.target.value)}} type="text" name="title" class="form-control" placeholder={""+state.edit.Name}/>
//                 </div>
//                 <div class="form-group">
//                     Price:<input onChange = {(e)=>{setPrice(e.target.value)}} type="number" name="genre" class="form-control" placeholder={""+state.edit.Price} />
//                 </div>
//                 <div class="form-group">
//                     Stock_weight:<input onChange = {(e)=>{setStock_weight(e.target.value)}} type="number" name="image" class="form-control" placeholder={""+state.edit.Stock_weight}/>
//                 </div>
//                 <div class="form-group">
//                     Type:<input onChange = {(e)=>{setType(e.target.value)}} type="text" name="title" class="form-control" placeholder={""+state.edit.Type}/>
//                 </div>
//                 <div class="form-group">
//                     Image_id:<input onChange = {(e)=>{setImage_id(e.target.value)}} type="text" name="title" class="form-control" placeholder={""+state.edit.Image_id}/>
//                 </div>
//                 <div class="form-group">
//                     Description:<textarea onChange = {(e)=>{setDescription(e.target.value)}} name="desc" class="form-control" placeholder={""+state.edit.Description}></textarea>
//                 </div>
//                 <div class="form-group">
//                     show:<input onChange = {(e)=>{setshow(e.target.value)}} type="number" min="0" max="1" />
//                 </div>
//                 <div class="form-group">
//                     <button type="submit" class="btn btn-info">Save</button>
//                 </div>
//             </form>
//         </div>);

    /*      <div class="card" >
               <Form id="AddForm" onSubmit={this.submitForm} method="POST" >
                    <div class="form-group">
                        Name:<input onChange={(e) => { setName(e.target.value) }} type="text" name="Name" id="Name" class="form-control" />
                    </div>
                    <div class="form-group">
                        Price:<input onChange={(e) => { setPrice(e.target.value) }} type="Price" name="Price" id="Price" class="form-control" />
                    </div>
                    <div class="form-group">
                        Stock_weight:<input onChange={(e) => { setStock_weight(e.target.value) }} type="Stock_weigt" name="Stock_weigt" id="Stock_weigt" class="form-control" />
                    </div>
                    <div class="form-group">
                        Type:<input onChange={(e) => { setType(e.target.value) }} type="text" name="Type" id="Type" class="form-control" />
                    </div>
                    <div class="form-group">
                        Image_id:<input onChange={(e) => { setImage_id(e.target.value) }} type="text" name="Image_id" id="Image_id" class="form-control" />
                    </div>
                    <div class="form-group">
                        Description:<textarea onChange={(e) => { setDescription(e.target.value) }} name="Description" id="Description" class="form-control" ></textarea>
                    </div>
                    <div class="form-group">
                        Show Product (true/false)
                        <Input type="text" name="Show" id="Show" placeholder="To show product?" />
                    </div>
                    <div class="form-group">
                        <Button type="submit">Create</Button>
                    </div>
                    </Form>
            </div>);*/

//     return (
//         <div>
//             {rows}
//             <Link to="/">Back to Products</Link>
//         </div>
//     )


// }


export default ProductEdit