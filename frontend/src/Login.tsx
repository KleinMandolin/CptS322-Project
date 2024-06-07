import React from 'react';

// basic code implementation for fetch based on: https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples

class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      loginSuccess: false,
      verifySuccess: false,
      errorMessage: null,
    };
  }

  submitLogin = (event) => {
    event.preventDefault();
    this.setState({ username: event.target.username.value });
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    this.setState({ loginSuccess: true });
  };

  render() {
    if (this.state.loginSuccess == false) {
      return (
        <div className="login">
          <form className="userlogin" onSubmit={this.submitLogin}>
            <div className="username">
              <label>
                <input
                  placeholder="Username"
                  spellCheck="false"
                  name="username"
                  required
                  minLength={8}
                  maxLength={20}
                />
              </label>
            </div>
            <div className="password">
              <label>
                <input
                  placeholder="Password"
                  spellCheck="false"
                  name="password"
                  required
                  minLength={8}
                  maxLength={100}
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    } else if (this.state.verifySuccess == false) {
      return (
        <>
          {' '}
          Input Username: {this.state.username}{' '}
          <button onClick={() => this.setState({ verifySuccess: true })}>
            go to next screen
          </button>
        </>
      );
    } else {
      return <>hello</>;
    }
  }
}

export default Login;
