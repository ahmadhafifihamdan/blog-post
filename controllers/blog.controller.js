const getBlogForm = (req, res) => {
    return res.render("blog-creation");
}

const createBlogHandler = async (req, res) => {
    const hasImage = Boolean(req.file);
    return true;
};


module.exports = {
    getBlogForm,
    createBlogHandler
}