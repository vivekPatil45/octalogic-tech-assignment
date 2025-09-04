import { sequelize } from "../db.js";
import { Wheel, VehicleType, VehicleModel } from "../models/index.js";

async function seed() {
    try {
        await sequelize.sync({ force: true }); 
        console.log("✅ Database synced");

    
        const wheel2 = await Wheel.create({ noOfWheels: 2 });
        const wheel4 = await Wheel.create({ noOfWheels: 4 });

        
        const [cruiser, sports] = await Promise.all([
            VehicleType.create({ vehicleType: "Cruiser", wheelId: wheel2.id }),
            VehicleType.create({ vehicleType: "Sports", wheelId: wheel2.id }),
        ]);

        const [hatchback, suv, sedan] = await Promise.all([
            VehicleType.create({ vehicleType: "Hatchback", wheelId: wheel4.id }),
            VehicleType.create({ vehicleType: "SUV", wheelId: wheel4.id }),
            VehicleType.create({ vehicleType: "Sedan", wheelId: wheel4.id }),
        ]);

        
        await Promise.all([
            
            // 2-Wheelers
            VehicleModel.create({ vehicleModel: "Royal Enfield Classic", vehicleTypeId: cruiser.id, wheelId: wheel2.id }),
            VehicleModel.create({ vehicleModel: "Harley Davidson", vehicleTypeId: cruiser.id, wheelId: wheel2.id }),
            VehicleModel.create({ vehicleModel: "Yamaha R15", vehicleTypeId: sports.id, wheelId: wheel2.id }),
            VehicleModel.create({ vehicleModel: "KTM Duke", vehicleTypeId: sports.id, wheelId: wheel2.id }),

            // 4-Wheelers
            VehicleModel.create({ vehicleModel: "Maruti Swift", vehicleTypeId: hatchback.id, wheelId: wheel4.id }),
            VehicleModel.create({ vehicleModel: "Hyundai i20", vehicleTypeId: hatchback.id, wheelId: wheel4.id }),
            VehicleModel.create({ vehicleModel: "Toyota Fortuner", vehicleTypeId: suv.id, wheelId: wheel4.id }),
            VehicleModel.create({ vehicleModel: "Mahindra XUV700", vehicleTypeId: suv.id, wheelId: wheel4.id }),
            VehicleModel.create({ vehicleModel: "Honda City", vehicleTypeId: sedan.id, wheelId: wheel4.id }),
            VehicleModel.create({ vehicleModel: "Hyundai Verna", vehicleTypeId: sedan.id, wheelId: wheel4.id }),
        ]);

        console.log("✅ Seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error while seeding:", error);
        process.exit(1);
    }
}

seed();
