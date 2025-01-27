/*import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


export async function createUsersTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `;
    await pool.query(query);
    console.log("Users table created.");
}


export async function insertUsersTable() {
    const query = `
        INSERT INTO users (username, email, password)
        VALUES ('John', 'john@gmail.com', 'tp123456')
        RETURNING *;
    `;
    const result = await pool.query(query);
    console.log("Values inserted into table:", result.rows[0]);
    return result.rows[0]; // Return inserted user
}


export async function updateUsersTable() {
    const query = `
        UPDATE users
        SET username='ACC'
        WHERE username='Prakhar'
        RETURNING *;
    `;
    const result = await pool.query(query);
    console.log("User updated in table:", result.rows[0]);
    return result.rows[0]; // Return updated user
}


export async function deleteUsersTable() {
    const query = `
        TRUNCATE TABLE users;
    `;
    await pool.query(query);
    console.log("Deleted all users from table");
    return { message: 'Users table truncated' };
}

export async function viewUserTables() {
    const query = `
        SELECT * FROM users;
    `;
    const result = await pool.query(query);
    console.log("Fetched users from table:", result.rows);
    return result.rows; // Return all users
}
*/
import { Sequelize } from 'sequelize';
import { initializeUserModel } from '../model/user';


const sequelize = new Sequelize(
  `postgresql://neondb_owner:vHoBRczk31eE@ep-blue-firefly-a8xsim29.eastus2.azure.neon.tech/neondb?sslmode=require`,
  { dialect: 'postgres' }
);

// Initialize models
initializeUserModel(sequelize);

sequelize
  .authenticate()
  .then(async () => {
    console.log('Database connected successfully');
    await sequelize.sync({ force: true });
    console.log('Models synchronized with the database');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

  export default sequelize;