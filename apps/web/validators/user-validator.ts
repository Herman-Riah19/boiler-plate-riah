import z from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignupSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().min(1, "Address must be at least 10 characters"),
});

export const ForgotValidator = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
})

export const EditUserValidator = z.object({
    name: z.string().min(1, 'Username is required').min(4, 'Username must have than 5 characters').max(100),
})

export const PasswordValidator = z.object({
    password: z.string().min(1, 'Passord is required').min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Passord is required').min(8, 'Password must have than 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password do not match"
})