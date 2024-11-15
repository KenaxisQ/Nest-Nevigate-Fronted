import { React, useState } from 'react';
import './FilterProperties.css';
import CustomRangeSlider from '../Slider/MultiRangeSlider';
import RangeSlider from '../Slider/RangeSlider';
import 'react-range-slider-input/dist/style.css';
import PropertyCard from '../PropertyCard/PropertyCard';

export default function FilterProperties({ properties }) {
  const [leaseValue, setLeaseValue] = useState(50);  // Default value
  const [budget, setBudget] = useState(70);  // Default value
  const [isFilterOpen, setIsFilterOpen] = useState(true);  // Track whether the filter is open
  const [showAllProperties, setShowAllProperties] = useState(false);  // Toggle between showing 12 and all properties

  // Handle slider changes
  const handleLeaseChange = (newValue) => setLeaseValue(newValue);
  const handleBudgetChange = (newValue) => setBudget(newValue);

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

  // Toggle filter visibility
  const toggleFilter = () => {
    setIsFilterOpen((prevState) => !prevState);
  };

  // Toggle "View All" functionality
  const toggleViewAll = () => {
    setShowAllProperties((prevState) => !prevState);
  };

  const propertiesToShow = showAllProperties ? properties : properties.slice(0, 12);

  return (
    <div className="filterProperty">
      <div className="row">
        {/* Filter Section */}
        <div className={`filter ${isFilterOpen ? 'col-lg-3' : 'col-lg-12'}`} style={{ transition: 'width 0.3s' }}>
          <button className="toggleFilterBtn" onClick={toggleFilter}>
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
          {isFilterOpen && (
            <>
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
            </>
          )}
        </div>

        {/* Property Cards Section */}
        {/* <div className={`propertyCards ${isFilterOpen ? 'col-lg-9' : 'col-lg-12'}`}> */}
          <div className="propertyList row">
            {/* Loop through the properties and display them in a grid layout */}
            {propertiesToShow.map((property) => (
              <div className="col-lg-4 cardWrapper" key={property.id}>
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
          <div className="viewAllButton">
            <button onClick={toggleViewAll} className="btn viewAllBtn">
              {showAllProperties ? 'Show Less' : 'View All'}
            </button>
          </div>
        </div>
      </div>
    // </div>
  );
}
