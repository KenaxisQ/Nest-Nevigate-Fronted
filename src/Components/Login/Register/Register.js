import '../LoginPage.css'
import { useState } from 'react';
export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <>
            <div
                class="tab-pane fade show active"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="tab-register"
            >
                <form>
                    <div class="text-center mb-3">
                        <p>Sign up with:</p>
                        <button data-mdb-ripple-init type="button" class="btn btn-secondary btn-floating mx-2">
                            <i class="fab fa-facebook-f"></i>
                        </button>

                        <button data-mdb-ripple-init type="button" class="btn btn-secondary btn-floating mx-2">
                            <i class="fab fa-google"></i>
                        </button>
                    </div>

                    <p class="text-center">or:</p>

                    <div class="form-floating mb-4">
                        <input type="text" id="registerName" class="form-control" placeholder='Name'/>
                        <label class="form-label" for="registerName" style={{textAlign: "left", display: "flex"}}>Name</label>
                    </div>

                    <div class="form-floating mb-4">
                        <input type="text" id="registerUsername" class="form-control" placeholder='Username'/>
                        <label class="form-label" for="registerUsername">Username</label>
                    </div>

                    <div class="form-floating mb-4">
                        <input type="email" id="registerEmail" class="form-control" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label class="form-label" for="registerEmail">Email</label>
                    </div>

                    <div class="form-floating mb-4">
                        <input type="password" id="registerPassword" class="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label class="form-label" for="registerPassword">Password</label>
                    </div>

                    <div class="form-floating mb-4">
                        <input type="password" id="registerRepeatPassword" class="form-control" placeholder='Repeat password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label class="form-label" for="registerRepeatPassword">Repeat password</label>
                    </div>

                    <div class="form-check d-flex justify-content-center mb-4">
                        <input
                            class="me-2"
                            type="checkbox"
                            value=""
                            id="registerCheck"
                            aria-describedby="registerCheckHelpText"
                        />
                        <label class="form-check-label" for="registerCheck">
                            I have read and agree to the terms
                        </label>
                    </div>

                    <button data-mdb-ripple-init type="submit" class="btn btn-primary btn-block mb-3">Sign in</button>
                </form>
            </div>
        </>
    )
}