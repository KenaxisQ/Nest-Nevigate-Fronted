import React, { useState, useEffect } from 'react';
import './HomeContent.css'
import HttpService from '../../Services/http';
import { useNavigate } from 'react-router-dom';
export default function HomeContent({setFilteredProperties, setIsListingsPage}) {
  const filters = ['Buy', 'Rent', 'PG', 'Commercial', 'Land', 'Residential'];
  const [selectedFilter, setSelectedFilter] = useState('Buy'); // Default selected filter
  const [type, setType] = useState(''); // For second dropdown
  const [distinctTypes, setDistinctTypes] = useState([]);
  const [keywords, setKeywords] = useState(''); // For search input
  // const [category, setCategory] = useState('Buy'); // For first dropdown
  useEffect(() => {
    const getPropertyType = async () =>{
      const https = new HttpService();
      const response = await https.post('property/filter', {propertyCategory: selectedFilter})
      console.log('API', response);
      if (response?.data) {
        // Extract distinct `type` values
        const distinctTypes = [...new Set(response?.data?.map(item => item.type))];
        setDistinctTypes(distinctTypes);
        console.log('Distinct Types:', distinctTypes);
      }
    }
    getPropertyType();
  }, [selectedFilter])
  const navigate = useNavigate();
  const handleSearch = async () => {
    const apiData = {
      //category, for mobile
      propertyCategory: selectedFilter,
      type: type,
      searchKeyword: keywords
    };
    navigate('/listings', {state: {listingsData: apiData}});
    console.log('API Call Data:', apiData);
    const https = new HttpService();
    const propertyResponse = await https.post('property/filter', {...apiData})
    setFilteredProperties(propertyResponse?.data)
    setIsListingsPage(true);
  };
  return (
    <div className='container homeContentBody'>
      <p>From as low as $10 per day with limited time offer discounts.</p>
      <br/>
      <h1>Simplifying Real Estate in Srikakulam<br/>Find your Perfect Place with Next Navigators</h1>
      <div className='filterProperties'>
      {filters.map((filter) => (
        <div
          key={filter}
          className={`propertyFilter ${selectedFilter === filter ? 'selectedFilter' : ''}`}
          onClick={() => setSelectedFilter(filter)}
        >
          {filter}
        </div>
      ))}
      </div>
        <div className='searchSectionWrapper row'>
        <div className='categoryWapper selectWrapper col-lg-1'>
        <select
            className='selectBox'
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
           {filters.map((filter, index) => (
              <option key={index} value={filter}>
                {filter}
              </option>
           ))}
          </select>
        </div>
        <div className='selectWrapper col-lg-3'>
        <select
            className='selectBox'
            value={type}
            onChange={(e) => setType(e.target.value === 'All' ? "" : e.target.value)}
          >
            <option>All</option>
            {distinctTypes.map((filter, index) => (
              <option key={index} value={filter}>
                {filter}
              </option>
           ))}
          </select>
        </div>
        <div className='searchBoxWrapper col-lg-6'>
        <input
            type='text'
            placeholder='Enter Keywords'
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <div className='searchButtonWrapper col-lg-2'>
        <button className='btn btn-primary searchButton' onClick={handleSearch}>
            Search
          </button>        </div>
        </div>
        <div className='Gap_150'>

        </div>
    </div>
  )
}
