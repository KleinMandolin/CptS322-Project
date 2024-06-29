import React from 'react';
import SideBar from './Sidebar.tsx';
import { Link } from 'react-router-dom';

import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

class Menu extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      fullmenu: null, // formatting of menu
      cart: {}, // shopping cart dictionary cart[id]={name, price, count}
      sidebarOpen: false,
      total: 0.0,
      category: 'all',
      checkout: false,
    };
    this.populate = this.populate.bind(this);
  }

  // original source link in Sidebar.tsx
  toggleSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  // runs when component mounts (essentially compiles), will (probably?)
  // not run when switching urls, so if new menu item is added, this.populate
  // will need to be recalled
  componentDidMount() {
    this.populate();
  }

  // used to check if dictionary is empty,
  // from: https://stackoverflow.com/questions/6072590/how-to-match-an-empty-dictionary-in-javascript
  isEmpty(ob) {
    for (var i in ob) {
      return false;
    }
    return true;
  }

  // increments given item count in shopping cart
  incrCount(item) {
    // originally
    //  this.state.cart[id].count = this.state.cart[id].count + 1;
    // but to trigger rerender, setState is needed, and individual dict
    // items cannot be edited via setState, so entire dict is copied
    // code from: https://forum.freecodecamp.org/t/reactjs-using-setstate-to-update-a-single-property-on-an-object/146772/2
    const cartCopy = JSON.parse(JSON.stringify(this.state.cart));
    cartCopy[item].count = cartCopy[item].count + 1;
    this.setState({
      cart: cartCopy,
      total: this.state.total + cartCopy[item].price,
    });
  }

  // renders live cart
  showOrders() {
    if (this.isEmpty(this.state.cart)) {
      return <p>Loading</p>;
    } else {
      //console.log('1' in this.state.cart); true
      //console.log('18' in this.state.cart); false
      const data = this.state.cart;
      return (
        <div className="menuCart">
          <ul className="cartItems">
            {Object.keys(data).map((key) => {
              if (data[key].count > 0) {
                return (
                  <>
                    <li>
                      <div className="cartItemEntry">
                        <div className="cartItemCount">
                          {data[key].count}x {data[key].name}
                        </div>
                        <div className="cartItemCharge">
                          ${(data[key].count * data[key].price).toFixed(2)}
                        </div>
                      </div>
                    </li>
                    <hr className="recieptLine" />
                  </>
                );
              }
            })}
          </ul>
          <div className="footer">
            <div className="cartTotal">${this.state.total.toFixed(2)}</div>
            <button className="checkoutButton" onClick={() => this.checkout()}>
              Checkout
            </button>
          </div>
        </div>
      );
    }
  }

  // renders fullmenu
  showMenu() {
    return (
      <div className="menu">
        {this.state.fullmenu.map((menuItem) => {
          const { item_name, cost, description } = menuItem;
          if (
            this.state.category === 'all' ||
            menuItem.category === this.state.category
          )
            return (
              <article key={item_name} className="menuItem">
                <button
                  key={item_name}
                  className="menuButton"
                  onClick={() => this.incrCount(item_name)}
                >
                  {item_name}
                </button>
                <div className="itemInfo">
                  <header>
                    <h4 className="cost">${cost}</h4>
                  </header>
                  <p className="description">{description}</p>
                </div>
              </article>
            );
        })}
      </div>
    );
  }

  // on component mount, fetches menu json and inits values
  populate() {
    fetch('/testmenu.json', { method: 'GET' }) // url to access, GET call
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        // in case shopping cart still exists (e.g. went from shopping cart
        //    back to menu, preserve shopping cart but reload menu)
        if (this.isEmpty(this.state.cart)) {
          {
            data.map((menuItem) => {
              const { item_name, cost } = menuItem;
              this.state.cart[item_name] = {
                name: item_name,
                price: parseFloat(cost),
                count: 0,
              };
            });
          }
        }

        // create frontend menu layout
        this.setState({
          fullmenu: data,
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error('Error in get count.', error);
      });
  }

  // converts shopping cart to json format, getting rid of empty
  // (count=0) values
  checkout() {
    const cart = this.state.cart;
    // maps specific json format from cart (cart contains price, unnecessary for backend reciept)
    const wholeCart = Object.entries(cart).map(([key, value]) => {
      if (cart[key].count > 0) {
        return {
          recipeName: cart[key].name,
          qty: cart[key].count,
        };
      }
    });

    // if count of an item == 0, it was replaced with null
    // which is the filtered using code from here:
    // https://stackoverflow.com/questions/61382447/filter-out-null-value-from-array-in-react
    const filteredCart = wholeCart.filter((q) => !!q);

    // add item to total json file
    const order = {
      orderDetails: filteredCart,
    };

    console.log(JSON.stringify(order));

    /* Output should look like:
    
      {
        "orderDetails": [
          {
            "recipeName": "Spaghetti Bolognese",
            "qty": 2
          },
          {
            "recipeName": "Chicken Caesar Salad",
            "qty": 3
          },
          {
            "recipeName": "Margherita Pizza",
            "qty": 1
          }
        ]
      }

    */
  }

  render() {
    return (
      <>
        <div className="menu_header">
          <span>
            <Link to="/launchpad">
              <button className="return_button">
                <FaArrowLeft />
              </button>
            </Link>
          </span>
          <span>
            <div className="categoryButtons">
              <button
                className="all"
                onClick={() => this.setState({ category: 'all' })}
              >
                all
              </button>
              <button
                className="drinks"
                onClick={() => this.setState({ category: 'drink' })}
              >
                drinks
              </button>
              <button
                className="appetizers"
                onClick={() => this.setState({ category: 'appetizer' })}
              >
                appetizers
              </button>
              <button
                className="entrees"
                onClick={() => this.setState({ category: 'entree' })}
              >
                entrees
              </button>
            </div>
          </span>
          <span>
            <button
              className="cart_button"
              onClick={() => this.toggleSidebar()}
            >
              <FaShoppingCart />
            </button>
          </span>
        </div>
        <SideBar isOpen={this.state.sidebarOpen} data={this.showOrders()} />
        <div className="menu">
          {this.state.fullmenu ? this.showMenu() : 'loading'}
        </div>
      </>
    );
  }
}
// {this.state?.fullmenu ?? 'Loading'}
export default Menu;
