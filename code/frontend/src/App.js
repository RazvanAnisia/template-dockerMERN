import React, { Component } from 'react';
import SignUp from './Views/SignUp';
class App extends Component {
  state = {
    strTodoDescription: '',
    strDueDate: new Date()
  };
  // handleChange = strValue => {
  //   this.setState({
  //     strTodoDescription: strValue
  //   });
  // };
  // handleSubmit = e => {
  //   e.preventDefault();
  //   fetch('http://localhost:9000/todo', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       todoDescription: this.state.strTodoDescription,
  //       createdAt: new Date().toISOString().split('T')[0],
  //       todoDueDate: this.state.strDueDate.toISOString().split('T')[0],
  //       todolist_id: 1
  //     })
  //   });
  // };
  render() {
    return (
      <>
        {/* <form>
          <label>name</label>
          <input
            onChange={e => this.handleChange(e.target.value)}
            value={this.state.strTodoDescription}></input>
          <button onClick={this.handleSubmit}>Submit</button>
        </form> */}
        <SignUp />
        <p>yes</p>
      </>
    );
  }
}

export default App;
