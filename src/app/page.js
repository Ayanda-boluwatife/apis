import React from 'react';
import ApiList from '@/components/ApiList';

const IndexPage = () => {
  return (
    <div className="container mx-auto w-full p-4">
      <h1 className="text-3xl font-semibold text-center mb-8">API Interface</h1>
      <ApiList />
    </div>
  );
};

export default IndexPage;
