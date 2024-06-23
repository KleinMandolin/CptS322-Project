import React, { useState, useEffect } from 'react';
import './Inventory.css';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newQuantity, setNewQuantity] = useState<string>('');
  const [newRestockDate, setNewRestockDate] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');

  useEffect(() => {
    fetch('/restocks/items')
      .then((response) => response.json())
      .then((data) => {
        const ingredients = data.map((item: any) => ({
          id: item.id,
          name: item.ingredient.name,
          quantity: item.qty,
          restockDate: new Date(item.restock.restock_date).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit'
          }),
          priceRestock: item.price_restock,
          priceCurrent: item.price_current,
        }));
        setIngredients(ingredients);
      })
      .catch((error) => console.error('Error fetching restock items:', error));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewQuantity(String(ingredients[index].quantity));
    setNewRestockDate(ingredients[index].restockDate);
    setNewPrice(String(ingredients[index].priceRestock));
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

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setNewPrice(value);
    }
  };

  const handleUpdate = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].quantity = parseInt(newQuantity, 10);
    updatedIngredients[index].restockDate = newRestockDate;
    updatedIngredients[index].priceRestock = parseFloat(newPrice);
    updatedIngredients[index].priceCurrent = parseFloat(newPrice); // Assuming current price is the same as restock price 
    setIngredients(updatedIngredients);
    setEditingIndex(null);

    // Should save the item
    const updatedRestockItem = {
      quantity: parseInt(newQuantity, 10),
      restockDate: newRestockDate,
      priceRestock: parseFloat(newPrice),
      priceCurrent: parseFloat(newPrice),
    };

    fetch(`/restocks/items/${ingredients[index].id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRestockItem),
    })
      .then((response) => response.json())
      .then((data) => console.log('Restock item updated:', data))
      .catch((error) => console.error('Error updating restock item:', error));
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBacktoLaunchpad = () => {
    navigate('/launchpad', { state: { inventory: ingredients } });
  };

  return (
    <div className="ReturntoLaunchPad">
      <button onClick={handleBacktoLaunchpad} className="launchpadbutton">
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
                <th>Price at Restock</th>
                <th>Current Price</th>
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
                      <input
                        type="text"
                        value={newPrice}
                        onChange={handlePriceChange}
                        onBlur={() => handleUpdate(index)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdate(index);
                          }
                        }}
                        className="price-input"
                      />
                    ) : (
                      ingredient.priceRestock
                    )}
                  </td>
                  <td>{ingredient.priceCurrent}</td>
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
