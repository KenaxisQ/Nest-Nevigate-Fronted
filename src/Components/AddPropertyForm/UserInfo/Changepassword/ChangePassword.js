import { DisplayChangePasswordFields } from "./DisplayChangePasswordFields";

export const ChangePassword = ({ changePasswordPageOpen, setChangePasswordPageOpen, modal1Ref }) => {
    const onChangePassword = (event) => {
        setChangePasswordPageOpen(false);
    }
    return (
        <div>
            <div class="modal fade" id="exampleModalToggle" ref={modal1Ref} aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalToggleLabel">{"Change Password"}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <DisplayChangePasswordFields />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Change</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalToggleLabel2">Confirm</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Clicking on Confirm will change the password
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-danger" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Cancel</button>
                            <button class="btn btn-success" onClick={onChangePassword} data-bs-dismiss="modal">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}