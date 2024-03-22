import React, { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <h2 className='mb-4 text-center'>{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
