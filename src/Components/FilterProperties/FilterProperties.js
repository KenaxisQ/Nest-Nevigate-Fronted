import { React, useState } from 'react';
import './FilterProperties.css';
import Navbar from '../CustomNavbar/CustomNavbar';
import PropertyCard from '../PropertyCard/PropertyCard';
import CustomRangeSlider from '../Slider/MultiRangeSlider';
import RangeSlider from '../Slider/RangeSlider';
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import FindPropertyByCity from '../FindPropetiesByCity/FindPropertyByCity';
import Footer from '../Footer/Footer';
import { BsSearch } from "react-icons/bs";


export default function FilterProperties({ properties }) {
  const [leaseValue, setLeaseValue] = useState(50); // Default value
  const [budget, setBudget] = useState(70); // Default value
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Track whether the filter is open
  const [showAllProperties, setShowAllProperties] = useState(false); // Toggle between showing 12 and all properties
  const [searchKeyword, setSearchKeyword] = useState("");
  // Handle slider changes
  const handleLeaseChange = (newValue) => setLeaseValue(newValue);
  const handleBudgetChange = (newValue) => setBudget(newValue);

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

  const propertiesToShow = showAllProperties ? properties : properties.slice(0, 12);

  return (
    <div className="SearchContent">
      <Navbar/>
     <div className="filterOptionsWrapper">
     <div className="filterSearchWrapper">
	    <input id="search" className='searchProperties' placeholder='Search Properties...' type="search" onChange={(e)=>setSearchKeyword(e.target.value)}/>
      <button className='btn search_button'>Search&nbsp;&nbsp;<BsSearch /></button>
      </div>
      <div className="filterButtonWrapper">
      <button className='btn filterbtn bg_1F4B43' onClick={()=>{setIsFilterOpen(!isFilterOpen)}}>{!isFilterOpen?<MdFilterAlt size="30px" />:< MdFilterAltOff size="30px"/>}<span className='hideFilterText'>{!isFilterOpen?"Show Filter":"Hide Filter"}</span></button>
      </div>
     </div>
     {searchKeyword!=""&&searchKeyword.length>5&&
     (
      <div className="searchInfo">
      <h4>Showing Results"{searchKeyword}"</h4>
      <p>{Math.floor(Math.random() * (100 - 1 + 1)) +1  } Properties found</p>
      </div>
      )}

    <div className="Wrapper row">
      {isFilterOpen && (
        <div className="col-lg-3" style={{padding:'20px'}}>
          <div className="filterComponent">
            <div className="filterOptions">
              <button className="rentOrBuybtn bg_1F4B43 color_white">Buy</button>
              <button className="rentOrBuybtn bg_E9E9E9">Rent</button>

              <p className="selectRealestateType">Real Estate Type</p>
              <div className="filterOptionsForRealestateType">
                {realestateOptions.map((opt) => (
                  <p key={opt.id}>
                    <input type="checkbox" /> &nbsp;{opt.label}
                  </p>
                ))}
              </div>

              <p className="selectRealestateType">Budget</p>
              <CustomRangeSlider min={0} max={100} value={budget} onChange={handleBudgetChange} />

              <p className="selectRealestateType">Bedroom</p>
              <div className="filterOptionsForBedRooms">
                {bedroomOptions.map((opt) => (
                  <p key={opt.id}>
                    <input type="checkbox" /> &nbsp;{opt.label}
                  </p>
                ))}
              </div>

              <p className="selectRealestateType">Furnishing Type</p>
              <div className="filterOptionsForFurniture">
                {furnitureOptions.map((opt) => (
                  <p key={opt.id}>
                    <input type="checkbox" /> &nbsp;{opt.label}
                  </p>
                ))}
              </div>

              <p className="selectRealestateType">Others</p>
              <div className="filterOptionsForFurniture">
                {others.map((opt) => (
                  <p key={opt.id}>
                    <input type="checkbox" /> &nbsp;{opt.label}
                  </p>
                ))}
              </div>

              <p className="selectRealestateType">Minimum Lease Duration</p>
              <RangeSlider min={0} max={100} step={5} value={leaseValue} onChange={handleLeaseChange} />
              <p>
                <span className="LeaseValue">{leaseValue}</span>&nbsp; Months
              </p>
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
                    type={property.type}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    beds={property.beds}
                    washrooms={property.washrooms}
                    area={property.area}
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
                    type={property.type}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    beds={property.beds}
                    washrooms={property.washrooms}
                    area={property.area}
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
                    type={property.type}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    beds={property.beds}
                    washrooms={property.washrooms}
                    area={property.area}
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
                      type={property.type}
                      title={property.title}
                      location={property.location}
                      price={property.price}
                      beds={property.beds}
                      washrooms={property.washrooms}
                      area={property.area}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* View All button */}
      <div className="viewAllButton">
        <button onClick={toggleViewAll} className="btn viewAllBtn">
          {showAllProperties ? "Show Less" : "View All"}
        </button>
      </div>
    </div>
    <FindPropertyByCity/>
    <Footer/>
    </div>
  );
}
