const { db } = require("../config/firebase");
const { collection, query, orderBy, limit, getDocs } = require("firebase/firestore");

const getLatestBlog = async () => {
    const docRef = collection(db, "blogs");
    const q = query(docRef, orderBy("createdAt", "desc"), limit(1));
    const snapshot = await getDocs(q);
    
    if(snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
};

module.exports = {
    getLatestBlog
}