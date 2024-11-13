import React, {useState} from 'react'
import './progressBar.css'
import { FirstForm } from '../AddPropertyForm/PropertyForms/FirstForm';
import { SecondForm } from '../AddPropertyForm/PropertyForms/SecondForm';
export default function ProgressBar() {
  const [step, setStep] = useState(0);
  return (   
     <div className="container">
      <div className="progressBarWrapper">
      <ul className="progressbar">
        <li className="active"></li>
        <li className={step===1|step===2?"active":""}></li>
        <li className={step===3?"active":""}></li>
      </ul>
      </div>
      {step == 0 && <FirstForm setStep={setStep}/>}
      {step == 1 && <SecondForm />}
    </div>
    )
}
