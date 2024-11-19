import PropTypes from "prop-types";
import { useForm, FormProvider, useWatch } from "react-hook-form";
export const FourthForm = ({ setStep }) => {
    const miscelleneousJson = [
        {
            name: "Ownership documents provided",
            fieldName: "ownershipDocuments",
        },
        {
            name: "Ready to Move In",
            fieldName: "readyToMoveIn",
        },
        {
            name: "Financing Provided",
            fieldName: "financingProvided",
        },
        {
            name: "Pooja Room Available",
            fieldName: "poojaRoomAvailable",
        },
    ];

    const amminitiesJson = [
        {
            name: "Gym Facility",
            fieldName: "gymFacility",
        },
        {
            name: "Elevatory",
            fieldName: "elevator",
        },
        {
            name: "Power Backup",
            fieldName: "powerBackup",
        },
        {
            name: "Swimming",
            fieldName: "swimming",
        },
        {
            name: "Security",
            fieldName: "security",
        },
        {
            name: "Parking",
            fieldName: "parking",
        },
        {
            name: "Wifi facility",
            fieldName: "wifiFacility",
        },
        {
            name: "Heating",
            fieldName: "heating",
        },
    ];

    const nearByFacilitiesJson = [
        {
            name: "Taxi Stand",
            fieldName: "taxiStand",
        },
        {
            name: "Natural Park",
            fieldName: "naturalPark",
        },
        {
            name: "Shopping Complex",
            fieldName: "shoppingComplex",
        },
        {
            name: "Hospital",
            fieldName: "hospital",
        },
        {
            name: "Bus Stand",
            fieldName: "busStand",
        },
    ];

    const onSubmit = (evt) => {
        evt.preventDefault();
        // console.log("onSubmit", values);
    };
    return (
            <form onSubmit={onSubmit} novalidate className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <p for="exampleFormControlTextarea1" class="text-start">Enter Property Description</p>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Enter Description"></textarea>
                    </div>
                    <div className="col-lg-8">
                        <p for="exampleFormControlTextarea1" class="text-start">Amminities</p>
                        {amminitiesJson.reduce((rows, amenity, index) => {
                            if (index % 3 === 0) {
                                rows.push([]);
                            }
                            rows[rows.length - 1].push(amenity);
                            return rows;
                        }, []).map((row, rowIndex) => {
                            return (
                                <div key={rowIndex} className="row">
                                    {row.map(amenity => (
                                        <div key={amenity.fieldName} className="col-lg-4">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={amenity.fieldName}
                                                    name={amenity.fieldName}
                                                />
                                                <label className="form-check-label" htmlFor={amenity.fieldName}>
                                                    {amenity.name}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                    <p for="exampleFormControlTextarea1" class="text-start">Miscelleneous</p>
                        {miscelleneousJson.map((amenity, rowIndex) => {
                            return (
                                        <div key={amenity.fieldName} className="col-lg-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={amenity.fieldName}
                                                    name={amenity.fieldName}
                                                />
                                                <label className="form-check-label" htmlFor={amenity.fieldName}>
                                                    {amenity.name}
                                                </label>
                                            </div>
                                    
                                </div>
                            )
                        })}  
                    </div>
                    <div className="col-lg-8">
                        <p for="exampleFormControlTextarea1" class="text-start">Near By Facilities</p>
                        {nearByFacilitiesJson.reduce((rows, amenity, index) => {
                            if (index % 3 === 0) {
                                rows.push([]);
                            }
                            rows[rows.length - 1].push(amenity);
                            return rows;
                        }, []).map((row, rowIndex) => {
                            return (
                                <div key={rowIndex} className="row">
                                    {row.map(amenity => (
                                        <div key={amenity.fieldName} className="col-lg-4">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={amenity.fieldName}
                                                    name={amenity.fieldName}
                                                />
                                                <label className="form-check-label" htmlFor={amenity.fieldName}>
                                                    {amenity.name}
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </form>
    );
}

FourthForm.propTypes = {
    setStep: PropTypes.func.isRequired
}