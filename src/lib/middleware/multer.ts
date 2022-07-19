import multer from "multer";
import mime from "mime";
import { randomUUID } from "node:crypto";
import { request } from "node:http";

export const generatePhotoFilename = (mimetype: string) => {
    const randomFilename = `${randomUUID()}-${Date.now()}`;
    const fileExtensions = mime.getExtension(mimetype);
    const filename = `${randomFilename}.${fileExtensions}`;

    return filename;
};

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (request, file, callback) => {
        return callback(null, generatePhotoFilename(file.mimetype));
    },
});

export const multerOptions = {};

export const initMulterMiddleware = () => {
    return multer({ storage, ...multerOptions });
};

