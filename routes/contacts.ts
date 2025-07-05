import { Router } from 'express';
import {
    createContact,
    getContacts,
    getContact,
    updateContact,
    deleteContact
} from '../controllers/contactController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// All routes are protected
router.use(protect);

// Create a contact
router.post('/', createContact);

// Get all contacts
router.get('/', getContacts);

// Get a single contact
router.get('/:id', getContact);

// Update a contact
router.put('/:id', updateContact);

// Delete a contact
router.delete('/:id', deleteContact);

export default router;
