const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const authenticateToken = require("./middlewares/authenticateToken.js");
const user = require("./routes/userRoutes.js");
const mongouri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5001;

const corsOption = {
    origin: "http://localhost:5173",
    methods: "GET, PUT, POST, DELETE, HEAD, PATCH",
    credentials: true
}
app.use(cors(corsOption));

const multer = require('multer');
const cloudinary = require('./cloudinaryConfig');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fs = require('fs');
const User = require("./models/user.js");
// const uploadImage = require("./controllers/imageUpload.js");

app.use(express.json());
mongoose.connect(mongouri)
    .then(() => {
        console.log("db successfully connected");
    })
    .catch((error) => {
        console.log("failed to connect to db", error);
    });

app.get("/", (req, res) => {
    res.send("Hi");
});

// Multer setup to store files temporarily
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder for temporary storage
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // File naming convention
    }
});

// Multer middleware to handle file uploads
const upload = multer({ storage: storage });
app.post('/upload', authenticateToken, upload.single('image'), (req, res) => {
    const filePath = req.file.path; // Get file path after multer stores it
    const id = req.user._id;
    // Upload image to Cloudinary
    cloudinary.uploader.upload(filePath, { folder: 'uploads' }, async (error, result) => {
        if (error) {
            return res.status(500).json({ message: 'Cloudinary upload failed', error });
        }

        // Delete the temporary file after upload
        fs.unlinkSync(filePath);

        try {
            // Find the user by userId and update their profilePicture with the Cloudinary URL
            const user = await User.findByIdAndUpdate(
                id,                          // Find user by userId
                { profilePicture: result.secure_url },  // Update profilePicture field with Cloudinary URL
                { new: true }                    // Return the updated document
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await user.save();
            res.status(200).json({ message: 'Profile picture updated successfully', user });
        } catch (err) {
            res.status(500).json({ message: 'Failed to update profile picture', err });
        }
    });
});


app.use("/api/users", user);
app.listen(PORT, () => {
    console.log("server is running on port", PORT); // Fixed here
});
