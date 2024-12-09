import OtpInput from "./OtpInput";
import "./Login.css";
export const OtpModal = ({
  modal1Ref,
  handleOtpComplete,
  email,
  verifyOtp,
}) => {
  const onChangePassword = (event) => {};
  return (
    <div>
      <div
        class="modal fade"
        id="exampleModalToggle"
        ref={modal1Ref}
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">
                {"Verify Otp"}
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
                <label htmlFor="email" className="p-2">
                  Email
                </label>
                <input
                  style={{ fontStyle: "normal" }}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  className="w-100 rounded-3"
                  disabled={true}
                />
              </div>
              <div className="inputboxWrapper d-block text-start mt-3">
                <label htmlFor="otp" className="p-2">
                  OTP
                </label>
                <OtpInput onComplete={handleOtpComplete} />
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  verifyOtp();
                }}
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
