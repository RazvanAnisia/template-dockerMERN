import React, { Component } from 'react';
import SignUp from './Views/SignUp';
class App extends Component {
  state = {
    strTodoDescription: '',
    strTitle: '',
    strDueDate: new Date()
  };
  handleChange = strValue => {
    this.setState({
      strTodoDescription: strValue
    });
  };
  handleTitleChange = strValue => {
    this.setState({
      strTitle: strValue
    });
  };
  handleSubmit = e => {
    const token = localStorage.getItem('authToken');
    e.preventDefault();
    fetch('http://localhost:9000/todo', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: this.state.strTitle,
        description: this.state.strTodoDescription,
        dueDate: this.state.strDueDate.toISOString().split('T')[0]
      })
    });
  };
  render() {
    return (
      <>
        <form>
          <label>name</label>
          <input onChange={e => this.handleTitleChange(e.target.value)} value={this.state.strTodoTitle}></input>
          <input onChange={e => this.handleChange(e.target.value)} value={this.state.strTodoDescription}></input>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        <SignUp />
      </>
    );
  }
}

export default App;
