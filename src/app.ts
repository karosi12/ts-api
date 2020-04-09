import * as dotenv from "dotenv";
import { DB } from './db/db'
import express, {Application, Request, Response} from 'express';
const app: Application = express();
dotenv.config();
const dbConnect = new DB();
dbConnect.connect();
app.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));