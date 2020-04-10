import { Response, Request } from 'express';
import { paginate } from 'paginate-mongoose-data';
import { responsesHelper } from '../utils/responses';
import { IUsers } from '../models/user.interface'
import { Users } from '../models/user'
import { Logger } from '../logger/logger'
const logging = new Logger();
const logger = logging.log('user-service');

class UserController {
  /**
   * create
   * @desc users should be able to create a new account
   * Route: POST: '/api/v1/users'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object} object
   */
  async create(req: Request, res: Response) {
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

  /**
   * list
   * @desc authenticated users should be able to get list of users
   * Route: GET: '/api/v1/users'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object} object
   */
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
