import IngredientListComponent from '../components/IngredientListComponent.tsx';
import { IngredientColumn } from '../components/Types.tsx';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddStockComponent from '../components/AddStockComponent.tsx';

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
      <Link to="/launchpad">
        <button className="return_button">
          <FaArrowLeft />
        </button>
      </Link>
      <h1>Inventory Order</h1>
      <AddStockComponent></AddStockComponent>
      <h1>Inventory Expiring</h1>
      <IngredientListComponent columns={expiringColumns} apiUrl={expiringPath} keyPrefix={keyPrefixSummary} />
      <h1>Inventory Shortage</h1>
      <IngredientListComponent columns={summaryColumns} apiUrl={lowPath} keyPrefix={keyPrefixSummary} />
      <h1>Inventory List</h1>
      <IngredientListComponent columns={summaryColumns} apiUrl={summaryPath} keyPrefix={keyPrefixSummary} />
    </div>
  );
};

export default Inventory;
