
import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db'; 
const router = require('./routes/index'); 


dotenv.config();

const app = express();


app.use(express.json());

// Base route for  API
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
    process.exit(1); 
  }
}

main();
