import * as express from 'express';
import { userController } from '../controllers/user';
import { authenticate } from '../middlewares/authenticate'

const router = express.Router();

router.post('/users', userController.create);
router.post('/login', userController.login);
router.get('/users', userController.list);
router.get('/users', authenticate, userController.view);

export const usersRoute = router;
