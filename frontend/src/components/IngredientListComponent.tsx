import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Ingredient, IngredientColumn } from './Types';
import api from '../Auth/api.ts';

interface ListComponentProps {
  columns: IngredientColumn[];
  apiUrl: string;
  keyPrefix: string;
}

const IngredientListComponent: React.FC<ListComponentProps> = ({ columns, apiUrl, keyPrefix }) => {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<{ ingredients: Ingredient[] }>(apiUrl,{
            withCredentials: true
          });
        setItems(response.data.ingredients);
      } catch (err) {
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const generateKey = (index: number | string) => `${keyPrefix}-${index}`;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table className="styled-table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={generateKey(index)}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, rowIndex) => (
          <tr key={generateKey(rowIndex)}>
            {columns.map((col, colIndex) => (
              <td key={generateKey(`${rowIndex}-${colIndex}`)}>{item[col.path] !== undefined ? item[col.path] : 'N/A'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IngredientListComponent;