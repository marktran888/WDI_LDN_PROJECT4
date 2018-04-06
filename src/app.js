import React from 'react';
import ReactDOM from 'react-dom';

import 'bulma';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Main from './components/Main';

class App extends React.Component {



  render() {
    return (
      <BrowserRouter>
        <main>
          <section className="section">
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/main" component={Main} />

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
