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
Object.defineProperty(exports, "__esModule", { value: true });
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
const sequelize_1 = require("sequelize");
const user_1 = require("../model/user");
const sequelize = new sequelize_1.Sequelize(`postgresql://neondb_owner:vHoBRczk31eE@ep-blue-firefly-a8xsim29.eastus2.azure.neon.tech/neondb?sslmode=require`, { dialect: 'postgres' });
// Initialize models
(0, user_1.initializeUserModel)(sequelize);
sequelize
    .authenticate()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database connected successfully');
    yield sequelize.sync({ force: true });
    console.log('Models synchronized with the database');
}))
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
exports.default = sequelize;
