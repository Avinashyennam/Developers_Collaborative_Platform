const User = require("../models/user");

// route to add a project
const addProject = async (req, res) => {
    try {
        // const { id } = req.params;
        const id = req.user._id;
        const { title, description, githubLink } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            {
                $push: {
                    projects: { title, description, githubLink }
                }
            },
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        res.status(200).json({ message: "Projects added successfully", projects: user.projects });
    } catch (error) {
        console.log("Error while adding project", error);
        res.status(500).json({ message: "Internal server error at adding projects" });
    }
}

// route to read the available projects
const getProjects = async (req, res) => {
    try {
        // const { id } = req.params;
        const id = req.user._id;
        const user = await User.findById(id, "projects");

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({ projects: user.projects });
        // res.status(200).json({ projects: [...user.projects].reverse() });
    } catch (error) {
        console.log("Error while reading projects", error);
        res.status(500).json({ message: "Internal server error at reading projects" });
    }
}

// route to delete a project
const deleteProject = async (req, res) => {
    try {
        const { id, projectId } = req.params;
        // Find the user and remove the project from the projects array
        const user = await User.findByIdAndUpdate(
            id,
            { $pull: { projects: { _id: projectId } } },  // Remove project by its _id
            { new: true }  // Return the updated user document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'Project deleted successfully',
            updatedProjects: user.projects
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// route to read a specific project
const specificProject = async (req, res) => {
    try {
        const { userId, projectId } = req.params;

        // check the user by userId
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const project = user.projects.id(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json({
            message: 'Project found successfully',
            project
        });
    } catch (error) {
        console.log("Error while reading project", error);
        res.status(500).json({ message: "Internal server error at reading project" });
    }
}

module.exports = { addProject, getProjects, deleteProject, specificProject };