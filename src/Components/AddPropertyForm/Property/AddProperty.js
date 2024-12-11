import ProgressBar from "../../progressBar/progressBar"
import { FirstForm } from "../PropertyForms/FirstForm"

export const AddProperty = ({propertyDetails=null,isEdit=false}) => {
    return(
        <>
            <h1 style={{marginTop:'80px'}}>Add Property</h1>
            <p>Fill the form below to list a property , Remember each listing requires 50 tokens.</p>
            <ProgressBar propertyDetails={propertyDetails} isEdit={isEdit}/>
        </>
    )
}