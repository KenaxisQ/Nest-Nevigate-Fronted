import React, {useState} from 'react'
import './progressBar.css'
import { FirstForm } from '../AddPropertyForm/PropertyForms/FirstForm';
import { SecondForm } from '../AddPropertyForm/PropertyForms/SecondForm';
import { ThirdForm } from '../AddPropertyForm/PropertyForms/ThirdForm';
export default function ProgressBar() {
  const [step, setStep] = useState(0);
  const [propertyType, setPropertyType] = useState("Residential");
  const [offerType, setOfferType] = useState("Sell");

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
      {step === 1 && <SecondForm setStep={setStep} propertytype={propertyType} offerType ={offerType}/>}
      {step === 2 && <ThirdForm setStep={setStep}/>}
      {/* {step === 3 && <FourthForm setStep={setStep} />} */}
    </div>
    )
}
