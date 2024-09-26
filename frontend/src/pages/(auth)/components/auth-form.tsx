import { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid2,
    IconButton,
    InputAdornment,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RentalLogo = "/assets/svg/rental_logo_small.svg";

//  Zod schema for SignIn
const signInSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    remember: z.boolean().optional(),
});

//  Zod schema for SignUp
const signUpSchema = z
    .object({
        username: z.string().min(4, "Usenrame must be at least 4 characters"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Confirm Password is required"),
        location: z.string().min(1, "Location is required"),
        phoneNumber: z
            .string()
            .min(10, "Phone number must be at least 10 digits")
            .regex(/^\d+$/, "Phone number must only contain digits"),
        role: z.enum(["OWNER", "RENTER"]),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;

type AuthFormProps = {
    isSignUp: boolean;
    isFormSubmitting: boolean;
    onSubmit: (data: SignInFormValues | SignUpFormValues) => void;
};

export default function AuthForm({
    isSignUp,
    onSubmit,
    isFormSubmitting,
}: AuthFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const schema = isSignUp ? signUpSchema : signInSchema;

    const form = useForm<SignUpFormValues | SignInFormValues>({
        resolver: zodResolver(schema),
        defaultValues: isSignUp
            ? {
                  username: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  location: "",
                  phoneNumber: "",
                  role: "RENTER",
              }
            : {
                  email: "",
                  password: "",
                  remember: false,
              },
    });

    const { register, handleSubmit, formState, control, watch } = form;
    const { errors } = formState;

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const onSubmitCallback = (data: SignUpFormValues | SignInFormValues) => {
        onSubmit(data);
    };

    //whatch role value
    const role = watch("role");

    return (
        <Stack
            sx={{
                height: "100%",
                maxWidth: "800px",
                margin: "auto",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Box width={"100%"} maxWidth={"90%"}>
                <FormHeader />
                <Box>
                    <Typography variant="h5" sx={{ fontSize: "24px" }}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Typography>
                    <Divider
                        sx={{
                            marginTop: "5px",
                            marginBottom: "20px",
                            color: "black",
                        }}
                    />
                </Box>
                <form noValidate onSubmit={handleSubmit(onSubmitCallback)}>
                    <Stack spacing={2.5} marginBottom={2}>
                        {isSignUp && (
                            <TextField
                                size="small"
                                label="Username"
                                {...register("username")}
                                //@ts-expect-error - only shown for sign-up form
                                error={!!errors.username}
                                //@ts-expect-error - only shown for sign-up form
                                helperText={errors.username?.message}
                                disabled={isFormSubmitting}
                            />
                        )}
                        <TextField
                            size="small"
                            label="Email"
                            type="email"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            disabled={isFormSubmitting}
                        />
                        <TextField
                            size="small"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            autoCorrect="off"
                            autoFocus={false}
                            disabled={isFormSubmitting}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleTogglePasswordVisibility
                                                }
                                                edge="end">
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        {/* Additional Fields for Sign-Up */}
                        {isSignUp && (
                            <>
                                <TextField
                                    size="small"
                                    label="Confirm Password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    {...register("confirmPassword")}
                                    //@ts-expect-error - only shown for sign-up form
                                    error={!!errors.confirmPassword}
                                    //@ts-expect-error - only shown for sign-up form
                                    helperText={errors.confirmPassword?.message}
                                    disabled={isFormSubmitting}
                                    autoCorrect="off"
                                    autoFocus={false}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle confirm password visibility"
                                                        onClick={
                                                            handleToggleConfirmPasswordVisibility
                                                        }
                                                        edge="end">
                                                        {showConfirmPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                                <Grid2 container spacing={2}>
                                    <Grid2 size={{ xs: 6 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Location"
                                            {...register("location")}
                                            //@ts-expect-error - only shown for sign-up form
                                            error={!!errors.location}
                                            helperText={
                                                //@ts-expect-error - only shown for sign-up form
                                                errors.location?.message
                                            }
                                            disabled={isFormSubmitting}
                                        />
                                    </Grid2>
                                    <Grid2 size={{ xs: 6 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Phone Number"
                                            {...register("phoneNumber")}
                                            //@ts-expect-error - only shown for sign-up form
                                            error={!!errors.phoneNumber}
                                            helperText={
                                                //@ts-expect-error - only shown for sign-up form
                                                errors.phoneNumber?.message
                                            }
                                            disabled={isFormSubmitting}
                                        />
                                    </Grid2>
                                </Grid2>
                                <Stack spacing={0.1}>
                                    <FormControlLabel
                                        label={
                                            role === "OWNER"
                                                ? "Sign up as  Owner"
                                                : "Sign up as  Renter"
                                        }
                                        control={
                                            <Controller
                                                control={control}
                                                name="role"
                                                disabled={isFormSubmitting}
                                                render={({ field }) => (
                                                    <Switch
                                                        checked={
                                                            field.value ===
                                                            "OWNER"
                                                        }
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target.checked
                                                                    ? "OWNER"
                                                                    : "RENTER"
                                                            )
                                                        }
                                                        color="primary"
                                                    />
                                                )}
                                            />
                                        }
                                    />
                                    <Typography
                                        variant="body2"
                                        fontSize={"12px"}
                                        paddingLeft={"13px"}
                                        color="textSecondary">
                                        You can sign up as a book Renter or
                                        Owner.
                                    </Typography>
                                </Stack>
                            </>
                        )}

                        {!isSignUp ? (
                            <FormControlLabel
                                control={
                                    <Controller
                                        disabled={isFormSubmitting}
                                        control={control}
                                        name="remember"
                                        defaultValue={false}
                                        render={({ field }) => (
                                            <Checkbox
                                                {...field}
                                                color="primary"
                                            />
                                        )}
                                    />
                                }
                                label="Remember me"
                            />
                        ) : null}
                        <Button
                            disabled={isFormSubmitting}
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary">
                            {isSignUp ? "SIGN UP" : "LOGIN"}
                        </Button>
                    </Stack>
                    <Stack spacing={2} direction="row" justifyContent="center">
                        <Typography variant="body2">
                            {!isSignUp
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </Typography>
                        <Link
                            to={isSignUp ? "/sign-in" : "/sign-up"}
                            style={{ textDecoration: "none" }}>
                            <Typography color="primary" variant="body2">
                                {!isSignUp ? "Sign Up" : "Sign In"}
                            </Typography>
                        </Link>
                    </Stack>
                </form>
            </Box>
        </Stack>
    );
}

function FormHeader() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "15px",
            }}>
            <Box sx={{ width: "60px", height: "60px" }}>
                <img
                    height={"100%"}
                    width={"100%"}
                    src={RentalLogo}
                    alt="Rental Logo"
                />
            </Box>
            <Typography
                variant="h5"
                sx={{ fontWeight: "500", fontSize: "28px" }}>
                Book Rent
            </Typography>
        </Box>
    );
}
