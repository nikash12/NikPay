import { z } from "zod"; 

const MerchantSignUpSchema = z.object({
    email: z.email("Invalid Email"),
    number: z.string("Phone must be at least 10 digits").min(10).max(15),
    business_name: z.string("Business Name must have at least 2 characters").min(2).max(100),
    category: z.string().optional(),
    business_address: z.string().optional(),
    gst_number: z.string().optional(),
    pan_number: z.string().optional()
})

export type MerchantSignUpType = {
  email: string;
  number: string;
  business_name: string;
  category?: string;
  business_address?: string;
  gst_number?: string;
  pan_number?: string;
};

export { MerchantSignUpSchema };
