import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/userctrl.js";
import { verifyAdmin, verifyUser } from "../utils/verifyTokens.js";

const router = express.Router();

// UPDATE

router.put("/:id", verifyUser, updateUser);

// DELETE

router.delete("/:id", verifyUser, deleteUser);

// GET

router.get("/:id", verifyUser, getUser);

// GETALL

router.get("/", verifyAdmin, getUsers);

export default router;
