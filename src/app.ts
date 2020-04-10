import * as dotenv from "dotenv";
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { DB } from './db/db'
import { Logger } from './logger/logger'
import express, {Application, Request, Response} from 'express';
import { usersRoute } from './routes/user';
const API_VERSION = '/api/v1';
const app: Application = express();
dotenv.config();
const dbConnect = new DB();
const logging = new Logger();
const logger = logging.log('server');
dbConnect.connect();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use(API_VERSION, usersRoute);
app.get('/', (req: Request, res: Response) => {
    return res.status(200).send({ message: 'API is running fine' });
});

app.listen(process.env.PORT, () => logger.info(`server running on ${process.env.PORT}`));