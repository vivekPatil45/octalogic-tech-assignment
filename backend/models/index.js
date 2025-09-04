import { Booking } from "./booking.model.js";
import { VehicleModel, VehicleType, Wheel } from "./vehicle.model.js";

// Associations
Wheel.hasMany(VehicleType, { foreignKey: "wheelId" });
VehicleType.belongsTo(Wheel, { foreignKey: "wheelId" });

VehicleType.hasMany(VehicleModel, { foreignKey: "vehicleTypeId" });
VehicleModel.belongsTo(VehicleType, { foreignKey: "vehicleTypeId" });

VehicleModel.hasMany(Booking, { foreignKey: "vehicleModelId" });
Booking.belongsTo(VehicleModel, { foreignKey: "vehicleModelId" });

export { Wheel, VehicleType, VehicleModel, Booking };
