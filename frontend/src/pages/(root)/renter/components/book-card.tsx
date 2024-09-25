import { Typography, Card, CardContent } from "@mui/material";

type BookCardProps = {
    title: string;
    author: string;
    category: string;
};

const BookCard = ({ title, author, category }: BookCardProps) => {
    return (
        <Card
            sx={{
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
            </CardContent>
        </Card>
    );
};

export default BookCard;
