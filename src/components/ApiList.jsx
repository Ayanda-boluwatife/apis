"use client"

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ApiDetails from './ApiDetails';

const apiUrl = 'https://api.publicapis.org/entries'; // Replace this with the actual API endpoint

const ApiList = () => {
  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAPI, setSelectedAPI] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAPIs = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setApiData(data.entries);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };

    fetchAPIs();
  }, []);

  // Constants for pagination
  const itemsPerPage = 50;

  // Function to handle pagination click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Function to get the range of page numbers to display
  const getPageRange = () => {
    const totalButtons = 5;
    const middleButton = Math.floor(totalButtons / 2);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    let startPage = currentPage - middleButton;
    let endPage = currentPage + middleButton;

    if (startPage <= 0) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  // Filter the API data based on the search query
  const filteredData = apiData.filter(
    (api) =>
      api.API.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.Description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle API list item click and open the modal
  const handleAPIItemClick = (api) => {
    setSelectedAPI(api);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedAPI(null);
  };

  // Function to handle pagination and display 50 items at a time
  const getPaginatedData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  };

  return (
    <section className="w-full">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search APIs..."
          className="px-2 py-1 border rounded"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {getPaginatedData().map((api, index) => (
          <div
            key={index}
            className="p-4 w-full md:w-auto border rounded cursor-pointer"
            onClick={() => handleAPIItemClick(api)}
          >
            <h2 className="text-xl font-semibold">{api.API}</h2>
            <p>{api.Description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button
            className="mx-1 px-2 py-1 rounded bg-gray-300"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            Prev
          </button>
        )}
        {filteredData.length > 0 &&
          getPageRange().map((pageNumber) => (
            <button
              key={pageNumber}
              className={`mx-1 px-2 py-1 rounded ${
                currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        {currentPage < Math.ceil(filteredData.length / itemsPerPage) && (
          <button
            className="mx-1 px-2 py-1 rounded bg-gray-300"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
      <Modal
        isOpen={selectedAPI !== null}
        onRequestClose={handleCloseModal}
        contentLabel="API Details Modal"
        className="modal-content absolute"
        overlayClassName="modal-overlay"
      >
        {selectedAPI && <ApiDetails api={selectedAPI} />}
        <button className="modal-close-btn" onClick={handleCloseModal}>
          Close
        </button>
      </Modal>
    </section>
  );
};

export default ApiList;
