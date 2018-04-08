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
              <Route path="/user/:id" component={Main} />

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
