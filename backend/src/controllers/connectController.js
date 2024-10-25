const User = require("../models/user");
const Match = require("../models/matches");

// route for sending connection request
const sendConnRequest = async (req, res) => {
    try {
        const { requesterId, recipientId } = req.body;
        if (!requesterId || !recipientId) {
            return res.status(400).json({ message: "both user id's are required" });
        }

        const requester = await User.findById(requesterId);
        const recipient = await User.findById(recipientId);
        if (!requester || !recipient) {
            return res.status(404).json({ message: "user not found" });
        }

        // Check if the recipient already has a pending request from this user
        const alreadyRequested = recipient.pendingConnections.some(
            (conn) => conn.from.toString() === requesterId
        );
        if (alreadyRequested) {
            return res.status(400).json({ message: "Connection request already sent" })
        }

        // Add the connection request to the recipient's pendingConnections
        recipient.pendingConnections.push({ from: requesterId });
        await recipient.save();

        res.status(200).json({ message: 'Connection request sent successfully' });
    }
    catch (error) {
        console.log("error at sending connection", error);
        res.status(500).json({ message: "internal server error at sending connection" });
    }
}

// route for accepting connection request
const acceptConnRequest = async (req, res) => {
    try {
        const { userId, requesterId } = req.body;

        // check if userId and requesterId existing or not
        if (!userId || !requesterId) {
            return res.status(400).json({ message: "both user id's are required" });
        }

        const user = await User.findById(userId);
        const requester = await User.findById(requesterId);
        // check if both users exist or not
        if (!user || !requester) {
            return res.status(404).json({ message: "user not found" });
        }

        // Check if there is a pending request from the requester
        const requestIndex = user.pendingConnections.findIndex(
            (conn) => conn.from.toString() === requesterId
        );
        // if there is no pending request to user then go back
        if (requestIndex === -1) {
            return res.status(400).json({ message: "No pending connection request found" });
        }

        // Remove the pending request
        user.pendingConnections.splice(requestIndex, 1);

        // Add to each other's connection array
        user.connections.push(requesterId);
        requester.connections.push(userId);

        // save both users
        await user.save();
        await requester.save();

        const match = new Match({
            user1: userId,
            user2: requesterId
        });
        await match.save();

        res.status(200).json({ message: "Connection accepted successfully and match created" });
    }
    catch (error) {
        console.log("error at accepting connection", error);
        res.status(500).json({ message: "internal server error at accepting connection" });
    }
}

// route for rejecting connection request
const rejectConnRequest = async (req, res) => {
    try {
        const { userId, requesterId } = req.body;
        const user = await User.findById(userId);

        // check if user exist or not
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // Find the index of the request from the requester
        const requestIndex = user.pendingConnections.findIndex(
            (conn) => conn.from.toString() === requesterId
        );

        // check if there exist pending connection request or not
        if (requestIndex === -1) {
            return res.status(400).json({ message: "No pending connection request found" });
        }

        // Remove the pending connection request from the pendingConnections array
        user.pendingConnections.splice(requestIndex, 1);

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "Connection request rejected successfully" });
    } catch (error) {
        console.log("error at rejecting connection", error);
        res.status(500).json({ message: "internal server error at rejecting connection" });
    }
}

// route for checking pending connection requests from users
const pendingConnRequests = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID and populate the details of the users who sent the requests
        let user = await User.findById(id).populate({
            path: 'pendingConnections.from',          // Populate 'from' field with User details
            select: 'name email skills'               // Select specific fields to return (optional)
        })

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // Send the list of pending connection requests
        res.json(user.pendingConnections);
    } catch (error) {
        console.log("error at pending connections", error);
        res.status(500).json({ message: "internal server error at pending connections" });
    }
}

// route for retriving connections of a user
const connections = async (req, res) =>{
    try {
        const {id} = req.params;

        let user = await User.findById(id).populate({
            path: 'connections',
            select: 'name email skills'
        });

        if(!user){
            return res.status(404).json({message: "user not found"});
        }

        res.json(user.connections);
    } catch (error) {
        console.log("error while fetching users");
        res.status(500).json({message: "internal server error while fetching users"});
    }
}

module.exports = { sendConnRequest, acceptConnRequest, rejectConnRequest, pendingConnRequests, connections }
