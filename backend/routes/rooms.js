import express from 'express';
import {
    createRoom,
    getRoomById,
    getAllRooms,
    updateRoom,
    deleteRoom

} from '../controllers/roomControllers.js'; 

const router = express.Router(); 

router.route("/").get(getAllRooms).post(createRoom);
router.route("/:id").get(getRoomById).patch(updateRoom).delete(deleteRoom);

export default router;
