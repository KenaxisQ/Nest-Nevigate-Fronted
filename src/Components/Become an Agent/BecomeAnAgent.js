import React from 'react'
import "./BecomeAnAgent.css"
import { IoIosArrowRoundForward } from "react-icons/io";
export default function BecomeAnAgent() {
  return (
    <div className='becomeAgent'>
          <div className='content' style={{color:'white'}}>
          <h2>Become a Real Estate Agent</h2>
          <p>We only work with the best companies around the globe</p>
          </div>
          <div className='btnWrapper'>
          <button className='btn NN_btn1' style={{color:'white',width:'250px', borderRadius:'10px', lineHeight:'30px'}} > Sign in or create an account<IoIosArrowRoundForward size={'30px'}/></button>
          </div>
      </div>
  )
}
