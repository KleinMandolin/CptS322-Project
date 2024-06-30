import ListComponent from '../components/ListComponent.tsx';
import { IngredientColumn } from '../components/Types.tsx';

const backendUrl = 'http://localhost:3000';
const summaryPath = `http://localhost:3000/inventory/ingredient-summary`
const lowPath = `${backendUrl}/inventory/low-summary`
const expiringPath = `${backendUrl}/inventory/expiring-summary`

const summaryColumns: IngredientColumn[] = [
  { label: 'Ingredient', path: 'ingredientName'},
  { label: 'Quantity', path: 'qty'},
  { label: 'Measurement Unit', path: 'unit'},
];

const expiringColumns: IngredientColumn[] = [
  { label: 'Stock ID', path: 'stockId'},
  { label: 'Expiration Date', path: 'expirationDate'},
  { label: 'Ingredient', path: 'ingredientName'},
  { label: 'Quantity', path: 'qty'},
  { label: 'Measurement', path: 'unit'},
]

const keyPrefixSummary = 'ingredients'


const Inventory = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Inventory Expiring</h1>
      <ListComponent columns={expiringColumns} apiUrl={expiringPath} keyPrefix={keyPrefixSummary} />
      <h1>Inventory Shortage</h1>
      <ListComponent columns={summaryColumns} apiUrl={lowPath} keyPrefix={keyPrefixSummary} />
      <h1>Inventory List</h1>
      <ListComponent columns={summaryColumns} apiUrl={summaryPath} keyPrefix={keyPrefixSummary} />
    </div>
  );
};

export default Inventory;
