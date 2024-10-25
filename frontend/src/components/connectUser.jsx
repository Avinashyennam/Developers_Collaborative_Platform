import { useContext } from "react";
import { DevContext } from "../context/Context";
const connectUser = async (recipientId, requesterId) => {
    // const requesterId = id; // Assuming you store user ID in local storage

    try {
        const response = await fetch(`http://localhost:5000/api/users/connect`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ requesterId, recipientId }) // Send both IDs in the request body
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Connection request sent:", responseData);
            alert("Connection request sent successfully!");
        } else {
            const errorData = await response.json();
            console.log("Error sending connection request:", errorData);
            alert("Failed to send connection request.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while sending the connection request.");
    }
};

export default connectUser;