import { useForm, FormProvider, useWatch } from "react-hook-form";
import { FormRenderDynamic } from "./FormRenderDynamic/FormRenderDynamic";
import PropTypes from "prop-types";
export const SecondForm = ({setStep}) => {
   
    return (
        <>
        <FormProvider>
            <FormRenderDynamic setStep={setStep}/>
        </FormProvider>
        </>
    )
}

SecondForm.propTypes = {
    setStep: PropTypes.func.isRequired
}