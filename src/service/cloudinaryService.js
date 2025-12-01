import axios from "axios";

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadInvoiceThumbnail = async (imageData) => {
    if (!CLOUDINARY_UPLOAD_URL || !CLOUDINARY_UPLOAD_PRESET) {
        throw new Error("Cloudinary environment variables are not configured");
    }

    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(
        CLOUDINARY_UPLOAD_URL,
        formData
    );

    return res.data.secure_url;
};