import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


const Wheel = sequelize.define("Wheel", {
    noOfWheels: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, { timestamps: false });


const VehicleType = sequelize.define("VehicleType", {
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { timestamps: false });


const VehicleModel = sequelize.define("VehicleModel", {
    vehicleModel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { timestamps: false });

export { Wheel, VehicleType, VehicleModel };

