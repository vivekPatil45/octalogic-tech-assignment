import { Box, Button, Card, CardContent, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CheckCircle, Person, DirectionsBike, DirectionsCar, Build, Event } from "@mui/icons-material";

import NameStep from "../components/NameStep";
import WheelsStep from "../components/WheelsStep";
import VehicleTypeStep from "../components/VehicleTypeStep";
import VehicleModelStep from "../components/VehicleModelStep";
import DatesStep from "../components/DatesStep";
import ReviewStep from "../components/ReviewStep";


const steps = [
    { label: "Name", icon: 1 },
    { label: "Wheels", icon: 2 },
    { label: "Vehicle Type", icon: 3 },
    { label: "Vehicle Model", icon: 4 },
    { label: "Dates", icon: 5 },
];

const CustomStepIcon = ({ active, completed, icon }) => {
    const icons = {
        1: <Person />,
        2: <DirectionsBike />,
        3: <DirectionsCar />,
        4: <Build />,
        5: <Event />,
    };

    return completed ? (
        <CheckCircle sx={{ color: "#4caf50" }} />
    ) : (
        <Box sx={{ color: active ? "#41836E" : "grey.400", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {icons[icon]}
        </Box>
    );
};
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
    const handleNext = () => {
    // Validation
        switch (activeStep) {
        case 0:
            if (!form.firstName || !form.lastName) {
                Swal.fire({
                    icon: "error",
                    title: "Missing Name",
                    text: "Please enter first and last name",
                    confirmButtonText: "Close",
                });
                return;
            }
            break;
        case 1:
            if (!form.wheels) {
                Swal.fire({
                    icon: "error",
                    title: "Select Wheels",
                    text: "Please select number of wheels",
                    confirmButtonText: "Close",
                });
            return;
            }
            break;
        case 2:
            if (!form.vehicleType) {
                Swal.fire({
                    icon: "error",
                    title: "Select Vehicle Type",
                    text: "Please select a vehicle type",
                    confirmButtonText: "Close",
                });
            return;
            }
            break;
        case 3:
                if (!form.vehicleModel) {
                Swal.fire({
                    icon: "error",
                    title: "Select Vehicle Model",
                    text: "Please select a vehicle model",
                    confirmButtonText: "Close",
                });
                return;
            }
            break;
        case 4:
            if (!form.startDate || !form.endDate) {
                Swal.fire({
                    icon: "error",
                    title: "Select Dates",
                    text: "Please choose start and end dates",
                    confirmButtonText: "Close",
                });
                return;
            }
            break;
        default:
            break;
        }

        setActiveStep((prev) => prev + 1);
    };
    const handleBack = () => setActiveStep((prev) => prev - 1);

    useEffect(() => {
        if (form.wheels) {
        axios
            .get(`http://localhost:5000/v1/vehicle/vehicleType/${form.wheels}`)
            .then((res) => {console.log(res);
            setVehicleTypes(res.data.data)})
            .catch((err) => console.error(err));
        }
    }, [form.wheels]);
    useEffect(() => {
        if (form.vehicleType) {
        axios
            .get(`http://localhost:5000/v1/vehicle/vehicleModel/${form.vehicleType}`)
            .then((res) => setVehicleModels(res.data.data))
            .catch((err) => console.error(err));
        }
    }, [form.vehicleType]);

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:5000/v1/booking/create", form);
            Swal.fire({
                icon: "success",
                title: "Booking Confirmed!",
                text: "Your booking has been created successfully ✅",
                confirmButtonText: "OK",
            });
            navigate("/all-bookings");
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Booking Failed",
                text: "Please try again ❌",
                confirmButtonText: "Close",
            });
        }
    };


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
        <Box display="flex" flexDirection='column' justifyContent="center" alignItems="center" minHeight="80vh"  p={2}>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, width: { xs: "100%", sm: "70%", md: "60%" } }}>
                {steps.map((step, index) => (
                <Step key={index}>
                    <StepLabel StepIconComponent={(props) => <CustomStepIcon {...props} icon={step.icon} />}>
                    {step.label}
                    </StepLabel>
                </Step>
                ))}
            </Stepper>
            <Card sx={{ width: { xs: "100%", sm: 600, md: 700 }, p: 4, borderRadius: 3, boxShadow: 6 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Vehicle Booking
                    </Typography>

                   
                    
                    {renderStep()}

                    <Box mt={3} display="flex" justifyContent="space-between">
                        {activeStep > 0 && <Button variant="outlined" onClick={handleBack}>Back</Button>}
                        {activeStep < steps.length - 1 && <Button variant="contained" onClick={handleNext}>Next</Button>}
                        {activeStep === steps.length - 1 && <Button variant="contained" color="success" onClick={handleSubmit}>Confirm Booking</Button>}
                    </Box>


                </CardContent>
            </Card>
        </Box>
    )
}

export default BookingForm
