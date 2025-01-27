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
exports.insertController = insertController;
exports.viewController = viewController;
exports.updateController = updateController;
exports.deleteController = deleteController;
const userService_1 = require("../services/userService");
const redis_1 = require("../config/redis");
function insertController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password } = req.body;
            const user = yield (0, userService_1.insertUser)(username, email, password);
            // Get the Redis client
            const client = yield (0, redis_1.runRedisOperations)();
            // Cache the new user data in Redis
            yield client.set(`user:${username}`, JSON.stringify(user), { EX: 3600 }); // Cache expires in 1 hour
            res.status(201).json(user);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function viewController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userService_1.getAllUsers)();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function updateController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.id);
            const updatedData = req.body;
            const username = req.body.username;
            // Update user data in the database
            const user = yield (0, userService_1.updateUser)(userId, updatedData);
            // Get the Redis client
            const client = yield (0, redis_1.runRedisOperations)();
            // Update the Redis cache with the same user data
            yield client.set(`user:${username}`, JSON.stringify(user), { EX: 3600 }); // Cache expires in 1 hour
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function deleteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.id);
            // Get the user from the database to retrieve the username
            const user = yield (0, userService_1.getAllUsers)(); // You may need to fetch the user by id instead of getting all users
            const username = req.body.username; // Assuming user is fetched from the database
            // Get the Redis client
            const client = yield (0, redis_1.runRedisOperations)();
            // Delete the corresponding cache from Redis
            yield client.del(`user:${username}`);
            // Delete the user from the database
            yield (0, userService_1.deleteUser)(userId);
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
