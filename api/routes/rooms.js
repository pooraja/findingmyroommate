import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/roomctrl.js";
import { verifyAdmin } from "../utils/verifyTokens.js";

const router = express.Router();

// CREATE

router.post("/:appartmentid", verifyAdmin, createRoom);

// UPDATE

router.put("/:id", verifyAdmin, updateRoom);

router.put("availability/:id", updateRoomAvailability);

// DELETE

router.delete("/:id/appartmentid", verifyAdmin, deleteRoom);

// GET

router.get("/:id", getRoom);

// GETALL

router.get("/", getRooms);

export default router;
