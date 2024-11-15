import {React,useState} from 'react'
import './FilterProperties.css'
import CustomRangeSlider from '../Slider/MultiRangeSlider'
import RangeSlider from '../Slider/RangeSlider'
import 'react-range-slider-input/dist/style.css';
export default function FilterProperties() {
  const [leaseValue, setLeaseValue] = useState(50);  // Default value

  const handleLeaseChange = (newValue) => {
    setLeaseValue(newValue);  // Update the state when the slider changes
  };
  const [budget, setBudget] = useState(70);
  const handleBudgetChange = (newValue) => {
    setBudget(newValue);
  };
  const bedroomOptions = [
    { id: 1, label: '1 Bedroom' },
    { id: 2, label: '2 Bedrooms' },
    { id: 3, label: '3 Bedrooms' },
    { id: 4, label: '4 Bedrooms' },
    { id: 5, label: '4+ Bedrooms' },
  ];
  const realestateOptions=[
    { "id": 1, "label": "Flat/Apartment" },
    { "id": 2, "label": "Serviced Apartment" },
    { "id": 3, "label": "1 RK/ Studio Room" },
    { "id": 4, "label": "Independent Builder Floor" },
    { "id": 5, "label": "Farm House" },
    { "id": 6, "label": "Others" }
  ]
  const furnitureOptions=[
    { "id": 1, "label": "Semi Furnished" },
    { "id": 2, "label": "Fully Furnished" },
    { "id": 3, "label": "UnFurnished" },
  ]
  const others=[
    {"id":1,"label":"Smoking Allowed"},
    {"id":2,"label":"Pet Allowed"},
    {"id":3,"label":"Subletting Permission"}
    ]

  return (
   <div className="filterProperty">
        <div className="row">
        <div className="filter col-lg-3">
            <button className='rentOrBuybtn bg_1F4B43 color_white'>Buy</button>
            <button className='rentOrBuybtn bg_E9E9E9'>Rent</button>
            <p className='selectRealestateType'>
            Real Estate Type
            </p>
           <div className="filterOptionsForRealestateType">
            {realestateOptions.map(opt=>(
               <p key={opt.id}><input type='checkbox' key={opt.id}/>&nbsp;{opt.label}</p>
            ))}
           </div>
           <p className='selectRealestateType'>
            Budget
            </p>
            <CustomRangeSlider min={0} max={100} value={budget} onChange={handleBudgetChange}/>
            <p className='selectRealestateType'>
            Bedroom
            </p>
            <div className="filterOptionsForBedRooms">
            {bedroomOptions.map(opt=>(
              <p key={opt.id}><input type='checkbox' key={opt.id}/>&nbsp;{opt.label}</p>
            ))}
           </div>
           <p className='selectRealestateType'>
           Furnishing Type
            </p>
           <div className="filterOptionsForFurniture">
            {furnitureOptions.map(opt=>(
              <p key={opt.id}><input type='checkbox' key={opt.id}/>&nbsp;{opt.label}</p>
            ))}
           </div>
           <p className='selectRealestateType'>
            Others
            </p>
           <div className="filterOptionsForFurniture">
            {others.map(opt=>(
              <p key={opt.id}><input type='checkbox' key={opt.id}/>&nbsp;{opt.label}</p>
            ))}
           </div>
           <p className='selectRealestateType'>
           Minimum Lease Duration
            </p>
            <RangeSlider min={0} max={100} step={5} value={leaseValue} onChange={handleLeaseChange}/>
           <p><span className='LeaseValue'>{leaseValue}</span>&nbsp; Months</p>
        </div>
        </div>
   </div>
  )
}
