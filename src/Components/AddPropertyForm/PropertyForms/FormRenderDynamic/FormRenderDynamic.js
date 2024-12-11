import "./FormRenderDynamic.css";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object as yupObject, string as yupString } from "yup";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from 'react-responsive';
import HttpService from "../../../../Services/http";
const validationSchema = yupObject().shape({
  // propertyTitle: yupString().required("Required"),
  // bedroom: yupString().required("Required"),
});
export const FormRenderDynamic = ({ setStep, displayjson, register, setValue, propertytype, offerType,values, errors, setErrors }) => {
  // Media query hooks
  console.log("erros", errors);
  const [touchedFields, setTouchedFields] = useState({});
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [amminitiesJson, setAmminitiesJson] = useState([]);
  const [miscelleneousJson, setMiscelleneousJson] = useState([]);
  const [nearByFacilitiesJson, setNearByFacilitiesJson] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]); // Track selected amenities in an array
  const [formTwoErrors, setFormTwoErrors] = useState({});
  const isSmall = useMediaQuery({ query: '(min-width: 576px)' });
  const isMedium = useMediaQuery({ query: '(min-width: 768px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 992px)' });
  const size = isLarge ? 'lg' : isMedium ? 'md' : isSmall ? 'sm' : '';
  const onSubmit = (evt) => {
    evt.preventDefault();
    setStep(2);
    // console.log("onSubmit", values);
  };
  const handleBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };
  useEffect(() => {
    const miscellaneous = [];
    const amenities = [];
    const nearByServices = [];
    const fetchAmenity = async () => {
      try {
        const https = new HttpService();
        const amenity = await https.get(`amenity/category/${propertytype}`);
        amenity.forEach(item => {
          const transformedItem = {
            name: item?.name,
            fieldName: item?.id,
          };

          if (item.subCategory === "Miscellaneous") {
            miscellaneous.push(transformedItem);
          } else if (item.subCategory === "Amenities") {
            amenities.push(transformedItem);
          } else if (item.subCategory === "Near By Services") {
            nearByServices.push(transformedItem);
          }
        });
        // Update state with categorized data
        setMiscelleneousJson(miscellaneous);
        setAmminitiesJson(amenities);
        setNearByFacilitiesJson(nearByServices);
        console.log('amenity', amenity);
      } catch (error) {
        console.error('Error fetching amenity:', error);
      }
    };

    fetchAmenity(); // Call the async function
  }, [propertytype]);
  console.log('Seconform', propertytype);
  console.log('secondformOffer', offerType);
  useEffect(() => {
    const initialErrors = {};
    displayjson?.forEach((prop) => {
        if (prop?.required && values[prop?.fieldName] === "") {
            initialErrors[prop?.fieldName] = `${prop?.title?.split("Select")[1] || prop?.title?.split("Enter")[1]} is required`;
        }
    });
    console.log('initialErrors', initialErrors);
    if (values['description'] === "") {
      // Remove the error if 'description' exists in initialValues
      initialErrors['description'] = 'Property Description is required.';
    }
    setFormTwoErrors(initialErrors);
    setErrors(initialErrors);
}, [displayjson, values]);

  const handleCheckboxChange = (fieldName, isChecked) => {
    
    setSelectedAmenities((prevSelected) => {
      // Update selected amenities array
      let updatedSelectedAmenities = isChecked
        ? [...prevSelected, fieldName]  // Add fieldName to array if checked
        : prevSelected.filter(item => item !== fieldName);  // Remove fieldName if unchecked

      // Set the value for the selectedAmenities in react-hook-form
      setValue("amenities", JSON.stringify(updatedSelectedAmenities));

      return updatedSelectedAmenities; // Return the updated state
    });
  };
  console.log('propertytype', propertytype);
  const validateField = (fieldName, fieldValue, isRequired) => {
    if (fieldValue === "" && isRequired) {
      setFormTwoErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: `${fieldName} is required`,
        }));
        setErrors(formTwoErrors);
      } else {
      setFormTwoErrors((prevErrors) => {
            const { [fieldName]: _, ...remainingErrors } = prevErrors;
            return remainingErrors;
        });
        setErrors(formTwoErrors);
      }
};
  return (
    <form onSubmit={onSubmit} className="mb-3 wrapText">
      <div className="row">
        <div className="col-lg-4">
          <div className="row">
            {displayjson?.map((prop, index) => {
              if (prop?.componetName === "Dropdown") {
                return (
                  <div
                    className="form-group col-sm-6"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                      padding: "0 16px 4px"
                    }}
                  >
                    <label for={prop?.title} style={{ fontWeight: 500 }}>
                      {prop?.title}

                    </label>
                    <select
                      placeholder={prop?.placeHolder}
                      id={prop?.title}
                      className="form-control-sm"
                      disabled={["propertyCategory", "propertyListingFor"].includes(prop?.fieldName)} // Disable for specific fields
                      required= {prop?.required}
                      {...register(prop?.fieldName)}
                      onChange={(event) => {
                        console.log(event);
                        setValue(prop?.fieldName, event?.target?.value);
                        validateField(prop?.fieldName, event?.target?.value, prop?.required);
                      }}
                      onBlur={() => handleBlur(prop?.fieldName)}
                    >
                      <option value={prop?.fieldName === "propertyCategory"
                          ? propertytype
                          : prop?.fieldName === "propertyListingFor"
                          ? offerType
                          : ""} selected disabled hidden>{prop?.fieldName === "propertyCategory"
                          ? propertytype
                          : prop?.fieldName === "propertyListingFor"
                          ? offerType
                          : "Select"}</option>
                      {prop?.options?.map(opt => {
                        return <option value={opt}>{opt}</option>
                      }
                      )}
                    </select>
                    {((touchedFields[prop?.fieldName] && prop?.required && values?.[prop?.fieldName] === "") ||( showAllErrors && values?.[prop?.fieldName] === "" || values?.[prop?.fieldName] == null) )? <span id="error-exampleField" class="error-message">
                        {prop?.title?.split("Select")[1]} is required.
                    </span> : null}
                  </div>
                );
              } else if (prop?.componetName === "Input") {
                return (
                  <div
                    className="form-group col-sm-6"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                      padding: "0 16px 4px",
                    }}
                  >
                    <label for={prop?.title} style={{ fontWeight: 500 }}>
                      {prop?.title}
                    </label>
                    <input
                      placeholder={prop?.placeHolder}
                      id={prop?.title}
                      type={prop?.type ? prop?.type : "text"}
                      required={prop?.required}
                      {...register(prop?.fieldName)}
                      className="form-control-sm"
                      style={{
                        border: "1px solid", borderRadius: "4px", height: 0,
                        color: "black"
                      }}
                      onChange={(event) => {
                        const value = event?.target?.value;
                        let parsedValue;

                      if (prop?.type === "number") {
                        // If the field type is "number", parse it as a number
                        parsedValue = value !== "" ? parseInt(value) : ""; // Handle empty values as empty string
                      } else if (prop?.type === "boolean") {
                        // If the field is a boolean, handle the boolean value appropriately
                        parsedValue = value === "true"; // Assuming the option is "true"/"false"
                      } else {      
                        // Otherwise, handle as string
                        parsedValue = value;
                      }

                      setValue(prop?.fieldName, parsedValue);
                      validateField(prop?.fieldName, event?.target?.value, prop?.required);
                      }}
                      onBlur={() => handleBlur(prop?.fieldName)}
                    />
                    {((touchedFields[prop?.fieldName] && prop?.required && values?.[prop?.fieldName] === "") ||( showAllErrors && values?.[prop?.fieldName] === "" || values?.[prop?.fieldName] == null) )? (<span id="error-exampleField" class="error-message">
                        {prop?.title?.split("Enter")[1]} is required.
                    </span>) : null}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="col-lg-8">
          <div className="row">
            <div className={`col-${size}-4`} style={{ padding: "0px 16px 4px" }}>
              <p for="exampleFormControlTextarea1" class="text-start">Enter Property Description</p>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Enter Description" {...register('description')}
                onChange={(event) => {
                  console.log(event);
                  setValue('description', event?.target?.value);
                  validateField('description', event?.target?.value, true);
                }}></textarea>
                {values?.['description'] === "" ? (<div id="error-exampleField" class="error-message text-start">
                        {'Property Description is required.'}
                    </div>) : null}
            </div>
            <div className={`col-${size}-8`} style={{ padding: "0 16px 4px" }}>
              <p for="exampleFormControlTextarea1" class="text-start">Amminities</p>
              {amminitiesJson?.reduce((rows, amenity, index) => {
                if (index % 3 === 0) {
                  rows?.push([]);
                }
                rows[rows?.length - 1]?.push(amenity);
                return rows;
              }, []).map((row, rowIndex) => {
                return (
                  <div key={rowIndex} className="row">
                    {row?.map(amenity => {
                    if (!amenity?.fieldName) {
                      console.error('Missing fieldName for amenity:', amenity);
                      return null;
                    } return (  
                      <div key={amenity?.fieldName} className={`col-${size}-4`}>
                        <div className="text-start">
                          <input
                            className=""
                            type="checkbox"
                            id={amenity?.fieldName}
                            name={amenity?.fieldName}
                            {...register(amenity?.fieldName)}
                            onChange={(event) => {
                              console.log('checked', event);
                              handleCheckboxChange(amenity?.fieldName, event?.target?.checked)
                            }}
                          />
                          <label className="" htmlFor={amenity?.fieldName}>
                            &nbsp;{amenity?.name}
                          </label>
                        </div>
                      </div>
                    )})}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="row">
            <div className={`col-${size}-4`} style={{ padding: "0 16px 4px" }}>
              <p for="exampleFormControlTextarea1" class="text-start">Miscelleneous</p>
              {miscelleneousJson?.map((amenity, rowIndex) => {
                return (
                  <div key={amenity?.fieldName} className={`col-${size}-12`}>
                    <div className="text-start">
                      <input
                        className=""
                        type="checkbox"
                        id={amenity?.fieldName}
                        name={amenity?.fieldName}
                        // onChange={(event) =>
                        //   setValue(amenity?.fieldName, event.target.value)
                        // }
                        {...register(amenity?.fieldName)}
                        onChange={(event) => {
                          console.log('checked', event);
                          handleCheckboxChange(amenity?.fieldName, event?.target?.checked)
                        }}
                      />
                      <label className="" htmlFor={amenity?.fieldName}>
                        &nbsp;{amenity?.name}
                      </label>
                    </div>

                  </div>
                )
              })}
            </div>
            <div className={`col-${size}-8`} style={{ padding: "0 16px 4px" }}>
              <p for="exampleFormControlTextarea1" class="text-start">Near By Facilities</p>
              {nearByFacilitiesJson?.reduce((rows, amenity, index) => {
                if (index % 3 === 0) {
                  rows.push([]);
                }
                rows[rows.length - 1].push(amenity);
                return rows;
              }, []).map((row, rowIndex) => {
                return (
                  <div key={rowIndex} className="row">
                    {row.map(amenity => (
                      <div key={amenity?.fieldName} className={`col-${size}-4`}>
                        <div className="text-start">
                          <input
                            className=""
                            type="checkbox"
                            id={amenity?.fieldName}
                            name={amenity?.fieldName}
                            // onChange={(event) =>
                            //   setValue(amenity?.fieldName, event.target.value)
                            // }
                            {...register(amenity?.fieldName)}
                            onChange={(event) => {
                              console.log('checked', event);
                              handleCheckboxChange(amenity?.fieldName, event?.target?.checked)
                            }}
                          />
                          <label className="" htmlFor={amenity?.fieldName}>
                            &nbsp;{amenity?.name}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>

          </div>
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-8">
          <button
            onClick={() => {
              console.log(values);
              setShowAllErrors(true);
            }}
            className="btn-lg btn-block"
            style={{ backgroundColor: "#1F4B43", color: "white", borderRadius: "6px" }}
          >
            Choose and Next
          </button>
        </div>
      </div>
    </form>


  );
};

FormRenderDynamic.propTypes = {
  setStep: PropTypes.func,
};
