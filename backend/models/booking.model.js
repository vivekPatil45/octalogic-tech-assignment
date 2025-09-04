import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
const Booking = sequelize.define("Booking", {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    vehicleTypeId: { type: DataTypes.INTEGER, allowNull: false },
    vehicleTypeName: { type: DataTypes.STRING, allowNull: false },
    vehicleModelId: { type: DataTypes.INTEGER, allowNull: false },
    vehicleModelName: { type: DataTypes.STRING, allowNull: false },
    wheelId: { type: DataTypes.INTEGER, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false }
    }, {
    timestamps: false}
);


export { Booking };
