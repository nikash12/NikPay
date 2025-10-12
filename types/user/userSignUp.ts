import { z } from "zod"; 

const UserSignUpSchema = z.object({
    email: z.email("Invalid Email"),
    number: z.string("Phone must be at least 10 digits").min(10).max(15),
    name: z.string("Name must have at least 2 characters").min(4).max(100),
})

export type UserSignUpType = z.infer<typeof UserSignUpSchema>;
export { UserSignUpSchema };
