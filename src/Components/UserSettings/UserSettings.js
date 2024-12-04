export const UserSettings = () =>{
    return(
        <>  
          <div class="container bg-white p-5 rounded shadow-sm">
        <h1 class="h4 mb-3">Edit Personal Information</h1>
        <p class="text-muted mb-4">Sed tortor, sed velit ridiculus ipsum pharetra lacus odio gravida augue enim.</p>
        
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">Enter Name</label>
                <input type="text" class="form-control" id="name" placeholder="Placeholder content" />
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                    <label for="mobile" class="form-label">Mobile Number</label>
                    <input type="text" class="form-control" id="mobile" placeholder="Placeholder content" />
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label">Email ID</label>
                    <input type="email" class="form-control" id="email" placeholder="Placeholder content" />
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                    <label for="gender" class="form-label">Choose Gender</label>
                    <select class="form-select" id="gender">
                        <option>Chose</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="upload" class="form-label">Upload Image</label>
                    <div class="input-group">
                        <input type="text" class="form-control" id="upload" placeholder="IMG 34055" />
                        <button class="btn btn-outline-secondary" type="button">
                            <i class="fas fa-upload"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="bio" class="form-label">A Short Bio</label>
                <textarea class="form-control" id="bio" rows="4" placeholder="Placeholder content"></textarea>
            </div>
        </form>
    </div>


        </>
    )
}