import User from "../models/user.model.js";

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Get public profile
export const getPublicProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("name profilePicture role createdAt");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const { name, phone, address, removeProfilePicture } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // image handling
        


        user.name = name || user.name;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        if (removeProfilePicture) {
            user.profilePicture = null;
        }
        await user.save();
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}