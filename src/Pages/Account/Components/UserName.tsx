import { useState } from 'react';

type UserProfile = {
  username: string;
};

export default function UserName() {
  const [profile, setProfile] = useState<UserProfile>({
    username: ''
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='username' className='form-label'>
          Username
        </label>
        <input
          type='text'
          className='form-control'
          id='username'
          name='username'
          value={profile.username}
          onChange={handleChange}
          required
        />
      </div>
    </form>
  );
}
