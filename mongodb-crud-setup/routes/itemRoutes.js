import express from "express";
const router = express.Router();

import {
  createItem,
  getItem,
  getItemById,
  updateItem,
  getUpdateById,
  deleteItem
} from "../controllers/itemController.js";

router.post("/item", createItem);
router.get("/item", getItem);
router.get("/itemById/:id", getItemById);
router.put("/itemUpdate/:id",updateItem)
// router.put("/justDO/:id",updateNew)
router.put("/justDO/:id",getUpdateById)
router.delete("/justDelete/:id",deleteItem)





export default router;
