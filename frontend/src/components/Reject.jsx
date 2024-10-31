
const RejectUser = async (requesterId, userId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/reject`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, requesterId }) // Send both IDs in the request body
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Connection request Rejected:", responseData);
            alert("Connection request rejected!");
        } else {
            const errorData = await response.json();
            console.log("Error accepting connection request:", errorData);
            alert("Failed to reject connection request.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while rejecting the connection request.");
    }
}

export default RejectUser;