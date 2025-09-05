import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventIcon from "@mui/icons-material/Event";
import LayersIcon from "@mui/icons-material/Layers";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import Swal from "sweetalert2";

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [wheels, setWheels] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    // Fetch bookings
    const fetchBookings = async () => {
        try {
        const res = await axios.get("http://localhost:5000/v1/booking");
        setBookings(res.data.data || []);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    // Fetch wheels info
    const fetchWheels = async () => {
        try {
        const res = await axios.get("http://localhost:5000/v1/vehicle");
        setWheels(res.data.data || []);
        } catch (err) {
        console.error(err);
        }
    };

    useEffect(() => {
        fetchWheels();
        fetchBookings();
    }, []);

    const handleCancelBooking = async (id) => {
        const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to cancel this booking?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No",
        });

        if (confirm.isConfirmed) {
        try {
            await axios.delete(`http://localhost:5000/v1/booking/${id}`);
            Swal.fire({
            icon: "success",
            title: "Cancelled!",
            text: "Booking has been cancelled successfully.",
            });
            setBookings((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            console.error(err);
            Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to cancel booking.",
            });
        }
        }
    };

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
                {bookings.length === 0 ? (
                    <Typography variant="h6" color="text.secondary">
                        No bookings found.
                    </Typography>
                ) : (
                    bookings.map((booking) => {
                        
                        const wheel = wheels.find((w) => w.id === booking.wheelId);
                        const numberOfWheels = wheel ? wheel.noOfWheels : booking.wheelId; // fallback

                        return (
                            <Grid item xs={12} sm={6} md={4} key={booking.id} sx={{ display: "flex" }}>
                                <Card
                                    sx={{
                                        flex: 1,
                                        borderRadius: 2,
                                        boxShadow: 6,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "14rem",
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
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
                                        <PersonIcon sx={{ color: theme.palette.primary.main }} />
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                            {booking.firstName} {booking.lastName}
                                        </Typography>
                                        </Box>

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
                                            <strong>Wheels:</strong> {numberOfWheels}
                                        </Typography>
                                        </Box>

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
                                        onClick={() => handleCancelBooking(booking.id)}
                                        >
                                        Cancel Booking
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        );
                    })
                )}
            </Grid>
        </Box>
    );
};

export default BookingsPage;
