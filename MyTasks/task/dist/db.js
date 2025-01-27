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
exports.createUsersTable = createUsersTable;
exports.insertUsersTable = insertUsersTable;
exports.updateUsersTable = updateUsersTable;
exports.deleteUsersTable = deleteUsersTable;
exports.viewUserTables = viewUserTables;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `;
        yield pool.query(query);
        console.log("Users table created.");
    });
}
function insertUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        INSERT INTO users (username, email, password)
        VALUES ('John', 'john@gmail.com', 'tp123456')
        RETURNING *;
    `;
        const result = yield pool.query(query);
        console.log("Values inserted into table:", result.rows[0]);
        return result.rows[0]; // Return inserted user
    });
}
function updateUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        UPDATE users
        SET username='ACC'
        WHERE username='Prakhar'
        RETURNING *;
    `;
        const result = yield pool.query(query);
        console.log("User updated in table:", result.rows[0]);
        return result.rows[0]; // Return updated user
    });
}
function deleteUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        TRUNCATE TABLE users;
    `;
        yield pool.query(query);
        console.log("Deleted all users from table");
        return { message: 'Users table truncated' };
    });
}
function viewUserTables() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        SELECT * FROM users;
    `;
        const result = yield pool.query(query);
        console.log("Fetched users from table:", result.rows);
        return result.rows; // Return all users
    });
}
