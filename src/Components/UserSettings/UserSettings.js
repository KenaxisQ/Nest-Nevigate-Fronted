import './UserSettings.css';
export const UserSettings = () =>{
    return(
        <>  
          <div class="container bg-white p-5 rounded shadow-sm">
        <h1 class="h4 mb-3">Edit Personal Information</h1>
        <p class="text-muted mb-4">Sed tortor, sed velit ridiculus ipsum pharetra lacus odio gravida augue enim.</p>
        
        <form>
            <div class="row mb-3">
            <div class="col-md-6">
                <label for="name" class="form-label">First Name</label>
                <input type="text" class="form-control userUpdateFieldBoxes" id="name" placeholder="Placeholder content" />
                </div>
                <div class="col-md-6">
                <label for="name" class="form-label">Last Name</label>
                <input type="text" class="form-control userUpdateFieldBoxes" id="name" placeholder="Placeholder content" />
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <label for="mobile" class="form-label">Mobile Number</label>
                    <input type="text" class="form-control userUpdateFieldBoxes" id="mobile" placeholder="Placeholder content" />
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label">Email ID</label>
                    <input type="email" class="form-control userUpdateFieldBoxes" style={{lineHeight: "0px"}}id="email" placeholder="Placeholder content" />
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                    <label for="gender" class="form-label">Choose Gender</label>
                    <select class="form-select userUpdateImageBox" id="gender">
                        <option>Chose</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="upload" class="form-label">Upload Image</label>
                    <div class="input-group">
                        <input type="file" class="form-control userUpdateImageBox" id="upload" placeholder="Upload Profile Pic" />
                        {/* <button class="btn btn-outline-secondary" type="file">
                            <i class="fas fa-upload"></i>
                        </button> */}
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="bio" class="form-label text-start">A Short Bio</label>
                <textarea class="form-control" id="bio" rows="4" placeholder="Placeholder content"></textarea>
            </div>
            <button type="submit">Choose and Next</button>
            <button type="button">Change Password</button>
        </form>
    </div>
        </>
    )
}