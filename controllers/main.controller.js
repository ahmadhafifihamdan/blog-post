const { getLatestBlog, getBlogById, getNextBlog } = require("../services/blog.service");
const { getCommentsByIds } = require("../services/comment.service");

const mainPage = async(req, res) => {    
    let blog, comments, commentIds = [];

    if (req.cookies.current_blog_id) {
        blog = await getBlogById(req.cookies.current_blog_id);
    } else {
        blog = await getLatestBlog();
        if (blog) {
            res.cookie("current_blog_id", blog.id)
        }
    }
    
    if (blog.commentIds) {
        commentIds = blog.commentIds;
    }

    comments = await getCommentsByIds(commentIds);

    res.render("blogs", { blog, comments });
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
    return res.redirect("/blogs");
}

module.exports = {
    mainPage,
    nextBlog
}