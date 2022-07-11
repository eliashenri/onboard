
import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router
  .get("/user", UserController.getAllUsers)
  .get("/user/:id", UserController.GetUser)
  .post("/user", UserController.registerUser)
  .put("/user/:id", UserController.replaceUser)
  .patch("/user/:id", UserController.updateUser)
  .delete("/user/:id", UserController.removeUser)

const routes = (app) => {
    app.use(
      express.json(),
      router,
    )
  }
  
  export default routes