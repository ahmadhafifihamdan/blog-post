const { getLatestBlog } = require("../services/blog.service");

const mainPage = async(req, res) => {
    const blog = await getLatestBlog();
    res.render("main", { blog });
}

module.exports = {
    mainPage
}