import { useForm, FormProvider, useWatch } from "react-hook-form";
import { FormRenderDynamic } from "./FormRenderDynamic/FormRenderDynamic";

export const SecondForm = () => {
   

    return (
        <>
        <FormProvider>
            <FormRenderDynamic />
        </FormProvider>
            <h1>Second form</h1>
        </>
    )
}