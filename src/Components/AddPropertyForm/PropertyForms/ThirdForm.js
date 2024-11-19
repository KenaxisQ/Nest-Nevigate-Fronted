import PropTypes from "prop-types"
import { useState, useRef } from "react";
import './ThirdForm.css'
import { PropertyUploadForm } from "../PropertyForms/PropertyUploadForm";
export const ThirdForm = ({ setStep }) => {
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
        setPreview(filePreviews[0]);
    }

    const handleUploadClick = () => {
        // inputRef.current.click();
        setStep(3);
    };

    const handleImageClick = (image) => {
        setPreview(image);
    };
    return (
        <form className="container">
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-5 pb-4 pl-4">
                    <div className="">
                        <p htmlFor="askingPrice" className="text-start fw-bold">Enter Asking Price</p>
                        <input className="form-control-md" placeholder="Asking Price" type="text" style={{ color: "black", border: "1px solid #0000004f",borderRadius: "6px" }} />
                        <p className="form-text text-start">
                            This Price is what is potentially told to Clients
                        </p>
                    </div>
                    <div className="">
                        <p className="text-start fw-bold">Upload thumbnail Image</p>
                        <img alt="img-thumbnail" src={preview} style={{ cursor: 'pointer',width: '100%', height: '300px', objectFit: 'cover' }}/>
                    </div>
                </div>
                <div className="col-md-5 pb-4 pl-4">
                    <p className="text-start fw-bold">Upload Additional Images</p>
                    <div className="row g-3">
                    {selectedFiles.map((file, index) => (
                        <div className="col-md-4" key={index}>
                            <img
                            src={file instanceof File ? URL.createObjectURL(file) : file}
                            alt={`preview-${index}`}
                            className="img-thumbnail"
                            onClick={() => handleImageClick(URL.createObjectURL(file))}
                            style={{
                                cursor: 'pointer',
                                width: '100px', // Make the image fill the parent div width
                                height: '100px', // Make the image fill the parent div height
                                objectFit: 'cover' // Ensure the image covers the div area
                            }}
                            />
                        </div>
                        ))}
                        {/* Square file upload button */}
                        <div className="col-md-3">
                            <input
                            className="file-input"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleChange}
                            id="file-upload"
                            style={{ cursor: 'pointer',width: '100px', height: '100px' }}
                            />
                            <label htmlFor="file-upload" className="square-button">
                            <span className="upload-icon">+</span>
                            </label>
                        </div>
                        </div>
                </div>
                <div className="col-md-1"></div>
            </div>
            <button className="btnUpload PropertyNextButton" type="button" onClick={handleUploadClick}>Upload Property</button>

        </form>
    )
}
ThirdForm.propTypes = {
    setStep: PropTypes.func.isRequired
}