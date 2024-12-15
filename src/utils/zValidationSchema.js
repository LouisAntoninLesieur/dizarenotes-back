import { z } from 'zod';

export const zValidationSchema = z.object({
  userName: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email('Invalid email address'),
  password: z.string(8, { message: "Password must be at least 8 characters long" }),
});