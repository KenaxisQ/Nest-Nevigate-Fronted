import { useForm, FormProvider, useWatch } from "react-hook-form";
export const FirstForm = () => {
    return (
        <FormProvider>
                <input type="text" name="name" />
                <input type="text" name="age" />
        </FormProvider>
    );
}