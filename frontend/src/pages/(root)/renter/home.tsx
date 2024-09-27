import { useBooksCatalog } from "@/services/react-query/queries";
import { Box, TextField, Grid2 } from "@mui/material";
import BookCard from "./components/book-card";
import BookSkeleton from "./components/book-card-skeleton";
import { useState } from "react";

export default function Home() {
    const [search, setSearch] = useState("");
    const { data, isLoading } = useBooksCatalog(search);

    const booksData = data || [];

    return (
        <Box>
            {/* Search Input */}
            <Box sx={{ padding: "40px", textAlign: "center" }}>
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    variant="outlined"
                    placeholder="Search by name, category"
                    fullWidth
                    sx={{ maxWidth: "600px" }}
                />
            </Box>

            {isLoading ? (
                <BookSkeleton />
            ) : (
                <Grid2
                    container
                    spacing={3}
                    sx={{
                        padding: "20px",
                        maxWidth: "1400px",
                        marginInline: "auto",
                    }}>
                    {booksData &&
                        booksData.map((book, index) => {
                            return (
                                <Grid2
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                        md: 4,
                                    }}
                                    key={index}>
                                    <BookCard key={index} {...book} />
                                </Grid2>
                            );
                        })}
                </Grid2>
            )}
        </Box>
    );
}
