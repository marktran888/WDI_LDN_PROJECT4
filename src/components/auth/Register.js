import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

class Register extends React.Component {

  state= {
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value}, () => console.log(this.state));
  }

  handleSubmit = (e) => {
    // prevent default behaviour
    // make a post request to /api/register
    // send the form data
    e.preventDefault();
    axios.post('/api/register', this.state) // this.state is the form data, we are storing the form data in state
    //   // the response has the user, token and message. We need to put it in local storage.
      .then(res => {
        Auth.setToken(res.data.token);
      });
    // .then(() => this.props.history.push('/main'));
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <div className="field">
          <label htmlFor="username">Username</label>
          <input className="input"
            placeholder="Username"
            name="username"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            className="input"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            type="password"
            className="input"
            placeholder="Password Confirmation"
            name="passwordConfirmation"
            onChange={this.handleChange}
          />
        </div>

        <button className="button is-primary">Submit</button>
      </form>
    );
  }
}

export default Register;
