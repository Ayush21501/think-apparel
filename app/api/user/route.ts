
import { collection, getCountFromServer, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/firebaseConfig";
import { currentUser } from "@clerk/nextjs/server";
import { isAdmin } from "../../../utils/server/serverUtils";

export async function GET(req : NextRequest){
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    if(!isAdmin(user.id)) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    try {
        const usersRef = collection(db,"users");

        const totalUserCount = (await getCountFromServer(usersRef)).data().count;

        const currentPage = parseInt(req.nextUrl.searchParams.get("page")|| "1");
        const itemPerPage = 2;

        const startIndex = (currentPage - 1) * itemPerPage;

          // Query users with pagination
        let userQuery = query(usersRef, orderBy("userId"), limit(itemPerPage));


        // Get previous page's last document to start the new query
        if (startIndex > 0) {
            const previousDocs = await getDocs(query(usersRef, orderBy("userId"), limit(startIndex)));
            const lastDoc = previousDocs.docs[previousDocs.docs.length - 1];
            if (lastDoc) {
                userQuery = query(usersRef, orderBy("userId"), startAfter(lastDoc), limit(itemPerPage));
            }
        }

        const snapshort = await getDocs(userQuery);

        const users = snapshort.docs.map((doc) => ({
            firstName:doc.data().firstName,
            lastName: doc.data().lastName,
            email: doc.data().email,
            profileUrl: doc.data().profileUrl,
            userId: doc.data().userId,
        }));

        return NextResponse.json({data:{
            totalUserCount : totalUserCount,
            totalPages: Math.ceil(totalUserCount/itemPerPage),
            currentPage: currentPage,
            users: users,
        }}, {status:200})
    }
    catch(error){
        console.error('Error fetching to users',error)
        return NextResponse.json(
            {message: "Failed to fetch users", error:error.message},
            {status:500}
        )
    }
}