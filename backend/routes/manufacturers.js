import express from 'express';
import {
    createManufacturer,
    getManufacturerById,
    getAllManufacturers,
    updateManufacturer,
    deleteManufacturer

} from '../controllers/manufacturerControllers.js'; 

const router = express.Router(); 

router.route("/").get(getAllManufacturers).post(createManufacturer)
router.route("/:id").get(getManufacturerById).patch(updateManufacturer).delete(deleteManufacturer)

export default router;
