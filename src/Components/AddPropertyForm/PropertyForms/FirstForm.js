import { useEffect } from "react";
import PropTypes from "prop-types";
import './FirstForm.css'
export const FirstForm = ({ setStep, setOfferType, setPropertyType,propertyType, offerType, setValue, reset, setShowSecondFormErrors  }) => {
    useEffect(() => {
        //reset(); //remove reset if you want to reset form between one and two
        setShowSecondFormErrors(false);
        setValue('propertyCategory', propertyType)
        setValue('propertyListingFor', offerType)
    }, [propertyType, offerType]);
    const handlePropertyTypeChange = (event) => {
        setValue('propertyCategory', event.target.value)
        setPropertyType(event.target.value);
    };

    const handleOfferTypeChange = (event) => {
        
        if(event?.target?.value === 'Sell'){
            setValue('propertyCategory', 'Residential')
            setPropertyType('Residential');
        }
        setValue('propertyListingFor', event.target.value)
        setOfferType(event.target.value);
    };
    return (
        <div className="PropertyFormContainer">
            <h4 className="Propertyh2">Select Offer Type</h4>
            <select value={offerType} onChange={handleOfferTypeChange} className="PropertySelectBox">
                <option value="Sell">Sell</option>
                <option value="Rent">Rent</option>
            </select>
            <h4 className="Propertyh2">Select Property Type</h4>
            <select value={propertyType} onChange={(event) => {handlePropertyTypeChange(event)}} className="PropertySelectBox">
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
                {offerType === 'Rent' && <option value="PG">PG</option>}
            </select>
            <button
                onClick={() => {
                    setStep(1)
                }} className="PropertyNextButton">Choose and Next</button>

            <p>You cannot comeback to this section again.</p>
        </div>
    );
}

FirstForm.propTypes = {
    setStep: PropTypes.func
}