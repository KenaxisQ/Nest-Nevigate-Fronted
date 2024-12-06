import React, { useState, useEffect } from 'react';
import './UserInfoEdit.css';
export default function UserInfoEdit({ showModal, setShowModal, userData, handleSave }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    username: '',
    properties_listed: 0,
    properties_listing_limit: 0,
  });

  const [isEditing, setIsEditing] = useState(false);  // State to toggle between view and edit mode

  useEffect(() => {
    // Sync the state when userData changes (e.g., when a user is selected)
    if (userData) {
      setFormData({
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        email: userData.email || '',
        phone: userData.phone || '',
        username: userData.username || '',
        properties_listed: userData.properties_listed || 0,
        properties_listing_limit: userData.properties_listing_limit || 0,
      });
    }
  }, [userData]);

  const handleClose = () => {
    setShowModal(false);  // Close the modal from the parent state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();  // Prevent form submission on Edit button click
    setIsEditing(true);  // Switch to edit mode
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);  // Save the updated form data
    setIsEditing(false);    // Switch to view mode
    setShowModal(false);    // Close modal after saving
  };

  return (
    <div
      className={`userInfoEdit modal fade ${showModal ? 'show' : ''}`}
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden={!showModal}
      style={{ display: showModal ? 'block' : 'none' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {isEditing ? 'Edit User Info' : 'User Info'}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <form onSubmit={handleFormSubmit} style={{ textAlign: 'left' }}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  className='textFields'
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                   className='textFields'
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                   className='form-control'
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}

                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className='form-control'
                  value={formData.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="properties_listed" className="form-label">
                  Properties Listed
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="properties_listed"
                  name="properties_listed"
                  value={formData.properties_listed}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  min="0"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="properties_listing_limit" className="form-label">
                  Properties Listing Limit
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="properties_listing_limit"
                  name="properties_listing_limit"
                  value={formData.properties_listing_limit}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  min="0"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
              {isEditing ? (
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={handleEdit}>
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
