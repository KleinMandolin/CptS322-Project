import React, { useState } from 'react';

class Menu extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      fullmenu: null, // formatting of menu
      cart: {}, // shopping cart dictionary cart[id]={name, price, count}
    };
    this.populate = this.populate.bind(this);
  }

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
  incrCount(id) {
    this.state.cart[id].count = this.state.cart[id].count + 1;
  }

  showOrders() {
    if (this.isEmpty(this.state.cart)) {
      return null;
    } else {
      //console.log('1' in this.state.cart); true
      //console.log('18' in this.state.cart); false
      return <div className="menuCart">hello</div>;
    }
  }

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
              const { id, item_name, cost } = menuItem;
              this.state.cart[id] = {
                name: item_name,
                price: cost,
                count: 0,
              };
            });
          }
        }

        // create frontend menu layout
        this.setState({
          fullmenu: (
            <div className="menu">
              {data.map((menuItem) => {
                const { id, item_name, cost, description } = menuItem;
                return (
                  <article key={id} className="menuItem">
                    <button
                      key={item_name}
                      className="menuButton"
                      onClick={() => this.incrCount(id)}
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
          ),
        });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error('Error in get count.', error);
      });
  }

  render() {
    return (
      <>
        {this.showOrders()}
        <div className="menu">{this.state?.fullmenu ?? 'Loading'}</div>
      </>
    );
  }
}

export default Menu;
