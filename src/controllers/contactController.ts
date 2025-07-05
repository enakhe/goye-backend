import { Request, Response } from 'express';
import expressAsyncHandler from "express-async-handler";
import Contact from '../models/Contact';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

interface CreateContactRequestBody {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
    tag: string;
}

// Create a new contact
export const createContact = expressAsyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { name, email, phone, address, notes, tag } = req.body as CreateContactRequestBody;
    const userId = req.user.id;
    const contact = new Contact({ name, email, phone, address, notes, tag, user: userId });
    await contact.save();
    res.status(201).json(contact);
});

// Get all contacts for the authenticated user
export const getContacts = expressAsyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const contacts = await Contact.find({ user: userId });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500)
        throw new Error('Server error');
    }
});

// Get a single contact by ID (must belong to user)
export const getContact = expressAsyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const contact = await Contact.findOne({ _id: req.params.id, user: userId });
        if (!contact) {
            res.status(404)
            throw new Error('Contact not found');
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500)
        throw new Error('Server error');
    }
});

// Update a contact (must belong to user)
export const updateContact = expressAsyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const contact = await Contact.findOneAndUpdate(
            { _id: req.params.id, user: userId },
            req.body,
            { new: true }
        );
        if (!contact) {
            res.status(404)
            throw new Error('Contact not found');
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(500)
        throw new Error('Server error');
    }
});

// Delete a contact (must belong to user)
export const deleteContact = expressAsyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const contact = await Contact.findOneAndDelete({ _id: req.params.id, user: userId });
        if (!contact) {
            res.status(404)
            throw new Error('Contact not found');
        }
        res.status(200).json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500)
        throw new Error('Server error');
    }
});
