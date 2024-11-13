const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth");
const { getUsers, updateProfile, deleteAcc, specificUser, profilePic } = require("../controllers/getUsers");
const {addProject, getProjects, deleteProject, specificProject} = require("../controllers/projectsController");
const matches = require("../controllers/matchedUsers");
const authenticateToken = require("../middlewares/authenticateToken");
// const uploadImage = require("../controllers/imageUpload");
const { sendConnRequest, acceptConnRequest, rejectConnRequest, pendingConnRequests, connections } = require("../controllers/connectController");

router.post("/signup", signup);                         // signup route
router.post("/login", login);                           // login route
router.get("/allusers", getUsers);                      // route to fetch all users
router.get("/getuser/:id", specificUser);               // route to fetch specific user
router.put("/updateprofile/:id", updateProfile);        // route to update user profile
router.get("/getprofile", authenticateToken , profilePic);              // route to fetch profile picture
router.post("/:id/projects", addProject);               // route to add projects
router.get("/:id/projects", getProjects);               // route to read projects
router.delete("/:id/projects/:projectId", deleteProject);   // route to delete specific project
router.get("/:userId/projects/:projectId", specificProject)     // route to fetch specific project
router.get("/matchusers/:id", matches);              // route to match users and calculate the matching score
router.delete("/deleteaccount/:id", deleteAcc);             // route to delete user account
router.post("/connect", sendConnRequest);               // route to send connection request
router.post("/accept", acceptConnRequest);              // route to accept connection request
router.post("/reject", rejectConnRequest);              // route to reject connection request
router.get("/pendingrequests/:id", pendingConnRequests)    // route to check pending connection reqs
router.get("/connections/:id", connections);                // route to fetch connections of user
// router.post("/uploadimage",upload.single('image'), uploadImage);
module.exports = router;