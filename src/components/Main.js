import React from 'react';


class Main extends React.Component {

  state = {
    image: ''
  }

  handleChange = (image) => {
    this.setState({ image }, () => console.log(this.state));
  }


  render() {
    return (
      <div>Main</div>
    );
  }
}
export default Main;
