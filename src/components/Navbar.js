import React from 'react';
import { Link, withRouter } from 'react-router-dom'; // with router allows us to pass in the props
import Auth from '../lib/Auth';

class Navbar extends React.Component {

  state = {
    navIsOpen: false
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/login');
  }

  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }
  componentWillUpdate() {
    this.state.navIsOpen && this.setState({ navIsOpen: false });
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <div
            className={`navbar-burger ${this.state.navIsOpen ? 'is-active' : ''}`}
            onClick={this.handleToggle}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="title">Allergies checker</div>
          <div className="navbar-end">
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout}>Logout</a>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
