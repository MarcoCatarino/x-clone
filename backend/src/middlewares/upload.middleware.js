//* Multer = Middleware for handling multipart/form-data [specialy used for file upload]

import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, res, cb) => {
  if (file.mimetype.startWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB Limit
});

export default upload;
