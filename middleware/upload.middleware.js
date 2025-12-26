const multer = require("multer");
const storage = multer.memoryStorage();

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2MB limit

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const upload = multer({ 
    storage,
    limits: { fileSize: MAX_FILE_SIZE_BYTES }, // limit file size upload
    fileFilter: (req, file, cb) => {
        // check for allowed mimetype
        if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
            const err = new Error("INVALID_FILE_TYPE");
            err.code = "INVALID_FILE_TYPE";
            return cb(err);
        }
        return cb(null, true);
    }
});

const uploadBlogImage = (req, res, next) => {
  const single = upload.single("image");

  single(req, res, (err) => {
    if (!err) return next();

    // check error if upload larger than file size
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        message: `File too large. Max size is 2MB.`,
      });
    }

    // check error from upload if invalid file type
    if (err.code === "INVALID_FILE_TYPE") {
      return res.status(415).json({
        message: "Invalid file type. Only JPEG, PNG, WEBP allowed.",
      });
    }

    // if fail upload
    return res.status(400).json({
      message: "Upload failed.",
      error: err.message,
    });
  });
};

module.exports = { uploadBlogImage };