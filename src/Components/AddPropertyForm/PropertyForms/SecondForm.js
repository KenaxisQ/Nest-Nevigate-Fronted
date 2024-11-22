import { useForm, FormProvider, useWatch } from "react-hook-form";
import { FormRenderDynamic } from "./FormRenderDynamic/FormRenderDynamic";
import PropTypes from "prop-types";
import { AmminitiesSellCommercialFields, AmminitiesSellLandFields,AmminitiesSellResidentialFields } from "./DisplayJsons/Sell/Ammenities";
import { DisplaySellCommercialFields, DisplaySellLandFields, DisplaySellResidentialFields } from "./DisplayJsons/Sell/DisplayFields";
import { CommonMiscellineousJson } from "./DisplayJsons/Sell/Miscellineous";
import { CommonNearByServices } from "./DisplayJsons/Sell/NearByServices";
export const SecondForm = ({setStep, propertytype, offerType}) => {
    const fields = {
        AmminitiesSellCommercialFields,
        AmminitiesSellLandFields,
        AmminitiesSellResidentialFields,
        DisplaySellCommercialFields,
        DisplaySellLandFields,
        DisplaySellResidentialFields,
    };      
    debugger;
    const amminitiesJson = `Amminities${offerType}${propertytype}Fields`;
const displayJson = `Display${offerType}${propertytype}Fields`;
    var amminitieJson = fields[amminitiesJson];
    var displaJson = fields[displayJson];
    var miscelleneousJson = CommonMiscellineousJson;
    var nearByFacilitiesJson = CommonNearByServices;
    return (
            <FormRenderDynamic setStep={setStep} displayjson={displaJson} miscelleneousJson={miscelleneousJson} amminitiesJson={amminitieJson}
            nearByFacilitiesJson={nearByFacilitiesJson}/>
    )
}

SecondForm.propTypes = {
    setStep: PropTypes.func.isRequired
}