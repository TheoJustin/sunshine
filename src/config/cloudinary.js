import { Cloudinary } from "@cloudinary/url-gen";

export const cld = new Cloudinary({ cloud: { cloudName: "dau03r7yn" } });

export async function uploadImage(file, onLoading) {
    onLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cdlo4fjr");

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/dau03r7yn/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (response.ok) {
        const data = await response.json();
        onLoading(false);
        return data.secure_url;
    } else {
        onLoading(false);
        throw new Error("Upload failed");
    }
}
