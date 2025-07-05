import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

import { errorHandler } from './middleware/errorMiddleware';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import contactsRoutes from './routes/contacts';

const app: Application = express();
const envPort = process.env.PORT || '3000';
const port: number = parseInt(envPort, 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register auth routes
app.use('/api/auth', authRoutes);
// Register contacts routes
app.use('/api/contacts', contactsRoutes);

// **Error handler middleware
app.use(errorHandler);

// **Ensure database connection before starting the server**
const startServer = async () => {
    try {
        await connectDB(); // Wait for DB connection to establish
        console.log(colors.red.underline("Connected to database."));

        const server = app.listen(port, '0.0.0.0', () => {
            console.log(`Server running on http://0.0.0.0:${port}`);
        });

    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
};

startServer();

export default app;