import { currentUser } from "@clerk/nextjs/dist/types/server";


export async function GET(req: Request) {
   const user = await currentUser();

    console.log(user.id);
    console.log(user.emailAddresses);
    console.log(user.firstName);
    console.log(user);
   
}

