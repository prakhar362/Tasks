"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createUsersTable, updateUsersTable, insertUsersTable, deleteUsersTable,viewUserTables } from './db';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;


app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

// CRUD Routes

app.post('/insert', async (req: Request, res: Response) => {
    try {
      const user = await insertUsersTable();
      res.status(201).json({ message: 'User inserted successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting user");
    }
});


app.get('/view', async (req: Request, res: Response) => {
    try {
        const user = await viewUserTables();
        res.status(200).json({message: 'User present',user});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
});


app.put('/update', async (req: Request, res: Response) => {
    try {
        await updateUsersTable();
        res.status(200).send("User updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    }
});


app.delete('/delete', async (req: Request, res: Response) => {
    try {
        await deleteUsersTable();
        res.status(200).send("All users deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting users");
    }
});

// Start server after database setup
createUsersTable()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error setting up database:", err);
        process.exit(1);
    });
*/
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db")); // Assuming this is your MongoDB connection logic
const router = require('./routes/index'); // Main router file
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Base route for your API
app.use('/api/v1', router);
const PORT = process.env.PORT || 8000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.default.authenticate();
            console.log('Connected to NEON CONSOLE');
            // Start the server
            app.listen(PORT, () => {
                console.log(`Server running at http://localhost:${PORT}`);
            });
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error.message);
            process.exit(1); // Exit the process if the DB connection fails
        }
    });
}
main();
