import { useForm, FormProvider, useWatch } from "react-hook-form";
import { FormRenderDynamic } from "./FormRenderDynamic/FormRenderDynamic";
import PropTypes from "prop-types";
export const SecondForm = ({setStep}) => {
   
    return (
            <FormRenderDynamic setStep={setStep}/>
    )
}

SecondForm.propTypes = {
    setStep: PropTypes.func.isRequired
}