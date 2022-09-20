import express from "express";
import {
  countByType,
  countByCity,
  createAppartment,
  deleteAppartment,
  getAppartmentRooms,
  getAppartment,
  getAppartments,
  updateAppartment,
} from "../controllers/appartmentctrl.js";
import { verifyAdmin } from "../utils/verifyTokens.js";

const router = express.Router();

// CREATE

router.post("/", verifyAdmin, createAppartment);

// UPDATE

router.put("/:id", verifyAdmin, updateAppartment);

// DELETE

router.delete("/:id", verifyAdmin, deleteAppartment);

// GET

router.get("/find/:id", getAppartment);

// GETALL

router.get("/", getAppartments);

router.get("/countByCity", countByCity);

router.get("/countByType", countByType);

router.get("/room/:id", getAppartmentRooms);

export default router;
