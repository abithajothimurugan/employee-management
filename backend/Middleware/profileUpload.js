const multer = require('multer');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('uploads/profile')) {
    fs.mkdirSync('uploads/profile', { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedType = /jpeg|jpg|png|webp/;
    const extname = allowedType.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedType.test(file.mimetype);

    if (extname && mimeType) cb(null, true);
    else cb(new Error('Only JPEG, JPG, PNG , WEBP images are allowed'));
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;
