import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';
import Image from './allergies/Image';
import AllergiesFound from './allergies/AllergiesFound';
import AllergiesList from './allergies/AllergiesList';
import ScannedWords from './allergies/ScannedWords';

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
          <AllergiesList data={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} deleteAllergy={this.deleteAllergy} />
          <Image handleChange={this.handleImage} image={this.state.image} />
          <AllergiesFound data={this.state} />
          <ScannedWords data={this.state} />
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
