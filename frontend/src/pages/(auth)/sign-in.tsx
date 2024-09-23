import { useLoginUser } from "@/services/react-query/queries";
import AuthForm, { SignInFormValues } from "./components/auth-form";
import { handleError } from "@/utils/error-utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-provider";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { COOKIE_TOKEN } from "@/utils/constants";

export default function SignIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser, setIsAuthenticated } = useAuth();

    const from = location.state?.from?.pathname || "/";

    const { mutateAsync: loginUserMuation, isPending } = useLoginUser();

    const submitForm = async (values: SignInFormValues) => {
        const payload = { email: values.email, password: values.password };
        try {
            const data = await loginUserMuation(payload);
            console.log("Login Response:", data);
            const user = data.user;
            console.log("Setting user:", user);
            setUser(user);
            setIsAuthenticated(true);
            toast.success("Successfully logged in");
            Cookies.set(COOKIE_TOKEN, data.token);

            navigate(from, { replace: true });
        } catch (error) {
            handleError(error);
        }
    };
    return (
        <>
            <AuthForm
                isFormSubmitting={isPending}
                isSignUp={false}
                onSubmit={submitForm}
            />
        </>
    );
}
