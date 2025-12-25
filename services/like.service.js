const { db } = require("../config/firebase");
const { setDoc, serverTimestamp, doc } = require("firebase/firestore");

const toggleLike = async(blogId, userEmail) => {
    const likeId = `${blogId}_${userEmail}`;
    const likeDocRef = doc(db, "likes", likeId);
    const snapshot = await getDoc(likeDocRef);
    if (snapshot.exists()) {
        await deleteDoc(likeDocRef);
        return { liked: false }
    } else {
        await setDoc(likeDocRef, { 
            likeId,
            blogId,
            userEmail: userEmail,
            createdAt: serverTimestamp()
        });
        return { liked: true}
    }
}




module.exports = {
    toggleLike
}