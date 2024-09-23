import { useAuth } from "@/context/auth-provider";
import { Button } from "@mui/material";

export default function Home() {
    const { logOutUser } = useAuth();
    return (
        <>
            <div>
                <div>Hello renter</div>
                <Button onClick={logOutUser}>logout</Button>
            </div>
        </>
    );
}
