import React from 'react';
import { connect } from 'react-redux';
import { register, login } from '../actions';

import './Register.css';

class Register extends React.Component {
  state = {
    creds: {
      name: '',
      phone_number: '',
      password: '',
      money_app_link: ''
    }
  };

  changeHandler = e => {
    this.setState({ 
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value 
      }
    })
  }

  submitHandler = e => {
    e.preventDefault();
    
    const {
      name,
      phone_number,
      password,
      money_app_link
    } = this.state.creds;

    this.props.register({
      name,
      phone_number: parseInt(phone_number),
      password,
      money_app_link
    })
      .then(() => {
        const creds = { phone_number, password };
        this.props.login(creds)
      })
      .then(() => localStorage.setItem('user', this.props.id))
      .then(() => this.props.history.push('/trip-split'))
      .catch(err => console.log(err))
  }

  render() { console.log(this.state)
    return (
      <div className="registerPage">
        <form className="registerForm" onSubmit={this.submitHandler}>
          <input 
            className="input"
            type="text"
            name="name"
            value={this.state.creds.name}
            placeholder="Name"
            onChange={this.changeHandler}
          />
          <input
            className="input"
            type="text"
            name="phone_number"
            value={this.state.creds.phone_number}
            placeholder="Phone Number"
            onChange={this.changeHandler}
          />
          <input 
            className="input"
            type="text"
            name="password"
            value = { this.state.creds.password }
            placeholder="Password"
            onChange={this.changeHandler}
          />
          <input
          className="input"
            type="text"
            name="money_app_link"
            value={this.state.creds.money_app_link}
            placeholder="Money App Link"
            onChange={this.changeHandler}
          />
          <button className="registerButton" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  id: state.registerReducer.id,
})

export default connect(mapStateToProps, { register, login })(Register);