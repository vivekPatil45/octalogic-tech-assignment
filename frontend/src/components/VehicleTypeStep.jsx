import { RadioGroup, FormControlLabel, Radio, Typography, Box } from "@mui/material";

const VehicleTypeStep = ({ form, setForm, vehicleTypes }) => {
    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom>
                Select Vehicle Type
            </Typography>
            <RadioGroup
                value={form.vehicleType}
                onChange={(e) => {
                const selected = vehicleTypes.find((v) => v.id.toString() === e.target.value);
                setForm({ ...form, vehicleType: e.target.value, vehicleTypeName: selected?.vehicleType || "" });
                }}
            >
                {vehicleTypes?.map((v) => (
                <FormControlLabel key={v.id} value={v.id.toString()} control={<Radio />} label={v.vehicleType} />
                ))}
            </RadioGroup>
        </Box>
    )
}

export default VehicleTypeStep
