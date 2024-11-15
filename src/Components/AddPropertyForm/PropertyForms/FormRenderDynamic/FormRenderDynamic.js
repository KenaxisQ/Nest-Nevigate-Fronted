import "./FormRenderDynamic.css";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object as yupObject, string as yupString } from "yup";
import { useEffect } from "react";
import PropTypes from "prop-types";
const validationSchema = yupObject().shape({
  propertyTitle: yupString().required("Required"),
  bedroom: yupString().required("Required"),
});
export const FormRenderDynamic = ({ setStep }) => {
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
    <FormProvider>
      <form onSubmit={onSubmit} novalidate className="container">
        <div className="renderMainWrapper row">
          <div className="renderWrapper col-lg-4">
            <div className="row">
              {json.map((prop, index) => {
                if (prop.componetName === "Dropdown") {
                  return (
                    <div
                      className="col-lg-6"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <label for={prop.title} style={{ fontWeight: 500 }}>
                        {prop.title}
                      </label>
                      <select
                        placeholder={prop.placeHolder}
                        id={prop.title}
                        className="renderDynamicComponents"
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
                      className=" col-lg-6"
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
                        className="renderDynamicComponents"
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
          <div className="renderWrapper col-lg-4">
            <div className="container">
              <div className="row">
                <label for={"description"} className="col-lg-12">
                  Enter Property Description
                </label>
                <textarea
                  className="postContent col-lg-12"
                  id={"description"}
                  placeholder={"Enter Description"}
                  rows={6}
                  cols={40}
                  onChange={(event) =>
                    setValue("descriptionBox", event.target.value)
                  }
                />
              </div>
              <h6>Miscelleneous</h6>
              <div>
                {miscelleneousJson.map((prop, index) => {
                  return (
                    <div className="container" key={index}>
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id={prop?.fieldName}
                              {...register(prop.fieldName)}
                              onChange={(event) => {
                                setValue(prop.fieldName, event.target.checked);
                              }}
                            />
                        <label for={prop?.fieldName}>{prop?.name}</label>
                        </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="renderWrapper  col-lg-4">
            <h6>Amminities</h6>
            {amminitiesJson.map((prop, index) => {
              return (
                <div className="container" key={index}>
                  <div className="row">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id={prop?.fieldName}
                          {...register(prop.fieldName)}
                          onChange={(event) => {
                            setValue(prop.fieldName, event.target.checked);
                          }}
                        />
                        &nbsp;
                        <label for={prop?.fieldName}>{prop?.name}</label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <h6>Near By Facilities</h6>
            {nearByFacilitiesJson.map((prop, index) => {
              return (
                <div className="container" key={index}>
                  <div className="row">
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id={prop?.fieldName}
                          {...register(prop.fieldName)}
                          onChange={(event) => {
                            setValue(prop.fieldName, event.target.checked);
                          }}
                        />
                        <label for={prop?.fieldName}>{prop?.name}</label>
                        </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              onClick={() => {
                setStep(2);
              }}
              className="PropertyNextButton"
            >
              Choose and Next
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

FormRenderDynamic.propTypes = {
  setStep: PropTypes.func,
};
