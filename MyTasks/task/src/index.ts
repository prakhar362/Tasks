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
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db'; // Assuming this is your MongoDB connection logic
const router = require('./routes/index'); // Main router file

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Base route for your API
app.use('/api/v1', router);

const PORT = process.env.PORT || 8000;

async function main() {
  try {
    
    await sequelize.authenticate();
    console.log('Connected to NEON CONSOLE');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the DB connection fails
  }
}

main();
