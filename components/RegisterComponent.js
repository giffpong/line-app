import React, { Component } from 'react';
import axios from 'axios';
import { Translate } from 'react-translated';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import styles from '../styles/Register.module.css';

class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      replyToken: '',
      showResult: false,
      result: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { replyToken } = this.state;
    console.log('🚀 ~ RegisterComponent ~ handleSubmit= ~ replyToken', replyToken);
    const result = await axios
      .post('http://localhost:4001/register', { replyToken })
      .then((response) => {
        return Promise.resolve(response.data.result);
      })
      .catch((err) => {
        console.log('🚀 ~ RegisterComponent ~ handleSubmit= ~ err', err);
        return Promise.resolve(false);
      });
    console.log('🚀 ~ RegisterComponent ~ handleSubmit= ~ result', result);
    this.setState({
      result: result,
      showResult: true,
    });
  };

  componentDidUpdate() {
    if (this.state.showResult && this.state.result) {
      document.getElementById('result').innerHTML = 'result: ' + this.state.result;
    }
  }

  render() {
    return (
      <div className={styles['register-form']}>
        <br />
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <h1>Register LINE OA Key</h1>
            <p id='result' />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='replyToken'
                placeholder='replyToken'
                onChange={this.handleInputChange}
              />
            </div>
            <br />
            <div className='submit-btn' style={{ width: '30%' }}>
              <button className='btn btn-success' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;
