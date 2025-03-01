
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../../config/firebaseConfig";
import { currentUser } from "@clerk/nextjs/server";


export async function GET(){
    // const user = await currentUser();
    
    // if (!user) {
    //   return NextResponse.json("Unauthorized", { status: 401 });
    // }

    try {
        const usersRef = collection(db,"users");
        const snapshort = await getDocs(usersRef);

        const users = snapshort.docs.map((doc) => ({
            firstName:doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            profileUrl: doc.data().profileUrl,
            userId: doc.data().userId,
        }));

        return NextResponse.json(users, {status:200})
    }
    catch(error){
        console.error('Error fetching to users',error)
        return NextResponse.json(
            {message: "Failed to fetch users", error:error.message},
            {status:500}
        )
    }
}