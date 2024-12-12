import React, {useState, useEffect, useRef} from 'react'
import './progressBar.css'
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FirstForm } from '../AddPropertyForm/PropertyForms/FirstForm';
import { SecondForm } from '../AddPropertyForm/PropertyForms/SecondForm';
import { ThirdForm } from '../AddPropertyForm/PropertyForms/ThirdForm';
import HttpService from '../../Services/http';
import { useAuth } from '../SignIn/AuthContext';
import { ToastContainer, toast } from "react-toastify";
import {v4 as uuidv4} from 'uuid';
import { DisplayRentCommercialFields, DisplayRentLandFields, DisplayRentResidentialFields, DisplayRentPGFields } from '../AddPropertyForm/PropertyForms/DisplayJsons/Rent/DisplayFields';
import { DisplaySellCommercialFields, DisplaySellLandFields, DisplaySellResidentialFields } from '../AddPropertyForm/PropertyForms/DisplayJsons/Sell/DisplayFields';
import { ConfirmationModal } from '../AddPropertyForm/Property/ConfirmationModal';
import {ApiModel} from '../../Components/AddPropertyForm/PropertyForms/ApiModel.js';
import _ from "lodash";
export default function ProgressBar({propertyDetails, isEdit}) {
  const modal1Ref = useRef(null);
  const openOtpModal = () => {
    const modal = new window.bootstrap.Modal(modal1Ref?.current);
    modal.show();
}
  const [step, setStep] = useState(0);
  const [propertyType, setPropertyType] = useState("Residential");
  const [offerType, setOfferType] = useState("Sell");
  const [showSecondFormErrors, setShowSecondFormErrors] = useState(false);
  // const [errokcrs, setErrors] = useState({});
  const fields = {
    DisplaySellCommercialFields,
    DisplaySellLandFields,
    DisplaySellResidentialFields,
    DisplayRentCommercialFields,
    DisplayRentLandFields,
    DisplayRentPGFields,
    DisplayRentResidentialFields,
  };      
  const displayJson = `Display${offerType}${propertyType}Fields`;
  var displaJson = fields[displayJson];
  const validationSchema = Yup.object().shape({
    ...displaJson.reduce((acc, prop) => {
      if(prop?.componetName === "Input"){
      if (prop?.required) {
        if(prop?.type === "number"){
          acc[prop?.fieldName] = Yup.number()
                                      .test(
                                        "required",
                                        `${prop?.title?.split("Enter")[1]} is required`,
                                        (value) => value !== undefined && value !== null && value !== ""
                                      )
                                      .typeError(`${prop?.title?.split("Enter")[1]} must be a number`)
                                      .min(0, `${prop?.title?.split("Enter")[1]} cannot be negative`)
        }else{
        acc[prop?.fieldName] = Yup.string().required(`${prop?.title?.split("Enter")[1]} is required`);}
      }else {
        acc[prop?.fieldName] = Yup.string();
      }}
      else{
        if (prop?.required) {
          acc[prop?.fieldName] = Yup.string().required(`${prop?.title?.split("Select")[1]} is required`);
        }else {
          acc[prop?.fieldName] = Yup.string();
        }
      }
      return acc;
    }, {}),
    description: Yup.string()
    .required("Description is required")
    .max(5000, "Description must be less than 5000 characters")
});
  console.log('form validations', validationSchema);
  console.log('isEdit', isEdit);
  const { control, formState, setValue, trigger, register, reset } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema), // Use Yup validation schema
    defaultValues: isEdit ? propertyDetails || {} : {id: uuidv4(), propertyListingFor: "Sell", propertyCategory: "Residential", },
    shouldUnregister: false,
  });
  const {userData} = useAuth();
  const values = useWatch({ control });  
  const { errors, touchedFields } = formState;

  const formContext = {
    control,
    formState,
  };
  useEffect(() => {
    debugger;
    trigger();
  }, []);
  console.log("formStatetouchedFields", formState?.touchedFields);
  console.log("formStatedirtyFields", formState?.dirtyFields);

  function parseBool(value) {
    if (value === "True" || value === true) {
      return true;
    } else if (value === "False" || value === false) {
      return false;
    }
    return value; // return the original value if it's not a boolean-like string
  }

  const mapToModel = (data) => {
    return _.pick(data, ApiModel);
  };

  const onSubmit = async () => {
    debugger;
    var parseToIntValues = ["poojaRoom", "noOfRooms", "noOfBalconies","noOfBedrooms","noOfBathrooms","carpetArea","advance", "width", "length", "superBuiltupArea","price"];
    var parseToBoolValues = ["isNegotiable","isFeatured" ];
    var parseToDateValues = ["moveInDate"]
    parseToIntValues.forEach(field => {
      if (values.hasOwnProperty(field)) {
        // Parse the value to integer if it's not empty
        const parsedValue = parseInt(values[field], 10);
        
        // If parsing results in a valid number, update the value
        if (!isNaN(parsedValue)) {
          values[field] = parsedValue;
        }
      }
    });
    parseToBoolValues.forEach(field => {
      if (values.hasOwnProperty(field)) {
        // Parse the value to integer if it's not empty
        const parsedValue = parseBool(values[field]);
        values[field] = parsedValue;

      }
    });
    parseToDateValues.forEach(field => {
      if (values.hasOwnProperty(field) && values[field] != "") {
        // Parse the value to integer if it's not empty
        const formattedDate = new Date(values[field]).toISOString();
        values[field] = formattedDate;
      }
    });
    if(values?.propertyCategory === 'Land'){
      values['furnitureStatus'] = 'NOT_SPECIFIED'
    }
    if(values?.propertyCategory === 'PG'){
      values['facing'] = 'NOT_SPECIFIED'
    }
    const mappedData =  mapToModel(values);
    console.log('mappedData', mappedData);
    // const filteredValues = Object.fromEntries(
    //   Object.entries(values).filter(([key]) => !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(key))
    // );
    var https = new HttpService();
    var {selectedAmenities, ...without} = values;
    console.log('errors', errors)
    if(Object.keys(errors).length === 0){
      const method = isEdit ? 
           https.put(`property/update`, {...mappedData})
         : https.post(`property/create?userId=${userData?.id}`, {...mappedData});
      const propertyPosted = await 
      toast
      .promise(
        method,
        {
          pending: "Posting Property...",
        }
      ).then((response) => {
          if (response.success) {
            toast.success(response.message, {
              position: "top-center",
            });
            if (!isEdit) {
              reset({ id: uuidv4() });
            }
            setStep(0);
          } else {
            toast.error(response.message, {
              position: "top-center",
            });
          }
          console.log(response);
        });
    }
    else{
      setStep(1);
      toast.error('Some Fields need to be filled in second step', {
        position: "top-center",
      });
    }
  };
  
  const askForConfirmation = () => {
    if(step !== 0)
    {
       //openOtpModal();
      setStep(0);
    }
    else{
      setStep(0);
    }
  }

  console.log('formStateErros', formState?.errors);
  return (
     <div className="">
      <div className="progressBarWrapper">
      <ul className="progressbar">
        <li className="active" onClick={askForConfirmation}></li>
        <li className={step>0?"active":""} onClick={()=>setStep(1)}></li>
        <li className={step>1? "active":""} onClick={()=>setStep(2)}></li>
      </ul>
      </div>
      {step === 0 && <FirstForm setStep={setStep} setOfferType={setOfferType} setPropertyType = {setPropertyType}
       propertyType={propertyType} offerType ={offerType} setValue ={setValue} reset={reset} setShowSecondFormErrors={setShowSecondFormErrors}/>}
      {step === 1 && 
      <SecondForm 
        setStep={setStep} 
        propertytype={propertyType} 
        offerType={offerType}
        register={register}
        setValue={setValue}
        values={values}
        errors={errors}
        touchedFields={touchedFields}
        // setErrors={setErrors}
        showSecondFormErrors={showSecondFormErrors}
        reset={reset}
        trigger={trigger}
        displaJson={displaJson}
        />}
      {step === 2 && <ThirdForm setStep={setStep} register={register} setValue={setValue} onSubmit={onSubmit} values={values} setShowSecondFormErrors={setShowSecondFormErrors}/>}
      {/* {step === 3 && <FourthForm setStep={setStep} />} */}
      <ConfirmationModal modal1Ref={modal1Ref} setStep={setStep} reset={reset}/>
      <ToastContainer />
    </div>
    )
}
