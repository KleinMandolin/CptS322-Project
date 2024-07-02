import { OrderColumn } from '../components/Types.tsx';
import OrdersDetailsListComponent from '../components/OrdersDetailsListComponent.tsx';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ordersPath = `/order-details/orders`

const orderColumns: OrderColumn[] = [
  { label: 'Order ID', path: 'orderId'},
  { label: 'Recipe', path: 'recipeName'},
  { label: 'Category', path: 'mealType'},
  { label: 'Order Total', path: 'total'}
]

const keyPrefixSummary = 'orders'


const Orders = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Link to="/launchpad">
        <button className="return_button">
          <FaArrowLeft />
        </button>
      </Link>
      <h1>Orders</h1>
      <OrdersDetailsListComponent columns={orderColumns} apiUrl={ordersPath} keyPrefix={keyPrefixSummary} />
    </div>
  );
};

export default Orders;
