import { Box, TextField } from "@mui/material";

const NameStep = ({ form, setForm }) => {
    return (
        <Box>
            <TextField
                fullWidth
                label="First Name"
                margin="normal"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
        </Box>
    )
}

export default NameStep
