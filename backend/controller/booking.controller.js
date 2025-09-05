import { Op } from "sequelize";
import { Booking } from "../models/booking.model.js";



const createBooking = async (req, res) => {
    const {
        firstName,
        lastName,
        vehicleModel,
        vehicleType,
        wheels,
        startDate,
        endDate,
        vehicleTypeName,
        vehicleModelName,
    } = req.body;

    if (!firstName || !lastName || !vehicleModel || !vehicleType || !wheels || !startDate || !endDate) {
        return res.status(400).json({
        success: false,
        message: "Please provide all fields: firstName, lastName, vehicleType, wheels, startDate, endDate",
        });
    }

    try {
        
        const overlappingBooking = await Booking.findOne({
        where: {
            vehicleModelId: vehicleModel,
            [Op.or]: [
            {
                startDate: { [Op.between]: [startDate, endDate] },
            },
            {
                endDate: { [Op.between]: [startDate, endDate] },
            },
            {
                startDate: { [Op.lte]: startDate },
                endDate: { [Op.gte]: endDate },
            },
            ],
        },
        });

        if (overlappingBooking) {
        return res.status(409).json({
            success: false,
            message: "This vehicle is already booked for the selected dates. Please choose different dates or vehicle.",
        });
        }

        // Create new booking
        const newBooking = await Booking.create({
        firstName,
        lastName,
        vehicleModelId: vehicleModel,
        vehicleTypeId: vehicleType,
        wheelId: wheels,
        startDate,
        endDate,
        vehicleTypeName,
        vehicleModelName,
        });

        return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        booking: newBooking,
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({
        success: false,
        message: "Failed to create booking",
        error: error.message,
        });
    }
};

const getBookedData = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        return res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch bookings",
            error: error.message,
        });
    }
};


const deleteBooking = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Booking ID is required",
        });
    }

    try {
        const numDeletedRows = await Booking.destroy({ where: { id } });

        if (numDeletedRows === 1) {
            return res.status(200).json({
                success: true,
                message: `Booking with id ${id} has been deleted successfully.`,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: `Booking with id ${id} not found.`,
            });
        }
    } catch (error) {
        console.error("Error deleting booking:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};

export { createBooking, getBookedData, deleteBooking };
