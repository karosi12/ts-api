import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';
import { IRequest } from '../models/user.interface';
import { paginate } from 'paginate-mongoose-data';
import { responsesHelper } from '../utils/responses';
import { IUsers } from '../models/user.interface'
import { Users } from '../models/user'
import { Logger } from '../logger/logger'
import { Config } from '../config/config'
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
      const salt: String =  bcrypt.genSaltSync(10);
      const hash: String = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash
      const data:IUsers = req.body;
      const user = await Users.create(data);
      logger.info(`user was successfully created ${JSON.stringify(user)}`);
      return res.status(201).send(responsesHelper
      .success(201, user, 'user was successfully created'));
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

    /**
   * view
   * @desc authenticated user should be able to get his/her details
   * Route: GET: '/api/v1/users'
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Object} object
   */
  async view(req: IRequest, res: Response) {
    try {
      const {id} = req.params;
      const user = await Users.findById(id);
      if(!user) return res.status(400).send(responsesHelper.error(400, 'unable to user'));
      return res.status(200).send(responsesHelper
        .success(200, user, 'user was successfully created'));
    } catch (error) {
     logger.error(`error occured unable to list users ${JSON.stringify(error)}`);
     return res.status(500).send(responsesHelper.error(500, `${error}`));
    }
  };
  async login(req: Request, res: Response) {
    try {
      const config = new Config().JwtCredentials();
      const JWT_SECRET = config.JWT_SECRET;
      const TOKEN_EXPIRES_IN = config.TOKEN_EXPIRES_IN;
      const email = req.body.email;
      if(!req.body.email) return res.status(400).send(responsesHelper.error(400,'Email is required'));
      if(!req.body.password) return res.status(400).send(responsesHelper.error(400,'Password is required'));
      const user = await Users.findOne({email})
      if(!user) return res.status(400).send(responsesHelper.error(400,'Wrong email'));
      const match = bcrypt.compareSync(req.body.password, user.password)
      if (!match) return res.status(400).send(responsesHelper.error(400, 'Wrong password'));
      const jwtPayload = {id: user._id, email: user.email};
      const token = await JWT.sign(jwtPayload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
      return res.status(200).send(responsesHelper.success(200, {user, token},'User signed in successfully'));
    } catch (error) {
      logger.error(`error to login user ${JSON.stringify(error)}`);
      return res.status(500).send(responsesHelper.error(500, `${error}`));
    }
  }
}
export const userController = new UserController();
