import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const features = [
  {
    title: "Quick Booking",
    icon: <AccessTimeIcon fontSize="large" />,
    description: "Book your vehicle instantly with just a few clicks.",
  },
  {
    title: "All Vehicle Types",
    icon: <DirectionsCarIcon fontSize="large" />,
    description: "Choose from multiple vehicle types to suit your needs.",
  },
  {
    title: "Track Your Bookings",
    icon: <EventAvailableIcon fontSize="large" />,
    description: "Easily track all your bookings in one place.",
  },
];

const Home = () => {
    const theme = useTheme();

    return (
        <Box sx={{ mt: { xs: 2, md: 4 }, px: { xs: 2, md: 0 } }}>
            {/* Hero Section */}
            <Box
                sx={{
                textAlign: "center",
                py: { xs: 4, md: 12 },
                px: { xs: 2, md: 6 },
                backgroundColor: theme.palette.mode === "dark" ? "#1b1b1b" : "#e8f5e9",
                borderRadius: 3,
                }}
            >
                <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                    mb: { xs: 2, md: 3 },
                }}
                >
                Welcome to MyBookingApp
                </Typography>
                <Typography
                variant="body1"
                sx={{
                    mb: { xs: 3, md: 4 },
                    color: theme.palette.text.secondary,
                    fontSize: { xs: "0.9rem", md: "1.1rem" },
                }}
                >
                Seamlessly manage your vehicle bookings in a few clicks.
                </Typography>
                <Button
                component={Link}
                to="/create-booking"
                variant="contained"
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    px: { xs: 3, md: 5 },
                    py: { xs: 1, md: 1.5 },
                    fontWeight: "bold",
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                    },
                }}
                >
                Create Booking
                </Button>
            </Box>

            {/* Features Section */}
            <Box sx={{ mt: { xs: 6, md: 10 } }}>
                <Grid container spacing={{ xs: 2, md: 4 }} sx={{ display: "flex", alignItems:"center",justifyContent:"center"}}>
                {features.map((feature, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        key={index}
                        sx={{ display: "flex", alignItems:"center",justifyContent:"center"}} // makes Paper stretch
                    >
                        <Paper
                            elevation={3}
                            sx={{
                            p: { xs: 3, md: 4 },
                            textAlign: "center",
                            borderRadius: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            width: "22rem", 
                            height: "100%", 
                            transition: "transform 0.3s",
                            "&:hover": { transform: "scale(1.05)" },
                            backgroundColor:
                                theme.palette.mode === "dark" ? "#2a2a2a" : "#fff",
                            }}
                        >
                            <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                                {feature.icon}
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                {feature.title}
                            </Typography>
                            <Typography sx={{ color: theme.palette.text.secondary }}>
                                {feature.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
                </Grid>

            </Box>
        </Box>
    );
};

export default Home;
