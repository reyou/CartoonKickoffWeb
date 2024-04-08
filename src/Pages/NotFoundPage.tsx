import React from 'react';
import PageLayout from '../PageLayout';

const NotFoundPage: React.FC = () => {
  return (
    <PageLayout title='404 - Page Not Found'>
      <p className='text-center'>
        The page you are looking for doesn't exist or has been moved.
      </p>
    </PageLayout>
  );
};

export default NotFoundPage;
