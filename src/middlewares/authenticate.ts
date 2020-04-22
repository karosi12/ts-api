import JWT from 'jsonwebtoken';
import { responsesHelper } from '../utils/responses';
import { Logger } from '../logger/logger'
import dotenv from 'dotenv';
dotenv.config();
const logging = new Logger();
const logger = logging.log('jwt-service');
const SECRET = process.env.JWT_SECRET;

export const authenticate = async (req, res, next) => {
    try {
        let token = req.headers.authorization === undefined ? '' : req.headers.authorization;
        if(token.includes('Bearer')) {
            const checkBearer = req.headers.authorization.split(" ");
            token = checkBearer[1];
        } else {
            token = req.headers.authorization;
        }
        if (!token) return res.status(400).send(responsesHelper.error(400, 'Unauthorised access'));  
        const authVerify = await JWT.verify(token, SECRET);
        if (!authVerify) return res.status(401).send(responsesHelper.error(400, 'JWT token has expired')); 
        req.decoded = authVerify;
        next();      
    } catch (error) {
        logger.error(`${JSON.stringify(error)}`);
        if (error.message) return res.status(500).send(responsesHelper.error(500, `${error.message}`));
        if(error) return res.status(500).send(responsesHelper.error(500, 'Something went wrong about user login token'));
    }
};