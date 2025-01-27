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
exports.insertUser = insertUser;
exports.getAllUsers = getAllUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const user_1 = require("../model/user");
const hashUtils_1 = require("../utils/hashUtils");
function insertUser(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // Hash the password before saving it
        const hashedPassword = (0, hashUtils_1.hashPassword)(password);
        return yield user_1.User.create({ username, email, password: hashedPassword });
    });
}
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.User.findAll();
    });
}
function updateUser(id, updates) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.User.findByPk(id);
        if (!user)
            throw new Error('User not found');
        if (updates.password) {
            updates.password = (0, hashUtils_1.hashPassword)(updates.password);
        }
        yield user.update(updates);
        return user;
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.User.findByPk(id);
        if (!user)
            throw new Error('User not found');
        return yield user.destroy();
    });
}
