import PropTypes from "prop-types"
import { useState, useRef } from "react";
import './ThirdForm.css'
import {PropertyUploadForm} from "../PropertyForms/PropertyUploadForm";
export const ThirdForm = ({ setStep }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [preview, setPreview] = useState("https://via.placeholder.com/150");
    const inputRef = useRef(null);

    const handleChange = (event) => {
        console.log(event.target.files);
        inputRef.current.click();
        const files = Array.from(event.target.files).slice(0, 8);
        const filePreviews = files.map(file => URL.createObjectURL(file));
        setSelectedFiles(files);
        setPreview(filePreviews[0]);
    }

    const handleUploadClick = () => {
        inputRef.current.click();

      };

    const handleImageClick = (image) => {
        setPreview(image);
    };
    return (
        <>
            <div>
                <form>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="md-3 asking-Price">
                                    <label htmlFor="askingPrice" className="form-label" style={{ textAlign: "left" }}>Enter Asking Price</label>
                                    <input class="form-control" id="askingPrice" placeholder="Asking Price" type="text" />
                                    <div className="form-text" style={{ textAlign: "left" }}>
                                        This Price is what is potentially told to Clients
                                    </div>
                                </div>
                                <div className="md-3 thumbnail-image">
                                    <label className="form-label" style={{ textAlign: "left" }}>Upload thumbnail Image</label>
                                    <img alt="thumbnail" src={preview}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Upload Additional Images</label>
                                <div className="upload-section col-md-12">
                                    {selectedFiles.map((file, index) => (
                                        <div className="col-3" key={index}>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`preview-${index}`}
                                                className="img-thumbnail"
                                                onClick={() => handleImageClick(URL.createObjectURL(file))}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    ))}
                                    <div className="upload-placeholder">
                                        <input className="fa fa-image" type="file" multiple accept="image/*" onChange={handleChange}
                                        style={{ top: 0 }} ref={inputRef}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button className="btnUpload PropertyNextButton" type="button" onClick={handleUploadClick}>Upload Property</button>

                    </div>
                </form>
            </div>
        </>
    )
}
ThirdForm.propTypes = {
    setStep: PropTypes.func.isRequired
}