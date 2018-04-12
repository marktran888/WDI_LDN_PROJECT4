import React from 'react';

class Image extends React.Component {

  constructor() {
    super();
    this.fileReader = new FileReader();
    this.fileReader.onload = () => this.props.handleChange(this.fileReader.result);
  }

  handleChange = (e) => {
    const file = (e.target.files || e.dataTransfer.files)[0];
    this.fileReader.readAsDataURL(file);
  }

  componentDidMount(){
    this.input.addEventListener('change', this.handleChange);
    this.dropzone.addEventListener('click', () => this.input.click());
    this.dropzone.addEventListener('dragenter', (e) => e.preventDefault());
    this.dropzone.addEventListener('dragover', (e) => e.preventDefault());
    this.dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.handleChange(e);
    });
  }
  render(){

    return (
      <div>
        <h1 className="title">Image upload</h1>
        <input type="file" className="image-picker" accept="image/*;capture=camera" ref={element => this.input = element}/>
        {/* <input type="file" accept="image/*" ref={element => this.input = element}/> */}
        <div className="dropzone" ref={element => this.dropzone = element} style={{backgroundImage: `url(${this.props.image})`}}>
          {!this.props.image ? 'Drop ingredients image file here or click to select file' : ''}
        </div>
      </div>
    );
  }
}

export default Image;
