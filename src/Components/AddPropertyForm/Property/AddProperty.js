import ProgressBar from "../../progressBar/progressBar"
import { FirstForm } from "../PropertyForms/FirstForm"

export const AddProperty = () => {
    return(
        <>
            <h1>Add Property</h1>
            <p>Fill the form below to list a property , Remember each listing requires 50 tokens.</p>
            <ProgressBar />
            <FirstForm />
        </>
    )
}