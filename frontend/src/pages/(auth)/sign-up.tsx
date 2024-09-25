import { useRegisterUser } from "@/services/react-query/queries";
import AuthForm, {
    SignUpFormValues,
    SignInFormValues,
} from "./components/auth-form";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const { mutateAsync: registerUserMutation, isPending } = useRegisterUser();
    const navigate = useNavigate();
    const submitForm = async (values: SignInFormValues | SignUpFormValues) => {
        const val = values as SignUpFormValues;
        const payload = {
            username: val.username,
            email: val.email,
            password: val.password,
            role: val.role,
            location: val.location,
            phoneNumber: val.phoneNumber,
        };
        await registerUserMutation(payload);
        toast.success("Successfull Signed up");
        navigate("/sign-in");
    };
    return (
        <>
            <AuthForm
                isFormSubmitting={isPending}
                isSignUp={true}
                onSubmit={submitForm}
            />
        </>
    );
}
