import { Typography, Card, CardContent, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

type BookCardProps = {
    id: string;
    title: string;
    author: string;
    category: string;
};

const BookCard = ({ title, author, category, id }: BookCardProps) => {
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate(`/books/${id}`);
    };
    return (
        <Card
            sx={{
                border: "1px solid black",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.2)",
                },
                backgroundColor: "#f9f9f9",
            }}>
            <CardContent>
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                        color: "#1976d2",
                    }}>
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ marginBottom: "4px" }}>
                    Author: {author}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: "8px" }}>
                    Category: {category}
                </Typography>
                <Box
                    onClick={handleSearch}
                    sx={{
                        cursor: "pointer",
                        borderRadius: "12px",
                        paddingInline: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        backgroundColor: "gainsboro",
                    }}>
                    <IconButton size="small">
                        <SearchIcon />
                    </IconButton>
                    <Typography>Search book in Inventory</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BookCard;
