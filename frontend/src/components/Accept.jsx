import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AcceptUser = async (requesterId, userId) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/accept`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, requesterId }) // Send both IDs in the request body
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Connection request Accepted:", responseData);
            // alert("Connection request accepted successfully!");
            toast.success('Connection request accepted!', { position: 'top-center' });
        } else {
            const errorData = await response.json();
            console.log("Error accepting connection request:", errorData);
            toast.error(`Error accepting connection request: ${errorData.message}`, { position: 'top-center' });
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while accepting the connection request.");
    }
}

export default AcceptUser;