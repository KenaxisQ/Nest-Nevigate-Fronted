import React, {useState, useEffect} from 'react'
import './progressBar.css'
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object as yupObject, string as yupString } from "yup";
import { FirstForm } from '../AddPropertyForm/PropertyForms/FirstForm';
import { SecondForm } from '../AddPropertyForm/PropertyForms/SecondForm';
import { ThirdForm } from '../AddPropertyForm/PropertyForms/ThirdForm';
import HttpService from '../../Services/http';
import { useAuth } from '../SignIn/AuthContext';
const validationSchema = yupObject().shape({
  // propertyTitle: yupString().required("Required"),
  // bedroom: yupString().required("Required"),
});

export default function ProgressBar() {
  const [step, setStep] = useState(0);
  const [propertyType, setPropertyType] = useState("Residential");
  const [offerType, setOfferType] = useState("Sell");
  
  const { control, formState, setValue, trigger, register } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {},
    shouldUnregister: false,
  });
  const {userData} = useAuth();
  const values = useWatch({ control });
  const formContext = {
    control,
    formState,
  };
  const { errors } = formContext?.formState;
  useEffect(() => {
    trigger();
  }, []);
  console.log("values", values);
  function parseBool(value) {
    if (value === "True" || value === true) {
      return true;
    } else if (value === "False" || value === false) {
      return false;
    }
    return value; // return the original value if it's not a boolean-like string
  }
  const onSubmit = async () => {
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
    if(values?.propertyCategory === 'LAND'){
      values['furnitureStatus'] = 'NOT_SPECIFIED'
    }
    if(values?.propertyCategory === 'PG'){
      values['facing'] = 'NOT_SPECIFIED'
    }
    console.log("onSubmit", values);
    var https = new HttpService();
    var {selectedAmenities, ...without} = values;
    const propertyPosted = await https.post(`property/create?userId=${userData?.id}`, {...without});
  };
  return (
     <div className="">
      <div className="progressBarWrapper">
      <ul className="progressbar">
        <li className="active" onClick={()=>setStep(0)}></li>
        <li className={step>0?"active":""} onClick={()=>setStep(1)}></li>
        <li className={step>1? "active":""} onClick={()=>setStep(2)}></li>
      </ul>
      </div>
      {step === 0 && <FirstForm setStep={setStep} setOfferType={setOfferType} setPropertyType = {setPropertyType}
       propertyType={propertyType} offerType ={offerType}/>}
      {step === 1 && 
      <SecondForm 
        setStep={setStep} 
        propertytype={propertyType} 
        offerType={offerType}
        register={register}
        setValue={setValue}
        values={values}
        errors={errors}
        />}
      {step === 2 && <ThirdForm setStep={setStep} register={register} setValue={setValue} onSubmit={onSubmit}/>}
      {/* {step === 3 && <FourthForm setStep={setStep} />} */}
    </div>
    )
}
