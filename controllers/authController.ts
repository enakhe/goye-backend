import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import expressAsyncHandler from "express-async-handler";
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Sign Up
export const signUp = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }] });
        if (existingUser) {
            res.status(400)
            throw new Error('User already exists with provided email.');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({ username: email, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500)
        throw new Error('Server error');
    }
});

// Sign In
export const signIn = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400)
        throw new Error('Invalid email or password');
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(400)
        throw new Error('Invalid email or password');
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({
        message: 'Sign in successful',
        token,
        user: {
            id: user._id,
            username: user.username,
            phone: user.phone,
            email: user.email,
        },
    });
}); 