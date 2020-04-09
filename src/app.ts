import * as dotenv from "dotenv";
import { DB } from './db/db'
import { Logger } from './logger/logger'
import express, {Application, Request, Response} from 'express';
const app: Application = express();
dotenv.config();
const dbConnect = new DB();
const logging = new Logger();
const logger = logging.log('server');
dbConnect.connect();
app.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

app.listen(process.env.PORT, () => logger.info(`server running on ${process.env.PORT}`));