import React, {useState} from 'react'
import './progressBar.css'
import { FirstForm } from '../AddPropertyForm/PropertyForms/FirstForm';
import { SecondForm } from '../AddPropertyForm/PropertyForms/SecondForm';
import { ThirdForm } from '../AddPropertyForm/PropertyForms/ThirdForm';
import { FourthForm } from '../AddPropertyForm/PropertyForms/FourthForm';
export default function ProgressBar() {
  const [step, setStep] = useState(0);
  return (   
     <div className="p-5">
      <div className="progressBarWrapper">
      <ul className="progressbar">
        <li className="active" onClick={()=>setStep(0)}></li>
        <li className={step===1|step===2 |step ===3 | step===4 ?"active":""} onClick={()=>setStep(1)}></li>
        <li className={step===2|step===3 | step === 4? "active":""} onClick={()=>setStep(2)}></li>
        {/* <li className={step===3|step===4?"active":""} onClick={()=>setStep(3)}></li>
        <li className={step===4 ? "active":""} onClick={()=>setStep(4)}></li> */}
      </ul>
      </div>
      {step === 0 && <FirstForm setStep={setStep}/>}
      {step === 1 && <SecondForm setStep={setStep}/>}
      {step === 2 && <ThirdForm setStep={setStep}/>}
      {step === 3 && <FourthForm setStep={setStep} />}
      {/* {step === 3 && <ThirdForm setStep={setStep}/>}
      {step === 4 && <ThirdForm setStep={setStep}/>} */}
    </div>
    )
}
