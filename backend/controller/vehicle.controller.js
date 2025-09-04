
import { VehicleModel, VehicleType, Wheel } from '../models/vehicle.model.js'

const getWhellerInfo = async (req, res) => {
    try {
        const wheels = await Wheel.findAll();
        return res.status(200).json({
            success: true,
            data: wheels,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching wheels.",
            error: error.message,
        });
    }
};


const getVehicleType = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Wheel ID is required.",
            });
        }

        const vehicles = await VehicleType.findAll({ where: { wheelId: id } });
        return res.status(200).json({
            success: true,
            data: vehicles,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching vehicle types.",
            error: error.message,
        });
    }
};

const getVehicleModal = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Vehicle type ID is required.",
            });
        }

        const vehiclesModels = await VehicleModel.findAll({
                        where: { vehicleTypeId: id },
                    });
        return res.status(200).json({
            success: true,
            data: vehiclesModels,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching vehicle models.",
            error: error.message,
        });
    }
};

export { getWhellerInfo, getVehicleType, getVehicleModal };