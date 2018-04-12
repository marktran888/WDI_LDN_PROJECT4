import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class Register extends React.Component {

  state= {}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let id ='';
    axios.post('/api/login', this.state) // this.state is the form data, we are storing the form data in state
      // the response has the user, token and message. We need to put it in local storage.
      .then(res => {
        Auth.setToken(res.data.token);
        id = res.data.user._id;
      })
      .then(() => Flash.setMessage('success', 'Welcome back!'))
      .then(() => this.props.history.push(`/user/${id}`));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="forms">
          <div className="field">
            <label htmlFor="email" className="title">Email</label>
            <input
              className="input"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password" className="title">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <button className="button is-primary" id="btn">Submit</button>
        </div>


      </form>
    );
  }
}

export default Register;
