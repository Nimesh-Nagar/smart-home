import express from 'express';

import {
    createDeviceType,
    getAllDeviceTypes, 
    getDeviceTypeById,
    updateDeviceType, 
    deleteDeviceType
} from '../controllers/deviceTypeControllers.js';

const router = express.Router();

router.route('/').get(getAllDeviceTypes).post(createDeviceType);
router.route('/:id').get(getDeviceTypeById).patch(updateDeviceType).delete(deleteDeviceType);

export default router;