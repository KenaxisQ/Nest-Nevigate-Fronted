import { FormRenderDynamic } from "./FormRenderDynamic/FormRenderDynamic";
import PropTypes from "prop-types";
export const SecondForm = ({setStep, propertytype, offerType, register, setValue, values, errors,touchedFields, trigger, displaJson, showSecondFormErrors}) => {
    
    return (
            <FormRenderDynamic setStep={setStep} displayjson={displaJson} register={register} setValue={setValue} propertytype={propertytype} offerType={offerType} values={values} errors={errors} touchedFields={touchedFields} trigger={trigger}
            showSecondFormErrors={showSecondFormErrors}/>
    )
}

SecondForm.propTypes = {
    setStep: PropTypes.func.isRequired
}