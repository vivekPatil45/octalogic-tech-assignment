import express from 'express';
import { getVehicleModal, getVehicleType, getWhellerInfo } from '../controller/vehicle.controller.js';

const router = express.Router();

router.get('/',getWhellerInfo);
router.get('/vehicleType/:id',getVehicleType);
router.get('/vehicleModel/:id',getVehicleModal);



export default router;