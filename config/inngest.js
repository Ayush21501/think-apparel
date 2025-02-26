import { Inngest } from "inngest";

export const inngest = new Inngest({id:"think-apparel"})

// Inngest Function to save user data to a daatbase
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created'
    },
    async ({event}) => {
        const {id, first_name,last_name,email_addresses,image_url} = event.data
        const userData = {
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name + ' ' + last_name,
            image_url: image_url
        }
    } 
)