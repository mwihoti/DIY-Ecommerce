import { useState } from "react";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../../services/auth/authSlice";
import type { RegisterRequest } from "../../services/auth/types";
import { RegisterRequest } from '../../services/auth/types';

const Register = ({
    isAuthenticated,
}: { isAuthenticated: boolean }) => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const [registerFormData, setRegisterFormData] = useState<RegisterRequest>({
        username: "",
        email: "",
        password: "",
    });

    return (
        <div className="card">
            {!isAuthenticated && (
                <>
                    <h2>Register to our blogging platform</h2>
                    <form
                        className="login"
                        onSubmit={(e) => {
                            e.preventDefault();
                            try {
                                register(registerFormData)
                                    .then((data) => {
                                        if (data?.data?.ok) {
                                            return navigate("/", {
                                                replace: true
                                            });
                                        }
                                        alert("Invalid credentials");
                                    })
                                    .catch(() =>
                                        alert("Server error! Please file a bug report!"),

                                    );
                            } catch (err) {
                                alert(`Failed to register; got ${err} `);
                            }
                        }}
                    />
                    <input
                        id="username"
                        placeholder="Username"
                        type="text"

                        value={registerFormData.username}
                        onChange={(e) =>
                            setRegisterFormData({
                                ...registerFormData,
                                username: e.target.value,
                            })
                        }
                    />

                    <input
                        id="email",
                    placeholder="email",
                    type="text",
                    value={registerFormData.email},
                    onChange={(e) =>
                        setRegisterFormData({
                            ...registerFormData,
                            email: e.target.value,
                        })
                    }
                    />

                    <input
                        id="password",
                    placehodler="password",
                    value={registerFormData.password},
                    onchange={(e) =>
                        setRegisterFormData({
                            ...registerFormData({
                                ...registerFormData,
                                password: e.target.value,
                            })
                        })
                    }
                    />

                    <button type="submit">

                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>
        </>
    )
}
        </div >
    );
};

export default Register