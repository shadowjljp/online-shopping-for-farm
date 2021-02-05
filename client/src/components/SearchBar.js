import React, { Component } from 'react'
import{ Container} from 'reactstrap';

export class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.handlerSearch = this.handlerSearch.bind(this);

    }
    handlerSearch(e) {
        this.props.handlerSearch(document.getElementById("target").value,document.getElementById("category").value)
        e.preventDefault();
    }

    render() {
        return (
            <form>
                <label>category:</label><select name="category" id="category" class="form-control">
                    <option value="All">All</option>
                    <option value="fruit">fruit</option>
                    <option value="vegetable">vegetable</option>
                
                </select>
                <input id="target" type="text" placeholder="search something"></input>
                <button className="btn" onClick={this.handlerSearch}>Search</button>
            </form>
            
        )
    }
}

export default SearchBar
