import express, { Application, Request, Response } from 'express';
import {insertController,viewController,updateController,deleteController} from '../controller/userController';
const router=express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

// CRUD Routes

router.post('/insert',insertController);

router.get('/view',viewController);

router.put('/update/:id',updateController);

router.delete('/delete/:id',deleteController);

module.exports=router;
