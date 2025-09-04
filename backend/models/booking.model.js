import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


const Booking = sequelize.define("Booking", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    vehicleTypeName: DataTypes.STRING,
    vehicleModelName: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
}, { timestamps: false });

export { Booking };
