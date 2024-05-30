import React from 'react';

// basic code implementation for fetch based on: https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples

class ClickCount extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      count: null,
      errorMessage: null,
    };
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
        console.error('There was an error!', error);
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
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  }

  // function to tell backend to reset count via empty PUT
  resetCount() {
    fetch('http://localhost:3000/count/reset', {
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
      })
      .catch((error) => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  }

  render() {
    this.getCount();
    return (
      <>
        <div className="click button">
          <button
            onClick={() => {
              this.setState({ count: 0 });
              this.incrCount();
            }}
          >
            <h1>Click me!</h1>
          </button>
        </div>

        <div className="count description">
          <p>
            <h2>Click count is: {this.state.count}</h2>
          </p>
          <code>
            <p>
              Fetching current count may take a while. The value becomes the
              placeholders below to show the button press has been acknowledged.
            </p>
            <p>
              'Reset Count' will make the displayed count 1, before becoming the
              backend's reset count of 0.
            </p>
            <p>
              'Click me!' will make the displayed count 0, before becoming the
              backend's current stored count.
            </p>
          </code>
        </div>

        <div className="reset button">
          <button
            onClick={() => {
              this.setState({ count: 1 });
              this.resetCount();
            }}
          >
            Reset Count
          </button>
        </div>
      </>
    );
  }
}
export default ClickCount;
