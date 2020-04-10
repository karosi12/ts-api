import { Response, Request } from 'express';
import { paginate } from 'paginate-mongoose-data';
import { responsesHelper } from '../utils/responses';
import { IUsers } from '../models/user.interface'
import { Users } from '../models/user'
import { Logger } from '../logger/logger'
const logging = new Logger();
const logger = logging.log('user-service');

class UserController {
  async add(req: Request, res: Response) {
    try {
        const data:IUsers = req.body;
        const user = await Users.create(data);
        logger.info(`user was successfully created ${JSON.stringify(user)}`);
        return res.status(200).send(responsesHelper
        .success(200, user, 'user was successfully created'));
    } catch (error) {
      logger.error(`error occured unable to create a user ${JSON.stringify(error)}`);
      return res.status(500).send(responsesHelper.error(500, `${error}`));
    }
  };
  async list(req: Request, res: Response) {
      try {
       const data =  await paginate(Users);
       logger.info(`${data.message} ${JSON.stringify(data)}`);
       return res.status(200).send(responsesHelper.output(200, data.message, data.data, data.meta));
      } catch (error) {
       logger.error(`error occured unable to list users ${JSON.stringify(error)}`);
      return res.status(500).send(responsesHelper.error(500, `${error}`));
      }
  };
}

export const userController = new UserController();
