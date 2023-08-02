"use client"

import {React, useState } from 'react'
import ApiList from '@/components/ApiList'
import ApiDetails from '@/components/ApiDetails'

export default function Home() {
  const [selectedAPI, setSelectedAPI] = useState(null);

  const showAPIDetails = (api) => {
    setSelectedAPI(api);
  };

  return (
    <div className=" w-full p-4">
      <h1 className="text-3xl font-semibold text-center mb-8">API Interface</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ApiList showAPIDetails={showAPIDetails} />
        {selectedAPI && <ApiDetails api={selectedAPI} />}
      </div>
    </div>
  );
}
