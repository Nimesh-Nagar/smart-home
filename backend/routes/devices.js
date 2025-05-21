import express from 'express';
import {
    createDevice,
    getDeviceById,
    getAllDevices,
    updateDevice,
    deleteDevice

} from '../controllers/deviceControllers.js'; 

const router = express.Router(); 

router.route("/").get(getAllDevices).post(createDevice);
router.route("/:id").get(getDeviceById).patch(updateDevice).delete(deleteDevice);

export default router;
