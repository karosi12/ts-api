import * as express from 'express';
import { userController } from '../controllers/user';

const router = express.Router();

router.post('/users', userController.add);

export const usersRoute = router;
