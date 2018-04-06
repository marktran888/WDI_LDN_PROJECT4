class Flash {

  _messages = null; // creating one instance of messages - instatiating

  static setMessage(type, message){
    this._messages = this._messages || {}; //if messages is null will error so create object
    this._messages[type] = message; // [type] is the key of the object
  }

  static getMessages(){
    return this._messages;
  }

  static clearMessages(){
    this._messages = null;
  }
}

export default Flash;
