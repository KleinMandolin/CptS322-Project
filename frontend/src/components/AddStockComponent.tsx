
import React, { Component } from 'react';
import axios from 'axios';

interface Ingredient {
  ingredientName: string;
  expirationDate: string;
  qty: number;
}

interface Inventory {
  stockDate: string;
  ingredients: Ingredient[];
}

interface State {
  stockDate: string;
  ingredients: Ingredient[];
  ingredientName: string;
  expirationDate: string;
  qty: number;
}

class AddInventory extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stockDate: '',
      ingredients: [],
      ingredientName: '',
      expirationDate: '',
      qty: 0,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [event.target.name]: event.target.value } as unknown as Pick<State, keyof State>);
  };

  handleAddIngredient = () => {
    const { ingredientName, expirationDate, qty, ingredients } = this.state;
    if (!ingredientName || !expirationDate || qty <= 0) {
      alert('Please fill out all fields with valid data before adding an ingredient.');
      return;
    }
    const newIngredient: Ingredient = { ingredientName, expirationDate, qty };
    this.setState({ ingredients: [...ingredients, newIngredient], ingredientName: '', expirationDate: '', qty: 0 });
  };

  handleRemoveIngredient = (index: number) => {
    const { ingredients } = this.state;
    this.setState({ ingredients: ingredients.filter((_, i) => i !== index) });
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { stockDate, ingredients } = this.state;
    const inventory: Inventory = { stockDate, ingredients };
    console.log(JSON.stringify(inventory))
    try {
      await axios.post('http://localhost:3000/inventory/stock', inventory, { withCredentials: true });
      alert('Inventory added successfully');
      this.setState({
        stockDate: '',
        ingredients: [],
        ingredientName: '',
        expirationDate: '',
        qty: 0,
      });
    } catch (error) {
      alert('Error adding inventory');
    }
  };

  render() {
    const { stockDate, ingredientName, expirationDate, qty, ingredients } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Stock Date:
            <input type="date" name="stockDate" value={stockDate} onChange={this.handleChange} required />
          </label>
        </div>
        <table className="styled-table">
          <thead>
          <tr>
            <th>Ingredient Name</th>
            <th>Quantity</th>
            <th>Expiration Date</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {ingredients.map((ingredient, index) => (
            <tr key={index}>
              <td>{ingredient.ingredientName}</td>
              <td>{ingredient.qty}</td>
              <td>{ingredient.expirationDate}</td>
              <td>
                <button className={'table-button'} type="button" onClick={() => this.handleRemoveIngredient(index)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                name="ingredientName"
                value={ingredientName}
                onChange={this.handleChange}
                placeholder="Ingredient Name"
                required
              />
            </td>
            <td>
              <input
                type="number"
                name="qty"
                value={qty}
                onChange={this.handleChange}
                placeholder="Quantity"
                required
              />
            </td>
            <td>
              <input
                type="date"
                name="expirationDate"
                value={expirationDate}
                onChange={this.handleChange}
                required
              />
            </td>
            <td>
              <button type="button" onClick={this.handleAddIngredient} style={{ width: '100%' }}>
                Add Ingredient
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <button type="submit">Submit Inventory</button>
      </form>
    );
  }
}

export default AddInventory;
