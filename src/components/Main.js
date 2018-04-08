import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';
import Image from './Image';

class Main extends React.Component {

  state = {
    image: '',
    allergies: [],
    newAllergy: '',
    loading: false,
    scannedWords: '',
    matchWords: []
  }

  deleteAllergy = (allergy) => {
    const index = this.state.allergies.indexOf(allergy);
    const newAllergies = [
      ...this.state.allergies.slice(0, index),
      ...this.state.allergies.slice(index + 1)
    ];
    this.setState({ allergies: newAllergies} ,() => {
      axios.put(`/api/users/${this.props.match.params.id}`, this.state, {
        headers: { Authorization: Auth.getToken() }
      })
        .then(() => this.state.image && this.setState({ loading: true }, () =>  this.analyzeImage(this.state.image)));
    });
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ allergies: res.data.allergies }));
  }

  analyzeImage = (image) => {
    axios.post('/api/rekognition', { image: image }, {
      headers: { Authorization: Auth.getToken() }
    })
      .then(res => this.setState({ matchWords: res.data.watchList, scannedWords: res.data.text, loading: false } ));
  }

  handleImage = (image) => {
    this.setState({ image: image, loading: true }, () => this.analyzeImage(image));
  }

  handleChange = (e) => {
    this.setState({ newAllergy: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newAllergies = [...this.state.allergies, this.state.newAllergy];
    this.setState({ allergies: newAllergies, newAllergy: '' } ,() => {
      axios.put(`/api/users/${this.props.match.params.id}`, this.state, {
        headers: { Authorization: Auth.getToken() }
      })
        .then(() => this.state.image && this.setState({ loading: true }, () =>  this.analyzeImage(this.state.image)));
    });
  }

  render() {
    return (

      this.state.allergies ? (
        <main>
          <div>
            <h1 className="title">Allergies List</h1>
            <ul className="allergiesList">
              {this.state.allergies.map((allergies, i) =>
                <li key={i}>{allergies}
                  <span className="spanRight">
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
          <div>
            <h2 className="title">Image upload</h2>
            <Image handleChange={this.handleImage} image={this.state.image}/>
          </div>
          <div>
            <h3 className="title">Allergies found</h3>
            {this.state.matchWords.length>0 ?  (
              <ul className="allergiesList2">
                {this.state.loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                {this.state.matchWords.map((words, i) =>
                  <li key={i}>{words}</li>)}
              </ul>
            ) : (
              <ul className="allergiesList">
                {this.state.loading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
                {this.state.matchWords.map((words, i) =>
                  <li key={i}>{words}</li>)}
              </ul>
            )}

          </div>
          <div>
            <h4 className="title">Ingredients found</h4>
            <div className="allergiesList">
              {this.state.scannedWords}
            </div>
          </div>
        </main>
      ) : (
        <div className="container">
          <h1 className="title">LOADING</h1>
        </div>
      )
    );
  }
}
export default Main;
