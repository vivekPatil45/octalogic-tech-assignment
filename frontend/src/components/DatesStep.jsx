
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DatesStep = ({ form, setForm }) => {
    return (
        <Box>
            <DatePicker
                label="Start Date"
                value={form.startDate}
                onChange={(newValue) => setForm({ ...form, startDate: newValue })}
                sx={{ mb: 2, width: "100%" }}
            />
            <DatePicker
                label="End Date"
                value={form.endDate}
                onChange={(newValue) => setForm({ ...form, endDate: newValue })}
                sx={{ width: "100%" }}
            />
        </Box>
    )
}

export default DatesStep
