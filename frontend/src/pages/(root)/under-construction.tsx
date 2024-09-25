import { Box, Stack, Typography } from "@mui/material";
const constructionSvg = "/assets/svg/under-contruction.svg";
export default function UnderConstruction() {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                }}>
                <Box
                    sx={{
                        maxWidth: "50%",
                        maxHeight: "100%",
                    }}>
                    <img
                        style={{
                            width: "100%",
                            minWidth: "100%",
                            height: "auto",
                            objectFit: "contain",
                        }}
                        src={constructionSvg}
                        alt="Under construction"
                    />
                </Box>
                <Stack spacing={1} textAlign="center">
                    <Typography variant="h5" component="h1">
                        UNDER CONSTRUCTION
                    </Typography>
                    <Typography variant="body1">
                        This page is under construction
                    </Typography>
                </Stack>
            </Box>
        </>
    );
}
