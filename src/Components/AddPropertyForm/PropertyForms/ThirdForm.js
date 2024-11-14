import PropTypes from "prop-types"
import { useState } from "react";
import './ThirdForm.css'
export const ThirdForm = ({setStep}) => {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <>
            <div>
                <form>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="md-3 asking-Price">
                                    <label htmlFor="askingPrice" className="form-label" style={{textAlign:"left"}}>Enter Asking Price</label>
                                    <input class="form-control" id="askingPrice" placeholder="Asking Price" type="text" />
                                    <div className="form-text" style={{textAlign:"left"}}>
                                        This Price is what is potentially told to Clients
                                    </div>
                                </div>
                                <div className="md-3 thumbnail-image">
                                    <label className="form-label" style={{textAlign:"left"}}>Upload thumbnail Image</label>
                                    <img alt="thumbnail" src="https://via.placeholder.com/150"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Upload Additional Images</label>
                                <div className="upload-section">
                                    <img alt="additional" src="https://via.placeholder.com/150" height="150" width="200"/>
                                    <img alt="additional" src="https://via.placeholder.com/150" height="150" width="200"/>
                                    <img alt="additional" src="https://via.placeholder.com/150" height="150" width="200"/>
                                    <img alt="additional" src="https://via.placeholder.com/150" height="150" width="200"/>
                                    <img alt="additional" src="https://via.placeholder.com/150" height="150" width="200"/>
                                    <img alt="additional" src="https://via.placeholder.com/150" height="150" width="200"/>
                                    <img alt="additional" src="https://via.placeholder.com/150" height="150" width="200"/>
                                    <img alt="additional" src="https://via.placeholder.com/150" height="150" width="200"/>
                                    <div className="upload-placeholder">
                                        <i className="fa fa-image"></i>
                                    </div>
                                </div>

                            </div>                       
                        </div>
                        <button className="btnUpload PropertyNextButton" type="button">Upload Property</button>
                        <div>
                        <h2>Add Image:</h2>
                        <input type="file" onChange={handleChange} />
                        <img src={file} />
                    </div>
                    </div>
                </form>
            </div>
        </>
    )
}
ThirdForm.propTypes = {
    setStep: PropTypes.func.isRequired
}