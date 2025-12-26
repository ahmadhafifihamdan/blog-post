const { uploadBlogImageToStorage } = require("../services/storage.service");

const getBlogForm = (req, res) => {
    return res.render("blog-creation");
}

const createBlogHandler = async (req, res) => {
    let imageUrl = '';
    let storagePath = '';

    if (req.file) {
        try {
            const result = await uploadBlogImageToStorage(req.file);
            imageUrl = result.imageUrl;
            storagePath = result.storagePath;
        } catch (err) {
            return res.status(500).json({ message: "Image upload failed" });
        }
    }
    return res.json({ imageUrl, storagePath  });
}


module.exports = {
    getBlogForm,
    createBlogHandler
}