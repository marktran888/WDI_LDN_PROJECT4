import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma';
import './scss/style.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Main from './components/Main';
import Navbar from './components/Navbar';
import FlashMessages from './components/FlashMessages';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

class App extends React.Component {



  render() {
    return (
      <BrowserRouter>
        <main>
          <Navbar />
          <FlashMessages />
          <section className="section">
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/user/:id" component={Main} />
              <Route component={NotFound} />
            </Switch>
          </section>
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
