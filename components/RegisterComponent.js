import React, { useState } from 'react';
import axios from 'axios';
import { Translate } from 'react-translated';
import { Typography } from '@material-ui/core';
import 'bulma/css/bulma.min.css';

const RegisterComponent = () => {
  const [input, setInput] = useState({
    replyToken: '',
  });
  const [result, setResult] = useState({
    type: '',
    message: '',
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 ~ RegisterComponent ~ handleSubmit= ~ replyToken', input.replyToken);
    const result = await axios
      .post('http://localhost:4001/register', { replyToken: input.replyToken })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        console.log('🚀 ~ RegisterComponent ~ handleSubmit= ~ err', err);
        return Promise.resolve({ success: false });
      });
    console.log('🚀 ~ RegisterComponent ~ handleSubmit= ~ result', result);
    if (result && result.success) {
      setResult({
        type: 'success',
        message: 'Pass',
      });
    } else {
      setResult({
        type: 'error',
        message: 'Not Pass',
      });
    }
  };

  return (
    <div className='section'>
      <Typography variant='h2' style={{ textAlign: 'center' }}>
        <Translate text='Register Key' />
      </Typography>
      <br />
      <div className='container'>
        <div className='columns'>
          <div className='column' />
          <div className='column  is-two-thirds'>
            <div className={result.type === 'success' ? 'tile box notification is-primary' : 'is-hidden'}>
              <Translate variant='p' text={result.message} />
            </div>
            <div className={result.type === 'error' ? 'tile box notification is-danger' : 'is-hidden'}>
              <Translate variant='p' text={result.message} />
            </div>
            <div className={result.message !== '' ? 'is-hidden' : 'columns'}>
              <div className='column content'>
                <form onSubmit={handleSubmit}>
                  <div className='field'>
                    <Typography variant='body1' style={{ marginBottom: '5px' }}>
                      <Translate text='Your Key (LINE)' />
                    </Typography>
                    <div className='control'>
                      <input
                        className='input'
                        type='text'
                        placeholder='replyToken'
                        name='replyToken'
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className='field is-grouped'>
                    <div className='control'>
                      <button className='button is-primary' type='submit'>
                        <Translate text='Submit' />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='column' />
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
