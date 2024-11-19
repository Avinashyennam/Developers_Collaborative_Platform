import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            // alert("Connection request sent successfully!");
            toast.success('Connection request sent!', { position: 'top-center' });
        } else {
            const errorData = await response.json();
            console.log("Error sending connection request:", errorData);
            // alert("Failed to send connection request.");
            toast.error(`Failed to send connection request.: ${errorData.message}`, { position: 'top-center' });
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error(`Failed to send connection request.: ${error.message}`, { position: 'top-center' });
    }
};

export default connectUser;