import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            // alert("Connection request rejected!");
            toast.success('Connection request rejected!', { position: 'top-center' });
        } else {
            const errorData = await response.json();
            console.log("Error accepting connection request:", errorData);
            // alert("Failed to reject connection request.");
            toast.error(`Error rejecting connection request: ${errorData.message}`, { position: 'top-center' });
        }
    } catch (error) {
        console.error("Error:", error);
        // alert("An error occurred while rejecting the connection request.");
        toast.error(`Error rejecting connection request: ${error.message}`, { position: 'top-center' });
    }
}

export default RejectUser;