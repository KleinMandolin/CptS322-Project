import React from 'react';

// basic code implementation for fetch based on: https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples

class ClickCount extends React.Component { // Accepting types <any,any> accepts everything; not necessary.
  constructor(props) {
    super(props);

    this.state = {
      count: null,
      errorMessage: null,
    };

    this.getCount = this.getCount.bind(this);
    this.incrCount = this.incrCount.bind(this);
    this.resetCount = this.resetCount.bind(this);
  }

  componentDidMount() {
      this.getCount()
  }

  // function to fetch backend's total click count via GET
  getCount() {
    // for a guaranteed functioning version, try GET with
    // https://api.npms.io/v2/search?q=react and data.total
    fetch('http://localhost:3000/count/total', { method: 'GET' }) // url to access, GET call
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        this.setState({ count: data.value }); // data.### where ### is the the row name in json file
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error('Error in get count.', error);
      });
  }

  // function to tell backend to increment count via empty PUT
  incrCount() {
    fetch('http://localhost:3000/count/increment', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}), // empty data, PUT is just function call to backend
    })
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        // PUT is just backend function call, do nothing with returned data
        // We want to update our component after incrementing.
        this.getCount()
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error('Error in increment count.', error);
      });
  }

  // function to tell backend to reset count via empty PUT
  resetCount() {
      if(this.state == 0) // Update the state only if necessary.
          return

    fetch('http://localhost:3000/count/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}), // empty data, PUT is just function call to backend
    })
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        // PUT is just backend function call, do nothing with returned data
        // We want to update the count after resets.
        this.getCount()
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error('Error in reset count.', error);
      });
  }

  render() {
    return (
        <>
          <div className="click button">
            <button onClick={this.incrCount}>
              <h1>Click me!</h1>
            </button>
          </div>

          <div className="count description">
            <h2>Click count is: <u><b><em>{this.state.count}</em></b></u></h2>
            <p>
              Clicking the button above will update a value in a postgresql database. You'll notice after refresh,
              the count remains the same - the click count is maintained by the backend.
            </p>
            <p>
              Reset count returns value to 0.
            </p>
          </div>

          <div className="reset button">
          <button onClick={this.resetCount}>
              Reset Count
            </button>
          </div>
        </>
    );
  }
}

export default ClickCount;
