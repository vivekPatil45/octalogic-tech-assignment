import { useEffect, useState } from "react";
import { RadioGroup, FormControlLabel, Radio, Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const WheelsStep = ({ form, setForm }) => {
    const [wheelsOptions, setWheelsOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWheels = async () => {
        try {
            const res = await axios.get("http://localhost:5000/v1/vehicle");
            if (res.data.success) {
            setWheelsOptions(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching wheels:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchWheels();
    }, []);
    console.log(wheelsOptions);
    

    if (loading) {
        return (
        <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
        </Box>
        );
    }

    return (
        <Box>
        <Typography variant="subtitle1" mb={1}>
            Select Number of Wheels
        </Typography>
        <RadioGroup
            value={form.wheels}
            onChange={(e) => setForm({ ...form, wheels: e.target.value })}
        >
            {wheelsOptions.map((wheel) => (
            <FormControlLabel
                key={wheel.id}
                value={wheel.id.toString()}
                control={<Radio />}
                label={wheel.noOfWheels}
            />
            ))}
        </RadioGroup>
        </Box>
    );
};

export default WheelsStep;
