import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';

import './Login.css';

class Login extends Component {
  state = {
    creds: {
      phone_number: '',
      password: '',
    }
  }

  handleChange = e => {
    this.setState({ 
      creds: {
        ...this.state.creds,
        [e.target.name]: e.target.value
      } 
    });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const { phone_number, password } = this.state.creds

    this.props
      .login({
        phone_number: parseInt(phone_number),
        password: password
      })
      .then(() => localStorage.setItem('user', this.props.id))
      .catch(err => console.log(err))
  }
      
  render = () => {
    const { number, password } = this.state.creds;

    return (
      <div className="loginPage">
        <div className="loginImg">
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text"
              value = { number }
              placeholder="Phone Number"
              name="phone_number"
              onChange={this.handleChange}
            />
            <input 
              type="password"
              value = { password }
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggingIn: state.loginReducer.loggingIn,
  id: state.loginReducer.id,
})

export default connect(mapStateToProps, { login })(Login)