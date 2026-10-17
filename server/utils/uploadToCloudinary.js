import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadToCloudinary = async (buffer, folder="general") => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_large_stream(
            {folder},
            (error, result) => {
                if (result) resolve(result.secure_url);
                else reject(error);
            }
        )
        streamifier.createReadStream(buffer).pipe(stream);
    })
}