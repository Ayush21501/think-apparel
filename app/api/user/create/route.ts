import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "../../../../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  // Extract the first email as a string
  const userEmail = user.emailAddresses?.[0]?.emailAddress || "";

  const userRef = doc(db, "users", user.id);

  const data = await setDoc(userRef, {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: userEmail,
    profileUrl: user.imageUrl,
    role: "ADMIN",
  });
  

  return Response.json(
    { message: "User created in Firestore" },
    { status: 200 },

  );
}
