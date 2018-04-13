import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';
import Flash from '../lib/Flash';
import Image from './allergies/Image';
import AllergiesFound from './allergies/AllergiesFound';
import AllergiesList from './allergies/AllergiesList';
import ScannedWords from './allergies/ScannedWords';

import FlashMessages from './FlashMessages';


class Main extends React.Component {

  state = {
    image: '',
    allergies: [],
    newAllergy: '',
    loading: false,
    scannedWords: '',
    matchWords: [],
    showModal: false
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
        .then(() => this.state.image && this.setState({ loading: true }, () =>  this.analyzeImage(this.state.image)))
        .catch(err => console.error(err));
    });
  }

  componentDidMount() {

    axios.get(`/api/users/${this.props.match.params.id}`, {
      headers: { Authorization: Auth.getToken() }
    })
      .then(res => this.setState({ allergies: res.data.allergies }))
      .catch(err => console.error('ERROR', err));
  }

  analyzeImage = (image) => {
    axios.post('/api/rekognition', { image: image }, {
      headers: { Authorization: Auth.getToken() }
    })
      .then(res => {
        this.setState({ matchWords: res.data.watchList, scannedWords: res.data.text, loading: false });
      })
      .then(() => {
        if(this.state.matchWords.length>0) {
          Flash.setMessage('danger', 'ALLERGY FOUND!');
          const synth = window.speechSynthesis;
          const speech = new SpeechSynthesisUtterance('The following ingredients on your watch list have been found ' + this.state.matchWords.join());
          synth.speak(speech);
        }
        this.setState({ showModal: true });
      })
      .catch(err => console.error('ERROR', err));
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
          <FlashMessages />
          <div className="columns is-multiline">
            <div className="column is-mobile is-half-tablet is-half-desktop">
              <AllergiesList data={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} deleteAllergy={this.deleteAllergy} />
            </div>
            <div className="column is-mobile is-half-tablet is-half-desktop">
              <Image handleChange={this.handleImage} image={this.state.image} />
            </div>
            <div className="column is-mobile is-half-tablet is-half-desktop">
              <AllergiesFound data={this.state} />
            </div>
            <div className="column is-mobile is-half-tablet is-half-desktop">
              <ScannedWords data={this.state} />
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
