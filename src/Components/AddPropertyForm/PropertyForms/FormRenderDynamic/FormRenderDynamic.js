import './FormRenderDynamic.css'
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {object as yupObject, string as yupString} from 'yup';
import { useEffect } from 'react';
const validationSchema = yupObject().shape({
    propertyTitle: yupString().required('Required')
})
export const FormRenderDynamic = () => {
    const json = [
        {
            title: 'Enter property title',
            placeHolder: 'Enter property title',
            componetName: 'Input',
            fieldName: 'propertyTitle',
            required: true
        },
        {
            title: 'Select Bedroom',
            placeHolder: 'Enter property Loc',
            componetName: 'Dropdown',
            fieldName: 'bedroom',
        },
        {
            title: 'Enter property Loc',
            placeHolder: 'Enter property Loc',
            componetName: 'Input',
            required: true,
            fieldName: 'propertyLoc'
        },
        {
            title: 'Select Bathroom',
            placeHolder: 'Enter property Loc',
            componetName: 'Dropdown',
            fieldName: 'bathroom'
        },
        {
            title: 'Enter property Age',
            placeHolder: 'Enter property Age',
            componetName: 'Input',
            fieldName: 'propertyAge'
        },
        {
            title: 'Select Balcony',
            placeHolder: 'Select Balcony',
            componetName: 'Dropdown',
            required: true,
            fieldName: 'balcony'
        },
        {
            title: 'Select property Type',
            placeHolder: 'Select property Type',
            componetName: 'Dropdown',
            fieldName: 'propertyType'
        },
        {
            title: 'Enter Surface Area',
            placeHolder: 'Enter Surface Area',
            componetName: 'Input',
            fieldName: 'surfaceArea'
        },
        {
            title: 'Select Furnish Status',
            placeHolder: 'Select Furnish Status',
            componetName: 'Dropdown',
            fieldName: 'furnishStatus'
        },
        {
            title: 'Enter Carpet Area',
            placeHolder: 'Enter Carpet Area',
            componetName: 'Input',
            fieldName: 'carpetArea'
        },
        {
            title: 'Select Completion Status',
            placeHolder: 'Select Completion Status',
            componetName: 'Dropdown',
            fieldName: 'completionStatus'
        },
        {
            title: 'Encumberence Status',
            placeHolder: 'Encumberence Status',
            componetName: 'Dropdown',
            fieldName: 'encumberenceStatus'
        }
    ];
    
    const { control, formState, setValue, trigger } = useForm({ 
        mode: 'onChange', 
        reValidateMode: 'onChange', 
        defaultValues: {},
        resolver: yupResolver(validationSchema),
         shouldUnregister: false 
    });
    const values = useWatch({ control });
    const formContext = {
        control,
        formState
    }
    const {errors} = formContext?.formState;
    console.log('erros', errors);
    console.log('values', values);
    const onSubmit = (evt) =>{
        evt.preventDefault();
        console.log('onSubmit', values);
    }
    useEffect(() => {
        trigger();
    }, []);
    return (
        <FormProvider>
        <form onSubmit={onSubmit} class="needs-validation" novalidate>
            <div className='renderMainWrapper row'>
                <div className="renderWrapper col-lg-4">
                    <div className='row'>
                        {
                            json.map((prop, index) => {
                                if (prop.componetName === 'Dropdown') {
                                    return (
                                        <div className='col-lg-6' style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }} >
                                            <label for={prop.title} style={{}}>{prop.title}</label>
                                            <select placeholder={prop.placeHolder} 
                                            id = {prop.title} 
                                            className="renderDynamicComponents" 
                                            onChange={event => {console.log(event);  setValue(prop?.fieldName, event?.target?.value)}}
                                            >
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                            </select>
                                        </div>
                                    )
                                }
                                else if (prop.componetName === 'Input') {
                                    return (
                                        <div className=' col-lg-6' style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }} >
                                            <label for={prop.title} style={{}}>{prop.title}</label>
                                            <input
                                             placeholder={prop.placeHolder} 
                                             id = {prop.title} 
                                             className="renderDynamicComponents" 
                                             style={{ color: 'black' }} 
                                             onChange={
                                                event => setValue(prop?.fieldName, event.target.value)
                                            }
                                            />
                                            <p className='error'>{errors?.name?.message}</p>
                                        </div>
                                    )
                                }
                            }
                            )
                        }
                    </div>
                </div>
                <div className="renderWrapper col-lg-4">
                    <div className='row'>
                        <label for={"description"}>Enter Property Description</label>
                        <textarea className="postContent" id={"description"} placeholder={"Enter Description"} rows={6} cols={40} />
                        <h6>Miscelleneous</h6>
                    </div>
                </div>
                <div className="renderWrapper  col-lg-4">
                </div>
            </div>
            <button label="submit" />
        </form>
        </FormProvider>
    )
}
