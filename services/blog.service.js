const { db } = require("../config/firebase");
const { collection, query, orderBy, limit, getDocs, doc, getDoc, startAfter } = require("firebase/firestore");

const getLatestBlog = async () => {
    const docRef = collection(db, "blogs");
    const q = query(docRef, orderBy("createdAt", "desc"), limit(1));
    const snapshot = await getDocs(q);
    
    if(snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
};

const getBlogById = async (blogId) => {
    const docRef = doc(db, "blogs", blogId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data()};
    } else {
        return null;
    }
}

const getNextBlog = async (blogId) =>{
    const currentBlog = await getBlogById(blogId);
    if (!currentBlog) {
        return null;
    }
    const docRef = collection(db, "blogs");
    const q = query(docRef, orderBy("createdAt", "desc"), startAfter(currentBlog.createdAt), limit(1));
    const snapshot = await getDocs(q);
    
    if(snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
}

module.exports = {
    getLatestBlog,
    getBlogById,
    getNextBlog
}