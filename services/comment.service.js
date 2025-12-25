const { db } = require("../config/firebase");
const { collection, addDoc, serverTimestamp, doc, updateDoc, arrayUnion } = require("firebase/firestore");

const createCommentAndAttachToBlog = async(blogId, commentText, userEmail) => {
    const colRef = collection(db, "comments");
    
    // Adding comment and identify comment from docRef.id
    const docRef = await addDoc(colRef, {
        blogId: blogId,
        commentText: commentText,
        userEmail: userEmail,
        createdAt: serverTimestamp()
    });

    // current blog to attach comment to
    const blogRef = doc(db, "blogs", blogId);
    await updateDoc(blogRef, {
        commentIds: arrayUnion(docRef.id)
    })
}

module.exports = {
    createCommentAndAttachToBlog
}
