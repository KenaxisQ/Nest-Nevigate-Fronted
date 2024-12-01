import PropTypes from "prop-types"
import { useState, useRef } from "react";
import './ThirdForm.css'
import { PropertyUploadForm } from "../PropertyForms/PropertyUploadForm";
import { FiUpload } from "react-icons/fi";
import { BiSolidImageAdd } from "react-icons/bi";
export const ThirdForm = ({ setStep, setValue, register, onSubmit }) => {
    const defaultPlaceholderImages = []//aceholder image URL
    const [selectedFiles, setSelectedFiles] = useState(defaultPlaceholderImages);
    const [preview, setPreview] = useState("https://via.placeholder.com/150");
    const inputRef = useRef(null);

    const handleChange = (event) => {
        console.log(event.target.files);
        // inputRef.current.click();
        const remainingSlots = 8 - event.target.files.length; // Calculate remaining slots to fill
        const files = Array.from(event.target.files).slice(0, 8);
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setSelectedFiles([...Array.from(files)]); //cahnge here for fixed 8 when uploadeed
        setValue('media', JSON.stringify(filePreviews));
        setPreview(filePreviews[0]);
    }

    const handleUploadClick = () => {
        // inputRef.current.click();
        onSubmit();
        //setStep(3);
    };

    const handleImageClick = (image) => {
        setPreview(image);
    };
    return (
        <form className="container">
            <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-5 pb-4 pl-4">
                    <div className="">
                        <p htmlFor="askingPrice" className="text-start fw-bold">Enter Asking Price</p>
                        <input className="form-control-lg" placeholder="Asking Price" type="number" 
                            style={{ color: "black", border: "1px solid #0000004f",borderRadius: "6px", width: "100%" }} 
                            onChange={(event) =>
                                setValue('price', event.target.value)
                              }
                            {...register('price')}/>
                        <p className="form-text text-start">
                            This Price is what is potentially told to Clients
                        </p>
                    </div>
                    <div className="">
                        <p className="text-start fw-bold">Upload thumbnail Image</p>
                        <img alt="img-thumbnail" src={preview} style={{ cursor: 'pointer',width: '100%', height: '300px', objectFit: 'cover' }}/>
                    </div>
                </div>
                <div className="col-lg-6 pb-4 pl-4">
                    <p className="text-center fw-bold ">Upload Additional Images</p>
                    <div className="image-grid">
                    {selectedFiles.map((file, index) => (
                            <img
                            src={file instanceof File ? URL.createObjectURL(file) : file}
                            alt={`preview-${index}`}
                            className=""
                            onClick={() => handleImageClick(URL.createObjectURL(file))}
                            style={{
                                cursor: 'pointer',
                                width: '100px', // Make the image fill the parent div width
                                height: '100px', // Make the image fill the parent div height
                                objectFit: 'cover' // Ensure the image covers the div area
                            }}
                            />
                        ))}
                        <div class="upload-placeholder">
                            <BiSolidImageAdd size={'30px'}/>
                            <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleChange}
                            id="file-upload"/>
                        </div>
                        </div>
                        <button className="btnUpload PropertyNextButton" type="button" onClick={() => onSubmit()}>Upload Property</button>
                </div>
            </div>

        </form>
    )
}
ThirdForm.propTypes = {
    setStep: PropTypes.func.isRequired
}