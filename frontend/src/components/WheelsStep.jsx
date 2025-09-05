import { RadioGroup, FormControlLabel, Radio, Box, Typography } from "@mui/material";

const WheelsStep = ({ form, setForm }) => {
    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom>
                Select Number of Wheels
            </Typography>
            <RadioGroup
                value={form.wheels}
                onChange={(e) => setForm({ ...form, wheels: e.target.value })}
            >
                <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
                <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
            </RadioGroup>
        </Box>
    )
}

export default WheelsStep
