import './UserSettings.css';
import { useAuth } from '../SignIn/AuthContext';
import { useForm, useWatch, Controller } from "react-hook-form";

export const UserSettings = () =>{
    const {userData} = useAuth();
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
          name: userData?.name || "",
          phone: userData?.phone || "",
          email: userData?.email || "",
          image: null, // Initialize file input
        },
      });
    
      const watchedValues = useWatch({ control });

      // Handle form submission
      const onSubmit = async (data) => {
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("phone", data.phone);
          formData.append("email", data.email);
          if (data.image) {
            formData.append("image", data.image[0]);
          }
    }
        
    return (
        <form className="container bg-white p-5 rounded shadow-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <label htmlFor="name" className="form-label text-start ml-3">First Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <input type="text" className="form-control" {...field} />}
            />
          </div>
    
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="mobile" className="form-label text-start">Mobile Number</label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <input type="text" className="form-control" {...field} />}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email ID</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <input type="text" className="form-control" disabled {...field} />}
              />
            </div>
          </div>
    
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="upload" className="form-label text-start">Upload Image</label>
              <div className="input-group">
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => <input type="file" className="form-control" {...field} />}
                />
              </div>
            </div>
          </div>
    
          <button type="submit" className="btn btn-primary">
            Update Information
          </button>
        </form>
      );
    };