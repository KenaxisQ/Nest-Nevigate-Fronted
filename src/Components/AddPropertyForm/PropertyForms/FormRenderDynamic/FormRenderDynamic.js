import "./FormRenderDynamic.css";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object as yupObject, string as yupString } from "yup";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from 'react-responsive';
const validationSchema = yupObject().shape({
  // propertyTitle: yupString().required("Required"),
  // bedroom: yupString().required("Required"),
});
export const FormRenderDynamic = ({ setStep }) => {
  // Media query hooks
  const isSmall = useMediaQuery({ query: '(min-width: 576px)' });
  const isMedium = useMediaQuery({ query: '(min-width: 768px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 992px)' });
  const size = isLarge ? 'lg' : isMedium ? 'md' : isSmall ? 'sm' : '';
  console.log(size);
  const json = [
    {
      title: "Enter property title",
      placeHolder: "Enter property title",
      componetName: "Input",
      fieldName: "propertyTitle",
      required: true,
    },
    {
      title: "Select Bedroom",
      placeHolder: "Enter property Loc",
      componetName: "Dropdown",
      fieldName: "bedroom",
    },
    {
      title: "Enter property Loc",
      placeHolder: "Enter property Loc",
      componetName: "Input",
      required: true,
      fieldName: "propertyLoc",
    },
    {
      title: "Select Bathroom",
      placeHolder: "Enter property Loc",
      componetName: "Dropdown",
      fieldName: "bathroom",
    },
    {
      title: "Enter property Age",
      placeHolder: "Enter property Age",
      componetName: "Input",
      fieldName: "propertyAge",
    },
    {
      title: "Select Balcony",
      placeHolder: "Select Balcony",
      componetName: "Dropdown",
      required: true,
      fieldName: "balcony",
    },
    {
      title: "Select property Type",
      placeHolder: "Select property Type",
      componetName: "Dropdown",
      fieldName: "propertyType",
    },
    {
      title: "Enter Surface Area",
      placeHolder: "Enter Surface Area",
      componetName: "Input",
      fieldName: "surfaceArea",
    },
    {
      title: "Select Furnish Status",
      placeHolder: "Select Furnish Status",
      componetName: "Dropdown",
      fieldName: "furnishStatus",
    },
    {
      title: "Enter Carpet Area",
      placeHolder: "Enter Carpet Area",
      componetName: "Input",
      fieldName: "carpetArea",
    },
    {
      title: "Select Completion Status",
      placeHolder: "Select Completion Status",
      componetName: "Dropdown",
      fieldName: "completionStatus",
    },
    {
      title: "Encumberence Status",
      placeHolder: "Encumberence Status",
      componetName: "Dropdown",
      fieldName: "encumberenceStatus",
    },
  ];

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
  const { control, formState, setValue, trigger, register } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {},
    resolver: yupResolver(validationSchema),
    shouldUnregister: false,
  });
  const values = useWatch({ control });
  const formContext = {
    control,
    formState,
  };
  const { errors } = formContext?.formState;
  console.log("erros", errors);
  console.log("values", values);
  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log("onSubmit", values);
  };
  useEffect(() => {
    trigger();
  }, []);

  return (
      <form onSubmit={onSubmit} novalidate className="mb-3 wrapText">
        <div className="row">
          <div className="col-lg-4">
            <div className="row">
              {json.map((prop, index) => {
                if (prop.componetName === "Dropdown") {
                  return (
                    <div
                      className="form-group col-sm-6"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label for={prop.title} style={{ fontWeight: 500}}>
                        {prop.title}
                      </label>
                      <select
                        placeholder={prop.placeHolder}
                        id={prop.title}
                        className="form-control-sm"
                        {...register(prop?.fieldName)}
                        onChange={(event) => {
                          console.log(event);
                          setValue(prop?.fieldName, event?.target?.value);
                        }}
                      >
                        <option value=" " selected>
                          Select
                        </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                      </select>
                    </div>
                  );
                } else if (prop.componetName === "Input") {
                  return (
                    <div
                      className="form-group col-sm-6"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label for={prop.title} style={{ fontWeight: 500 }}>
                        {prop.title}
                      </label>
                      <input
                        placeholder={prop.placeHolder}
                        id={prop.title}
                        className="form-control-sm"
                        style={{ color: "black" }}
                        onChange={(event) =>
                          setValue(prop?.fieldName, event.target.value)
                        }
                        {...register(prop?.fieldName)}
                      />
                      {errors?.[prop.fieldName]?.message && (
                        <p
                          className="error"
                          style={{
                            color: "White",
                            background: "red",
                            alignItems: "center",
                          }}
                        >
                          {errors?.[prop.fieldName]?.message}
                        </p>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="col-lg-8">
          <div className="row">
                    <div className={`col-${size}-4`}>
                        <p for="exampleFormControlTextarea1" class="text-start">Enter Property Description</p>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Enter Description" {...register('propertyDescription')}
                        onChange={(event) => {
                          console.log(event);
                          setValue('propertyDescription', event?.target?.value);
                        }}></textarea>
                    </div>
                    <div className={`col-${size}-8`}>
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
                                        <div key={amenity.fieldName} className={`col-${size}-4`}>
                                            <div className="text-start">
                                                <input
                                                    className=""
                                                    type="checkbox"
                                                    id={amenity.fieldName}
                                                    name={amenity.fieldName}
                                                    onChange={(event) =>
                                                      setValue(amenity?.fieldName, event.target.value)
                                                    }
                                                    {...register(amenity?.fieldName)}
                                                />
                                                <label className="" htmlFor={amenity.fieldName}>
                                              &nbsp;{amenity.name}
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
              <div className={`col-${size}-4`}>
              <p for="exampleFormControlTextarea1" class="text-start">Miscelleneous</p>
                  {miscelleneousJson.map((amenity, rowIndex) => {
                      return (
                                  <div key={amenity.fieldName} className={`col-${size}-12`}>
                                      <div className="text-start">
                                          <input
                                              className=""
                                              type="checkbox"
                                              id={amenity.fieldName}
                                              name={amenity.fieldName}
                                              onChange={(event) =>
                                                setValue(amenity?.fieldName, event.target.value)
                                              }
                                              {...register(amenity?.fieldName)}
                                          />
                                          <label className="" htmlFor={amenity.fieldName}>
                                              &nbsp;{amenity.name}
                                          </label>
                                      </div>
                              
                          </div>
                      )
                  })}  
              </div>
              <div className={`col-${size}-8`}>
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
                                  <div key={amenity.fieldName} className={`col-${size}-4`}>
                                      <div className="text-start">
                                          <input
                                              className=""
                                              type="checkbox"
                                              id={amenity.fieldName}
                                              name={amenity.fieldName}
                                              onChange={(event) =>
                                                setValue(amenity?.fieldName, event.target.value)
                                              }
                                              {...register(amenity?.fieldName)}
                                          />
                                          <label className="" htmlFor={amenity.fieldName}>
                                              &nbsp;{amenity.name}
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
                setStep(2);
              }}
              className="btn-lg btn-block"
              style={{backgroundColor:"#1F4B43", color: "white", borderRadius: "6px"}}
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
