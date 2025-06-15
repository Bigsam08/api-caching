/**
 * routes to handle all api endpoints
 */

const express = require("express");
const router = express.Router();
const { getAllusers, getUser } = require('../controllers/userController')

/** retrieve all users from the database */
router.get("/users", getAllusers);

/** fetch a specific user  */
router.get("/users/:id", getUser);

module.exports = router;