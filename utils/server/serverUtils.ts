import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export const isAdmin = async (userId:string) => {
     const userRef = doc(db,"users", userId);
     const snapshot = await getDoc(userRef);

     if(snapshot.exists()){
        return snapshot.data().role === "ADMIN";
     }
    
} 