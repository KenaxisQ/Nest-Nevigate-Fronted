import '../LoginPage.css'
import { useState } from 'react';
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        // Perform login logic (e.g., API call)
        console.log("Email:", email);
        console.log("Password:", password);

        // Clear the fields
        setEmail("");
        setPassword("");
    };

    return(
        <>
            <div
                class="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="tab-login"
            >
                <form onSubmit={handleSubmit}>
                    <div class="text-center mb-3">
                        <p>Sign in with:</p>
                        <button data-mdb-ripple-init type="button" class="btn btn-secondary btn-floating mx-1">
                            <i class="fab fa-facebook-f"></i>
                        </button>

                        <button data-mdb-ripple-init type="button" class="btn btn-secondary btn-floating mx-1">
                            <i class="fab fa-google"></i>
                        </button>

                        <button data-mdb-ripple-init type="button" class="btn btn-secondary btn-floating mx-1">
                            <i class="fab fa-twitter"></i>
                        </button>

                        <button data-mdb-ripple-init type="button" class="btn btn-secondary btn-floating mx-1">
                            <i class="fab fa-github"></i>
                        </button>
                    </div>

                    <p class="text-center">or:</p>

                    <div class="form-floating mb-4">
                        <input type="email" id="loginName" class="form-control is-invalid" placeholder='Email or username' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label className="form-label" for="loginName" style={{textAlign: "left", display: "flex"}}>Email or username</label>
                        <div class="invalid-feedback">
                            Please choose a username.
                        </div>
                    </div>

                    <div class="form-floating mb-4">
                        <input type="password" id="loginPassword" class="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label class="form-label" for="loginPassword" style={{textAlign: "left", display: "flex"}}>Password</label>
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-6 d-flex justify-content-center">
                            <div class="form-check mb-3 mb-md-0">
                                <input
                                    type="checkbox"
                                    value=""
                                    id="loginCheck"
                                />
                                <label class="form-check-label" for="loginCheck"> &nbsp; Remember me </label>
                            </div>
                        </div>

                        <div class="col-md-6 d-flex justify-content-center">
                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

                    <div class="text-center">
                        <p>Not a member? <a href="#!">Register</a></p>
                    </div>
                </form>
            </div>
        </>
    )
}