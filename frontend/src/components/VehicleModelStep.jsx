import { RadioGroup, FormControlLabel, Radio, Typography, Box } from "@mui/material";


const VehicleModelStep = ({ form, setForm, vehicleModels }) => {
    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom>
                Select Vehicle Model
            </Typography>
            <RadioGroup
                value={form.vehicleModel}
                onChange={(e) => {
                const selected = vehicleModels.find((m) => m.id.toString() === e.target.value);
                setForm({ ...form, vehicleModel: e.target.value, vehicleModelName: selected?.vehicleModel || "" });
                }}
            >
                {vehicleModels.map((m) => (
                <FormControlLabel key={m.id} value={m.id.toString()} control={<Radio />} label={m.vehicleModel} />
                ))}
            </RadioGroup>
        </Box>
    )
}

export default VehicleModelStep
