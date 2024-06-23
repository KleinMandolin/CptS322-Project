import React, { useState } from 'react';
import './Inventory.css';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredients, setIngredients] = useState([
    { name: 'Tomatoes', quantity: 0, restockDate: '01-01' },
    { name: 'Noodles', quantity: 0, restockDate: '01-01' },
    { name: 'Onions', quantity: 0, restockDate: '01-01' },
    { name: 'Garlic', quantity: 0, restockDate: '01-01' },
    { name: 'Peppers', quantity: 0, restockDate: '01-01' },
    // Add more ingredients as needed
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newQuantity, setNewQuantity] = useState<string>('');
  const [newRestockDate, setNewRestockDate] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewQuantity(String(ingredients[index].quantity));
    setNewRestockDate(ingredients[index].restockDate);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setNewQuantity(value);
    }
  };

  const handleRestockDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRestockDate(event.target.value);
  };

  const handleUpdate = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].quantity = parseInt(newQuantity, 10);
    updatedIngredients[index].restockDate = newRestockDate;
    setIngredients(updatedIngredients);
    setEditingIndex(null);
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleBacktoLaunchpad = () => {
    navigate('/launchpad', {state: {inventory} });
  };
  return (
    <div className="ReturntoLaunchPad">
      <button onClick={handleBacktoLaunchpad}
      className="launchpadbutton">
        Back to LaunchPad
        </button>
    <div className="inventory">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for an ingredient"
        className="search-input"
      />
      <div className="table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Quantity</th>
              <th>Restock Date (MM-DD)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.map((ingredient, index) => (
              <tr key={index}>
                <td>{ingredient.name}</td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={newQuantity}
                      onChange={handleQuantityChange}
                      onBlur={() => handleUpdate(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUpdate(index);
                        }
                      }}
                      className="quantity-input"
                    />
                  ) : (
                    ingredient.quantity
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={newRestockDate}
                      onChange={handleRestockDateChange}
                      onBlur={() => handleUpdate(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleUpdate(index);
                        }
                      }}
                      className="restock-date-input"
                    />
                  ) : (
                    ingredient.restockDate
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <button onClick={() => handleUpdate(index)} className="save-button">
                      Save
                    </button>
                  ) : (
                    <button onClick={() => handleEdit(index)} className="restock-button">
                      Restock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Inventory;
