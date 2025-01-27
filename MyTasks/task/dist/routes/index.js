"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('Welcome to Express & TypeScript Server');
});
// CRUD Routes
router.post('/insert', userController_1.insertController);
router.get('/view', userController_1.viewController);
router.put('/update/:id', userController_1.updateController);
router.delete('/delete/:id', userController_1.deleteController);
module.exports = router;
