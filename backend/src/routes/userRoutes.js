const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth");
const { getUsers, updateProfile, deleteAcc, specificUser, profilePic } = require("../controllers/getUsers");
const {addProject, getProjects, deleteProject, specificProject} = require("../controllers/projectsController");
const matches = require("../controllers/matchedUsers");
const authenticateToken = require("../middlewares/authenticateToken");
const { sendConnRequest, acceptConnRequest, rejectConnRequest, pendingConnRequests, connections } = require("../controllers/connectController");
const {addBlog, getBlog, getBlogs, addLike, addComment, deleteBlog, deleteComment} = require("../controllers/blogsController");

router.post("/signup", signup);                         // signup route
router.post("/login", login);                           // login route
router.get("/allusers", getUsers);                      // route to fetch all users
router.get("/getuser", authenticateToken, specificUser);               // route to fetch specific user
router.put("/updateprofile", authenticateToken, updateProfile);        // route to update user profile
router.get("/getprofile", authenticateToken , profilePic);    // route to fetch profile picture
router.post("/addproject", authenticateToken, addProject);               // route to add projects
router.get("/getprojects", authenticateToken, getProjects);               // route to read projects
router.delete("/:id/deleteproject/:projectId", deleteProject);   // route to delete specific project
router.get("/:userId/projects/:projectId", specificProject)     // route to fetch specific project
router.get("/matchusers", authenticateToken, matches);              // route to match users and calculate the matching score
router.delete("/deleteaccount", authenticateToken, deleteAcc);             // route to delete user account
router.post("/connect", sendConnRequest);               // route to send connection request
router.post("/accept", acceptConnRequest);              // route to accept connection request
router.post("/reject", rejectConnRequest);              // route to reject connection request
router.get("/pendingrequests", authenticateToken, pendingConnRequests)    // route to check pending connection reqs
router.get("/connections", authenticateToken, connections);                // route to fetch connections of user
// router.post("/uploadimage",upload.single('image'), uploadImage);

router.post("/addblog", authenticateToken, addBlog);
router.get("/getblog/:id", getBlog);
router.get("/allblogs", getBlogs);
router.post("/blogs/:id/like", addLike);
router.post("/blogs/:id/comment", addComment);
router.delete("/deleteblog/:id", deleteBlog);
router.delete("/:id/deletecomment/:commentId", deleteComment);
module.exports = router;