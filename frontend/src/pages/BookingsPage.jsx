import  { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    CircularProgress,
    Box,
    Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventIcon from "@mui/icons-material/Event";
import LayersIcon from "@mui/icons-material/Layers";
import PersonIcon from "@mui/icons-material/Person";

const bookingData = [ {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      vehicleTypeName: "Car",
      vehicleModelName: "Toyota Corolla",
      wheelId: 4,
      startDate: "2025-09-10",
      endDate: "2025-09-12",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      vehicleTypeName: "Motorbike",
      vehicleModelName: "Yamaha R15",
      wheelId: 2,
      startDate: "2025-09-11",
      endDate: "2025-09-15",
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      vehicleTypeName: "Truck",
      vehicleModelName: "Volvo FH",
      wheelId: 6,
      startDate: "2025-09-14",
      endDate: "2025-09-20",
    },]

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

  
    useEffect(() => {
        const fetchBookings = async () => {
        try {
            const res = await fetch("http://localhost:5000/v1/booking");
            const data = await res.json();
            setBookings(data.data || []); 
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
        <Box
            sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            }}
        >
            <CircularProgress sx={{ color: theme.palette.primary.main }} />
        </Box>
        );
    }

    return (
        <Box sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 0 } }}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                {bookingData.map((booking) => (
                <Grid item xs={12} sm={6} md={4} key={booking.id} sx={{ display: "flex" }}>
                    <Card
                        sx={{
                            flex: 1,
                            borderRadius: 2,
                            boxShadow: 6,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                            alignItems:"center",
                            // gap: "20px",
                            transition: "transform 0.3s, background 0.3s",
                            "&:hover": {
                            transform: "scale(1.05)",
                            background:
                                theme.palette.mode === "dark"
                                ? "linear-gradient(145deg, #1e1e1e, #2a2a2a)"
                                : "linear-gradient(145deg, #e0f7e9, #c8f0d9)",
                            },
                            backgroundColor: theme.palette.mode === "dark" ? "#2a2a2a" : "#e6f4ea",
                            color: theme.palette.text.primary,
                            minHeight: 320,
                        }}
                    >
                        <CardContent>

                            {/* Header with Person Icon */}
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
                                <PersonIcon sx={{ color: theme.palette.primary.main }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {booking.firstName} {booking.lastName}
                                </Typography>
                            </Box>

                            {/* Vehicle Info */}
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                                <LayersIcon color="success" />
                                <Typography variant="body2">
                                    <strong>Type:</strong> {booking.vehicleTypeName}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                                <DirectionsCarIcon color="primary" />
                                <Typography variant="body2">
                                    <strong>Model:</strong> {booking.vehicleModelName}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                                <LayersIcon color="secondary" />
                                <Typography variant="body2">
                                    <strong>Wheels:</strong> {booking.wheelId}
                                </Typography>
                            </Box>

                            {/* Dates */}
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1, gap: 1 }}>
                                <EventIcon color="info" />
                                <Typography variant="body2">
                                    <strong>Start:</strong> {new Date(booking.startDate).toLocaleDateString()}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <EventIcon color="error" />
                                <Typography variant="body2">
                                    <strong>End:</strong> {new Date(booking.endDate).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </CardContent>

                        <CardActions sx={{ justifyContent: "center", mb: 2 }}>
                            <Button
                            size="medium"
                            variant="contained"
                            color="error"
                            sx={{
                                textTransform: "none",
                                fontWeight: "bold",
                                px: 3,
                                "&:hover": { backgroundColor: "#d32f2f" },
                            }}
                            >
                            Cancel Booking
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default BookingsPage
