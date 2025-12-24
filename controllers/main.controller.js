const { getLatestBlog, getBlogById, getNextBlog } = require("../services/blog.service");

const mainPage = async(req, res) => {    
    let blog;

    if (req.cookies.current_blog_id) {
        blog = await getBlogById(req.cookies.current_blog_id);
    } else {
        blog = await getLatestBlog();
        if (blog) {
            res.cookie("current_blog_id", blog.id)
        }
    }
    res.render("main", { blog });
}

const nextBlog = async(req, res) => {
    let blog;
    
    blog = await getNextBlog(req.cookies.current_blog_id); 
    if (!blog) {
        blog = await getLatestBlog();
    }

    if (blog) {
        res.cookie("current_blog_id", blog.id)
    }
    return res.redirect("/main");
}

module.exports = {
    mainPage,
    nextBlog
}