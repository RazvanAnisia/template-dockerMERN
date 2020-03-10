import React, { Component } from 'react';
import formatDate from '../../util/FormatDate';
import axiosInstance from '../../lib/axiosInstance';

class SignUp extends Component {
  state = {
    strFirstName: '',
    strLastName: '',
    strProfession: '',
    strEmail: '',
    strPassword: '',
    strRegisteredDate: formatDate(new Date())
  };

  handleSubmit = e => {
    e.preventDefault();
    axiosInstance
      .post('/signup', {
        firstname: this.state.strFirstName,
        lastname: this.state.strLastName,
        email: this.state.strEmail,
        password: this.state.strPassword,
        profession: this.state.strProfession,
        registeredDate: this.state.strRegisteredDate
      })
      .then(({ data }) => {
        const { token } = data;
        localStorage.setItem('authToken', token);
        console.log(token);
      });
    // fetch('http://localhost:9000/signup', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     firstname: this.state.strFirstName,
    //     lastname: this.state.strLastName,
    //     email: this.state.strEmail,
    //     password: this.state.strPassword,
    //     profession: this.state.strProfession,
    //     registeredDate: this.state.strRegisteredDate
    //   })
    // });
  };
  handleChange = (strInputValue, strInputType) => {
    switch (strInputType) {
      case 'firstName':
        this.setState({
          strFirstName: strInputValue
        });
        break;
      case 'lastName':
        this.setState({
          strLastName: strInputValue
        });
        break;
      case 'profession':
        this.setState({
          strProfession: strInputValue
        });
        break;
      case 'email':
        this.setState({
          strEmail: strInputValue
        });
        break;
      case 'password':
        this.setState({
          strPassword: strInputValue
        });
        break;

      default:
        return;
    }
  };
  render() {
    const {
      strFirstName,
      strLastName,
      strProfession,
      strEmail,
      strPassword
    } = this.state;
    return (
      <>
        <h1>Sign Up to our TodoApp</h1>
        <form>
          <label>First Name</label>
          <input
            onChange={e => this.handleChange(e.target.value, 'firstName')}
            value={strFirstName}></input>
          <br />
          <label>Last Name</label>
          <input
            onChange={e => this.handleChange(e.target.value, 'lastName')}
            value={strLastName}></input>
          <br />
          <label>Profession</label>
          <input
            onChange={e => this.handleChange(e.target.value, 'profession')}
            value={strProfession}></input>
          <br />
          <label>Email</label>
          <input
            onChange={e => this.handleChange(e.target.value, 'email')}
            value={strEmail}></input>
          <br />
          <label>Password</label>
          <input
            onChange={e => this.handleChange(e.target.value, 'password')}
            value={strPassword}></input>
          <br />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </>
    );
  }
}

export default SignUp;
