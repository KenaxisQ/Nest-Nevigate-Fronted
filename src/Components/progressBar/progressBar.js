import React, {useState} from 'react'
import './progressBar.css'
import { FirstForm } from '../AddPropertyForm/PropertyForms/FirstForm';
import { SecondForm } from '../AddPropertyForm/PropertyForms/SecondForm';
import { ThirdForm } from '../AddPropertyForm/PropertyForms/ThirdForm';
import { FourthForm } from '../AddPropertyForm/PropertyForms/FourthForm';
export default function ProgressBar() {
  const [step, setStep] = useState(0);

  return (
     <div className="">
      <div className="progressBarWrapper">
      <ul className="progressbar">
        <li className="active" onClick={()=>setStep(0)}></li>
        <li className={step>0?"active":""} onClick={()=>setStep(1)}></li>
        <li className={step>1? "active":""} onClick={()=>setStep(2)}></li>
      </ul>
      </div>
      {step === 0 && <FirstForm setStep={setStep}/>}
      {step === 1 && <SecondForm setStep={setStep}/>}
      {step === 2 && <ThirdForm setStep={setStep}/>}
      {/* {step === 3 && <FourthForm setStep={setStep} />} */}
    </div>
    )
}
