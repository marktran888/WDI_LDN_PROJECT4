import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';

class Main extends React.Component {

  state = {
    image: '',
    allergies: [],
    newAllergy: ''
  }

  deleteAllergy = (allergy) => {
    const index = this.state.allergies.indexOf(allergy);
    const newAllergies = [
      ...this.state.allergies.slice(0, index),
      ...this.state.allergies.slice(index + 1)
    ];
    this.setState({ allergies: newAllergies} ,() => {
      axios.put(`/api/main/${this.props.match.params.id}`, this.state, {
        headers: { Authorization: Auth.getToken() }
      })
        .then(console.log(this.state.allergies));
    });
  }

  componentDidMount() {
    axios.get(`/api/main/${this.props.match.params.id}`)
      .then(res => this.setState({ allergies: res.data.allergies }, () => console.log(this.state)));
  }

  handleImage = (image) => {
    this.setState({ image }, () => console.log(this.state));
  }

  handleChange = (e) => {
    this.setState({ newAllergy: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newAllergies = [...this.state.allergies, this.state.newAllergy];
    this.setState({ allergies: newAllergies, newAllergy: '' } ,() => {
      axios.put(`/api/main/${this.props.match.params.id}`, this.state, {
        headers: { Authorization: Auth.getToken() }
      });
    });
  }

  render() {
    return (

      this.state.allergies ? (
        <div>
          <ul className="allergiesList">
            <h1 className="title">Allergies List</h1>
            {this.state.allergies.map((allergies, i) =>
              <li key={i}>{allergies}
                <span>
                  <button onClick={() => this.deleteAllergy(allergies)} >X</button>
                </span>
              </li>)}
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="New allergy"
                onChange={this.handleChange}
                value={this.state.newAllergy}
              />
              <button>Add</button>
            </form>
          </ul>
        </div>
      ) : (
        <div className="container">
          <h1 className="title">LOADING</h1>
        </div>
      )
    );
  }
}
export default Main;
