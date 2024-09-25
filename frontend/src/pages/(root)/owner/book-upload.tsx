import { Box } from "@mui/material";
import BookInventoryForm from "./components/book-upload/book-inventory-form";

export default function BookUpload() {
    return (
        <Box
            sx={{
                height: "calc(100vh - 95px)",
                background: "white",
                borderRadius: "10px",
                paddingInline: "4%",
            }}>
            <Box
                sx={{
                    maxWidth: "500px",
                    marginInline: "auto",
                    height: "100%",
                    paddingBlock: "20px",
                }}>
                <BookInventoryForm />
            </Box>
        </Box>
    );
}
