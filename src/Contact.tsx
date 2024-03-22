import React, { useState } from 'react';
import PageLayout from './PageLayout';
import Http from './Services/Http';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    const formData = {
      name: name,
      email: email,
      message: message
    };

    try {
      const response = await Http.post('contact-us', formData);
      // Handle the response here
      console.log('Form submitted successfully', response.data);
      // Optionally reset the form or navigate the user to a thank you page
    } catch (error) {
      // Handle errors here
      setErrorMessage('Failed to send message. Please try again later.');
      console.error('Error submitting form', error);
    }
  };

  return (
    <PageLayout title='Contact Us'>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='message' className='form-label'>
            Message
          </label>
          <textarea
            className='form-control'
            id='message'
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary'>
          Send Message
        </button>
        {errorMessage && (
          <div className='alert alert-danger mt-3' role='alert'>
            {errorMessage}
          </div>
        )}
      </form>
    </PageLayout>
  );
}

export default ContactUs;
