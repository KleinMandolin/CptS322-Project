import ListComponent from '../components/ListComponent.tsx';
import { IngredientColumn, OrderColumn } from '../components/Types.tsx';

const backendUrl = 'http://localhost:3000';
const ordersPath = `${backendUrl}/order-details/orders`

const summaryColumns: IngredientColumn[] = [
  { label: 'Ingredient', path: 'ingredientName'},
  { label: 'Quantity', path: 'qty'},
  { label: 'Measurement Unit', path: 'unit'},
];

const orderColumns: OrderColumn[] = [
  { label: ''}
]

const keyPrefixSummary = 'ingredients'


const Revenue = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Inventory Expiring</h1>
      <ListComponent columns={expiringColumns} apiUrl={expiringPath} keyPrefix={keyPrefixSummary} />
    </div>
  );
};

export default Revenue;
