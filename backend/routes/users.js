import express from 'express';
import {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser

} from '../controllers/userControllers.js'; 

const router = express.Router(); 

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
