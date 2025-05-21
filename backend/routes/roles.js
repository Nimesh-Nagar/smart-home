import express from 'express';
import {
    createRole,
    getRoleById,
    getAllRoles,
    updateRole,
    deleteRole

} from '../controllers/roleControllers.js'; 

const router = express.Router(); 

router.route("/").get(getAllRoles).post(createRole);
router.route("/:id").get(getRoleById).patch(updateRole).delete(deleteRole);

export default router;
