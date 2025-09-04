import express from 'express';
import { createBooking, deleteBooking, getBookedData } from '../controller/booking.controller.js';


const router = express.Router();

router.post("/create", createBooking);
router.get("/", getBookedData);
router.delete("/delete/:id", deleteBooking);


export default router;