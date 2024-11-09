import { useNavigate } from "react-router";
import { useLogoutMutation } from "../../services/auth/authSlice";

const LogOutButton = () => {
    const [ logout, {isLoading }] = useLogoutMutation();
    const navigate = useNavigate();
    return (
        <>
        <button
            type="submit"
            onClick={() => {
                logout
            }}
        </>
    )