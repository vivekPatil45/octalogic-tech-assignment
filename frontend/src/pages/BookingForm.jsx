import { Box, Button, Card, CardContent, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NameStep from "../components/NameStep";
import WheelsStep from "../components/WheelsStep";
import VehicleTypeStep from "../components/VehicleTypeStep";
import VehicleModelStep from "../components/VehicleModelStep";
import DatesStep from "../components/DatesStep";
import ReviewStep from "../components/ReviewStep";

const steps = ["Name", "Wheels", "Vehicle Type", "Model", "Dates", "Review"];

const BookingForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        wheels: "",
        vehicleType: "",
        vehicleTypeName: "",
        vehicleModel: "",
        vehicleModelName: "",
        startDate: null,
        endDate: null,
    });
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicleModels, setVehicleModels] = useState([]);
    const navigate = useNavigate();
    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const renderStep = () => {
        switch (activeStep) {
        case 0: return <NameStep form={form} setForm={setForm} />;
        case 1: return <WheelsStep form={form} setForm={setForm} />;
        case 2: return <VehicleTypeStep form={form} setForm={setForm} vehicleTypes={vehicleTypes} />;
        case 3: return <VehicleModelStep form={form} setForm={setForm} vehicleModels={vehicleModels} />;
        case 4: return <DatesStep form={form} setForm={setForm} />;
        case 5: return <ReviewStep form={form} />;
        default: return null;
        }
    };
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5" p={2}>
            <Card sx={{ width: { xs: "100%", sm: 500 }, p: 3, borderRadius: 3, boxShadow: 4 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Vehicle Booking
                    </Typography>

                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    
                    {renderStep()}

                    <Box mt={3} display="flex" justifyContent="space-between">
                        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                        Back
                        </Button>
                        {activeStep === steps.length - 1 ? (
                        <Button variant="contained" color="success" onClick={handleSubmit}>
                            Confirm Booking
                        </Button>
                        ) : (
                        <Button variant="contained" onClick={handleNext}>
                            Next
                        </Button>
                        )}
                    </Box>

                </CardContent>
            </Card>
        </Box>
    )
}

export default BookingForm
