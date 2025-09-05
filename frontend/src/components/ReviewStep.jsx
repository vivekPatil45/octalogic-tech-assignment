import { Box, Typography } from "@mui/material";


const ReviewStep = ({ form }) => {
    return (
        <Box>
            <Typography variant="body1"><b>Name:</b> {form.firstName} {form.lastName}</Typography>
            <Typography variant="body1"><b>Vehicle Type:</b> {form.vehicleTypeName}</Typography>
            <Typography variant="body1"><b>Model:</b> {form.vehicleModelName}</Typography>
            <Typography variant="body1"><b>From:</b> {String(form.startDate)}</Typography>
            <Typography variant="body1"><b>To:</b> {String(form.endDate)}</Typography>
        </Box>
    )
}

export default ReviewStep
