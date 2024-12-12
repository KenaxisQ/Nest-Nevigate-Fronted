export const ConfirmationModal = ({modal1Ref, setStep, reset}) =>{
    return(
        <div>
      <div
        class="modal fade"
        id="exampleModalToggle"
        ref={modal1Ref}
        role="dialog"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">
                {"Confirm"}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="inputboxWrapper d-block text-start">
              Are you Sure Want to Go Back? Going back will Discard the data..
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                    setStep(0);
                    reset();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}