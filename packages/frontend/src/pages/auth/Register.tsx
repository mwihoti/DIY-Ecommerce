import { useState } from "react";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../../services/auth/authSlice";
import type { RegisterRequest } from "../../services/auth/types";
import { RegisterRequest } from '../../services/auth/types';

const Register = ({
    isAuthenticated,
}: { isAuthenticated: boolean}) => {
    const navigate = useNavigate();
    const [register, {isLoading }] = useRegisterMutation();
    const [registerFormData, setRegisterFormData] = useState<RegisterRequest>({
        username: "",
        email: "",
        password: "",
    });

    return (
        <div className="card">
            { !isAuthenticated && (
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
                                        })
                                    }
                                })
                        }
                    }}
                
                </>
            )}
        </div>
    )
}