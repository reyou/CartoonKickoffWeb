import { useState, FormEvent } from 'react';
import PageLayout from '../PageLayout';
import Http from '../Services/Http';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Login with:', email, password);
    try {
      const response = await Http.post('login', {
        email,
        password
      });
      console.log({
        file: __filename,
        function: 'functionName',
        response,
        guid: 'b4c39e02-a8c2-4b34-82bf-5cd8bbb47d63'
      });
    } catch (error) {
      console.log({
        file: __filename,
        function: 'functionName',
        error,
        guid: 'c2a24cc0-5342-479e-907a-f6e943bd6303'
      });
    }
  };

  return (
    <PageLayout title='Login'>
      <form onSubmit={handleLogin}>
        <div className='mb-3'>
          <label htmlFor='emailInput' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='passwordInput' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary w-100'>
          Login
        </button>
      </form>
    </PageLayout>
  );
}

export default LoginPage;
