import { useAuth } from "@/context/auth-provider";
import { Button, Typography, AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
const bookRentalLogo = "/assets/svg/rental_logo.svg";
export default function NavBar() {
    const { logOutUser } = useAuth();

    return (
        <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
            <Toolbar>
                <Link to="/home">
                    <img
                        src={bookRentalLogo}
                        alt="Book Rental Logo"
                        style={{ height: "50px", marginRight: "16px" }}
                    />
                </Link>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link
                        to="/home"
                        style={{
                            color: "white",
                            textDecoration: "none",
                        }}>
                        Book Rental
                    </Link>
                </Typography>

                <Button color="inherit">
                    <Link
                        to="/rentals"
                        style={{
                            color: "white",
                            textDecoration: "none",
                        }}>
                        My Rentals
                    </Link>
                </Button>
                <Button color="inherit" onClick={logOutUser}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}
