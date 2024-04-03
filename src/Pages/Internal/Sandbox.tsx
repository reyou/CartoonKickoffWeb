import React, { useState, useEffect, ChangeEvent } from 'react';
import { decodeJwt } from 'jose';
import PageLayout from '../../PageLayout';

export default function Sandbox() {
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState('');
  const [decodeError, setDecodeError] = useState('');

  useEffect(() => {
    // Load the token from local storage on component mount
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      decodeJWT(storedToken);
    }
  }, []);

  const handleTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
    decodeJWT(event.target.value);
  };

  const decodeJWT = (jwtToken: string) => {
    try {
      const decoded = decodeJwt(jwtToken);
      setDecodedToken(JSON.stringify(decoded, null, 2));
      setDecodeError('');
    } catch (error: any) {
      setDecodedToken('');
      setDecodeError('Error decoding token: ' + error.message);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('token', token);
  };

  return (
    <PageLayout title='Sandbox'>
      <form onSubmit={handleSubmit} className='container mt-3'>
        <div className='mb-3'>
          <label htmlFor='tokenInput' className='form-label'>
            Token:
          </label>
          <input
            type='text'
            className='form-control'
            id='tokenInput'
            value={token}
            onChange={handleTokenChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Set Token
        </button>
        <div className='mt-3'>
          <label htmlFor='decodedTokenTextarea' className='form-label'>
            Decoded Token:
          </label>
          <textarea
            className='form-control'
            id='decodedTokenTextarea'
            readOnly
            value={decodeError ? decodeError : decodedToken}
            rows={10}
          />
        </div>
      </form>
    </PageLayout>
  );
}
