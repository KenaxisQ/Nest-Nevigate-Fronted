import PropTypes from "prop-types"
import { useState, useRef } from "react";
import './ThirdForm.css'
import { PropertyUploadForm } from "../PropertyForms/PropertyUploadForm";
export const ThirdForm = ({ setStep }) => {
    const defaultPlaceholderImages = Array(8).fill('https://via.placeholder.com/150'); // Placeholder image URL
    const [selectedFiles, setSelectedFiles] = useState(defaultPlaceholderImages);
    const [preview, setPreview] = useState("https://via.placeholder.com/150");
    const inputRef = useRef(null);

    const handleChange = (event) => {
        console.log(event.target.files);
        // inputRef.current.click();
        const remainingSlots = 8 - event.target.files.length; // Calculate remaining slots to fill
        const files = Array.from(event.target.files).slice(0, 8);
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setSelectedFiles([...Array.from(files), ...Array(remainingSlots).fill('https://via.placeholder.com/150')]); //cahnge here for fixed 8 when uploadeed
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
                <div className="col-lg-6">
                    <div className="md-3 asking-Price">
                        <label htmlFor="askingPrice" className="form-label" style={{ textAlign: "left" }}>Enter Asking Price</label>
                        <input class="form-control" id="askingPrice" placeholder="Asking Price" type="text" />
                        <label className="form-text" style={{ textAlign: "left" }}>
                            This Price is what is potentially told to Clients
                        </label>
                    </div>
                    <div className="md-3 thumbnailimage">
                        <label className="form-label" style={{ textAlign: "left" }}>Upload thumbnail Image</label>
                        <img alt="thumbnail" src={preview} class=""/>
                    </div>
                </div>
                <div className="col-lg-6">
                <div className="md-3 container">
                    <label className="form-label" style={{ textAlign: "left" }}>Upload Additional Images</label>
                    <div className="row g-3">
                        {selectedFiles.map((file, index) => (
                            <div className="col-lg-4" key={index}>
                                <img
                                    src={file instanceof File ? URL.createObjectURL(file) : file}
                                    alt={`preview-${index}`}
                                    className="img-thumbnail"
                                    onClick={() => handleImageClick(URL.createObjectURL(file))}
                                    style={{ cursor: 'pointer',maxWidth: '150px', maxHeight: '150px' }}

                                />
                                
                            </div>
                        ))}
                        {/* Square file upload button */}
                        <div className="col-lg-3">
                        <div className="">
                            <input
                            className="file-input"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleChange}
                            id="file-upload"
                            style={{ cursor: 'pointer',maxWidth: '150px', maxHeight: '150px' }}
                            />
                            <label htmlFor="file-upload" className="square-button">
                            <span className="upload-icon">+</span>
                            </label>
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
            <button className="btnUpload PropertyNextButton" type="button" onClick={handleUploadClick}>Upload Property</button>

        </form>
    )
}
ThirdForm.propTypes = {
    setStep: PropTypes.func.isRequired
}