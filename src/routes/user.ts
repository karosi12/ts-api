import * as express from 'express';
import { userController } from '../controllers/user';

const router = express.Router();

router.post('/users', userController.add);
router.get('/users', userController.list);

export const usersRoute = router;
