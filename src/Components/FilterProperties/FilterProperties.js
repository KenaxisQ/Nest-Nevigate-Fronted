import { React, useState, useEffect } from 'react';
import './FilterProperties.css';
import { useWatch, useForm } from 'react-hook-form';
import Navbar from '../CustomNavbar/CustomNavbar';
import PropertyCard from '../PropertyCard/PropertyCard';
import CustomRangeSlider from '../Slider/MultiRangeSlider';
import RangeSlider from '../Slider/RangeSlider';
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import FindPropertyByCity from '../FindPropetiesByCity/FindPropertyByCity';
import Footer from '../Footer/Footer';
import { BsSearch } from "react-icons/bs";
import HttpService from '../../Services/http';
import { MultiselectDropdown } from '../MultiselectDropdown/MultiselectDropdown';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';

export default function FilterProperties({ properties,isListingsPage=false,isFindPropertyByCityRequired}) {
  const [leaseValue, setLeaseValue] = useState(50); // Default value
  const [budget, setBudget] = useState(70); // Default value
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Track whether the filter is open
  const [showAllProperties, setShowAllProperties] = useState(false); // Toggle between showing 12 and all properties
  const [searchKeyword, setSearchKeyword] = useState("");
  const [Listings, setListings] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedMiscellaneous, setSelectedMiscellaneous] = useState([]);
  const [selectedNearbyServices, setSelectedNearbyServices] = useState([]);  const [amminitiesJson, setAmminitiesJson] = useState([]);
  const [miscelleneousJson, setMiscelleneousJson] = useState([]);
  const [nearByFacilitiesJson, setNearByFacilitiesJson] = useState([]);

   // Handle slider changes
   const location = useLocation();
   const { listingsData } = location.state || {}; // Handle undefined state

  useEffect(() =>{
    const getAllListings = async () => {
      try{
        const https = new HttpService();
        const propertyResponse = await https.post('property/filter', {...listingsData})
    setListings(propertyResponse.data);
    }
    catch(error) {
      console.log('Error fetching All Listing', error);
    }
  }
    getAllListings();

  }, [listingsData])
 
  useEffect(() => {
    if (listingsData?.searchKeyword) {
      setSearchKeyword(listingsData.searchKeyword);
    }
  }, [listingsData?.searchKeyword]);

  const fetchSearchResults= async (event) =>{
    const https = new HttpService();
        const propertyResponse = await https.post('property/filter', {searchKeyword})
        setListings(propertyResponse.data);
  }
  const handleLeaseChange = (newValue) => setLeaseValue(newValue);
  const handleBudgetChange = (newValue) => setBudget(newValue);
  const getAmenities = async () => {
    try{
    var https = new HttpService();
    var allAmenities = await https.get('amenity');
      // setSelected(allAmenities);
      setAmminitiesJson(allAmenities.filter(amm => amm?.subCategory === "Amenities").map(amm => ({ label: amm?.name, value: amm?.id })));
      setMiscelleneousJson(allAmenities.filter(amm => amm?.subCategory === "Miscellaneous").map(amm => ({ label: amm.name, value: amm.id })));
      setNearByFacilitiesJson(allAmenities.filter(amm => amm?.subCategory === "Near By Services").map(amm => ({ label: amm.name, value: amm.id })));
    }
    catch(error)
    {
      console.log(error);
    }
    
  }
  // Toggle filter visibility
  const toggleFilter = () => {
    setIsFilterOpen((prevState) => !prevState);
  };

  // Toggle "View All" functionality
  const toggleViewAll = () => {
    setShowAllProperties((prevState) => !prevState);
  };

  // Sample options for filters
  const bedroomOptions = [
    { id: 1, label: '1 Bedroom' },
    { id: 2, label: '2 Bedrooms' },
    { id: 3, label: '3 Bedrooms' },
    { id: 4, label: '4 Bedrooms' },
    { id: 5, label: '4+ Bedrooms' },
  ];

  const realestateOptions = [
    { id: 1, label: "Flat/Apartment" },
    { id: 2, label: "Serviced Apartment" },
    { id: 3, label: "1 RK/ Studio Room" },
    { id: 4, label: "Independent Builder Floor" },
    { id: 5, label: "Farm House" },
    { id: 6, label: "Others" },
  ];

  const furnitureOptions = [
    { id: 1, label: "Semi Furnished" },
    { id: 2, label: "Fully Furnished" },
    { id: 3, label: "UnFurnished" },
  ];

  const others = [
    { id: 1, label: "Smoking Allowed" },
    { id: 2, label: "Pet Allowed" },
    { id: 3, label: "Subletting Permission" },
  ];

  const defaultValues = {
    propertyCategory: listingsData?.propertyCategory || 'Buy',
    budget: [0, 100],
    selectedBedrooms: [],
    selectedFurnishing: [],
    selectedOthers: [],
    selectedAmenities: [],
    selectedMiscellaneous: [],
    selectedNearbyServices: [],
  };

  const propertiesToShow = showAllProperties ? Listings : Listings?.slice(0, 12);
  const { control, setValue, register, handleSubmit } = useForm({
    defaultValues: defaultValues
  });

 

  const formValues = useWatch({ control });

  const handleCategoryChange = (category) => {
    setValue('propertyCategory', category);
  };

  const handleCheckboxChange = (key, value) => {
    const updatedValues = formValues[key].includes(value)
      ? formValues[key].filter((v) => v !== value)
      : [...formValues[key], value];
    setValue(key, updatedValues);
  };

  const handleRangeChange = (value) => {
    setValue('budget', value);
  };

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    const https = new HttpService();
    const propertyResponse = await https.post('property/filter', {propertyCategory: data?.propertyCategory});
    setListings(propertyResponse?.data);
  };
  console.log('formValues', formValues);
  const isFormModified = !_.isEqual(formValues, defaultValues);

  return (
    <div className="SearchContent">
      <Navbar/>
     <div className="filterOptionsWrapper">
     <div className="filterSearchWrapper">
	    <input id="search" className='searchProperties' value={searchKeyword} placeholder={'Search Properties...'} type="search" onChange={(e)=>setSearchKeyword(e.target.value)}/>
      <button className='btn search_button' onClick={fetchSearchResults}>Search&nbsp;&nbsp;<BsSearch /></button>
      </div>
      <div className="filterButtonWrapper">
      {!isListingsPage && (<button className='btn filterbtn bg_1F4B43' onClick={()=>{setIsFilterOpen(!isFilterOpen); getAmenities();}}>{!isFilterOpen?<MdFilterAlt size="30px" />:< MdFilterAltOff size="30px"/>}<span className='hideFilterText'>{!isFilterOpen?"Show Filter":"Hide Filter"}</span></button>)}
      </div>
     </div>
     {
     (
      <div className="searchInfo">
      <h4>Showing Results for "{searchKeyword === "" && !isFormModified  ? 'All' : searchKeyword}"</h4>
      <p>{Listings?.length} Properties found</p>
      </div>
      )}

    <div className="Wrapper row">
      {isFilterOpen && (
        <div className="col-lg-3" style={{padding:'20px'}}>
          <div className="filterComponent">
            <div className="filterOptions">
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* Buy/Rent Buttons */}
      <button
        type="button"
        className={`rentOrBuybtn ${formValues.propertyCategory === 'Buy' ? 'bg_1F4B43 color_white' : 'bg_E9E9E9 color_black'}`}
        onClick={() => handleCategoryChange('Buy')}
      >
        Buy
      </button>
      <button
        type="button"
        className={`rentOrBuybtn ${formValues.propertyCategory === 'Rent' ? 'bg_1F4B43 color_white' : 'bg_E9E9E9 color_black'}`}
        onClick={() => handleCategoryChange('Rent')}
      >
        Rent
      </button>

      {/* Real Estate Type */}
      <p className="selectRealestateType">Real Estate Type</p>
      <div className="filterOptionsForRealestateType">
        {realestateOptions.map((opt) => (
          <p key={opt.id}>
            <input
              type="checkbox"
              value={opt.label}
              checked={formValues.selectedRealEstate?.includes(opt.label)}
              onChange={() => handleCheckboxChange('selectedRealEstate', opt.label)}
            />{' '}
            &nbsp;{opt.label}
          </p>
        ))}
      </div>

      {/* Budget */}
      <p className="selectRealestateType">Budget</p>
      <CustomRangeSlider
        min={0}
        max={100}
        value={formValues.budget}
        onChange={handleRangeChange}
      />

      {/* Bedroom */}
      <p className="selectRealestateType">Bedroom</p>
      <div className="filterOptionsForBedRooms">
        {bedroomOptions.map((opt) => (
          <p key={opt.id}>
            <input
              type="checkbox"
              value={opt.label}
              checked={formValues.selectedBedrooms?.includes(opt.label)}
              onChange={() => handleCheckboxChange('selectedBedrooms', opt.label)}
            />{' '}
            &nbsp;{opt.label}
          </p>
        ))}
      </div>

      {/* Furnishing Type */}
      <p className="selectRealestateType">Furnishing Type</p>
      <div className="filterOptionsForFurniture">
        {furnitureOptions.map((opt) => (
          <p key={opt.id}>
            <input
              type="checkbox"
              value={opt.label}
              checked={formValues.selectedFurnishing?.includes(opt.label)}
              onChange={() => handleCheckboxChange('selectedFurnishing', opt.label)}
            />{' '}
            &nbsp;{opt.label}
          </p>
        ))}
      </div>

      {/* Others */}
      <p className="selectRealestateType">Others</p>
      <div className="filterOptionsForFurniture">
        {others.map((opt) => (
          <p key={opt.id}>
            <input
              type="checkbox"
              value={opt.label}
              checked={formValues.selectedOthers?.includes(opt.label)}
              onChange={() => handleCheckboxChange('selectedOthers', opt.label)}
            />{' '}
            &nbsp;{opt.label}
          </p>
        ))}
      </div>

      {/* Amenities */}
      <p className="text-start selectRealestateType">Amenities</p>
      <MultiselectDropdown
        options={amminitiesJson}
        setSelected={(value) => setValue('selectedAmenities', value)}
        selected={formValues.selectedAmenities}
      />

      {/* Miscellaneous */}
      <p className="text-start selectRealestateType">Miscellaneous</p>
      <MultiselectDropdown
        options={miscelleneousJson}
        setSelected={(value) => setValue('selectedMiscellaneous', value)}
        selected={formValues.selectedMiscellaneous}
      />

      {/* Nearby Facilities */}
      <p className="text-start selectRealestateType">Near By Facilities</p>
      <MultiselectDropdown
        options={nearByFacilitiesJson}
        setSelected={(value) => setValue('selectedNearbyServices', value)}
        selected={formValues.selectedNearbyServices}
      />

      <button type="submit">Search</button>
    </form>
              {/* <p className="selectRealestateType">Minimum Lease Duration</p>
              <RangeSlider min={0} max={100} step={5} value={leaseValue} onChange={handleLeaseChange} /> */}
              {/* <p>
                <span className="LeaseValue">{leaseValue}</span>&nbsp; Months
              </p> */}
            </div>
          </div>
        </div>
      )}

      {/* Property Cards Layout */}
      <div className={isFilterOpen ? "col-lg-9" : "col-lg-12"}>
        <div className="row">
          {/* Column 1 */}
          <div className={isFilterOpen ? "col-lg-4" : "col-lg-3"}>
            {propertiesToShow
              .filter((_, index) => !isFilterOpen ? index % 4 === 0 : index % 3 === 0)
              .map((property) => (
                <div className="cardWrapper" key={property.id}>
                  <PropertyCard
                    type={property.propertyListingFor}
                    title={property.title}
                    location={property.village}
                    price={property.price}
                    beds={property.noOfBedrooms}
                    washrooms={property.noOfBathrooms}
                    area={property.carpetArea}
                    isFeatured={property.isFeatured}
                  />
                </div>
              ))}
          </div>

          {/* Column 2 */}
          <div className={isFilterOpen ? "col-lg-4" : "col-lg-3"}>
            {propertiesToShow
              .filter((_, index) => !isFilterOpen ? index % 4 === 1 : index % 3 === 1)
              .map((property) => (
                <div className="cardWrapper" key={property.id}>
                  <PropertyCard
                    type={property.propertyListingFor}
                    title={property.title}
                    location={property.village}
                    price={property.price}
                    beds={property.noOfBedrooms}
                    washrooms={property.noOfBathrooms}
                    area={property.carpetArea}
                    isFeatured={property.isFeatured}
                  />
                </div>
              ))}
          </div>

          {/* Column 3 */}
          <div className={isFilterOpen ? "col-lg-4" : "col-lg-3"}>
            {propertiesToShow
              .filter((_, index) => !isFilterOpen ? index % 4 === 2 : index % 3 === 2)
              .map((property) => (
                <div className="cardWrapper" key={property.id}>
                  <PropertyCard
                    type={property.propertyListingFor}
                    title={property.title}
                    location={property.village}
                    price={property.price}
                    beds={property.noOfBedrooms}
                    washrooms={property.noOfBathrooms}
                    area={property.carpetArea}
                    isFeatured={property.isFeatured}
                  />
                </div>
              ))}
          </div>

          {/* Column 4 (Only when filter is open) */}
          {!isFilterOpen && (
            <div className="col-lg-3">
              {propertiesToShow
                .filter((_, index) => index % 4 === 3)
                .map((property) => (
                  <div className="cardWrapper" key={property.id}>
                    <PropertyCard
                      type={property.propertyListingFor}
                      title={property.title}
                      location={property.village}
                      price={property.price}
                      beds={property.noOfBedrooms}
                      washrooms={property.noOfBathrooms}
                      area={property.carpetArea}
                      isFeatured={property.isFeatured}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* View All button */}
      <div className="viewAllButton">
        <button onClick={toggleViewAll} className="btn viewAllBtn" style={{background:'#1F4B43', color:'white', borderRadius:'20px'}}>
          {showAllProperties ? "Show Less" : "View All"}
        </button>
      </div>
    </div>
    {isFindPropertyByCityRequired&&<FindPropertyByCity/>}
    <Footer/>
    </div>
  );
}
