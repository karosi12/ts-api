import mongoose from 'mongoose';
import { Config } from '../config/config';

export class DB {
    private MONGO_HOST: string;
    private MONGO_PORT: number;
    private MONGO_DB_NAME: string;
    private MONGO_USERNAME: string;
    private MONGO_PASSWORD: string;

    constructor() {
        const config = new Config();
        this.MONGO_HOST = config.MongoDBCredentials().MONGO_HOST;
        this.MONGO_PORT = config.MongoDBCredentials().MONGO_PORT;
        this.MONGO_DB_NAME = config.MongoDBCredentials().MONGO_DB_NAME;
        this.MONGO_USERNAME = config.MongoDBCredentials().MONGO_USERNAME;
        this.MONGO_PASSWORD = config.MongoDBCredentials().MONGO_PASSWORD;
    }

    public connect() {
        const options = {
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 10,
            bufferMaxEntries: 0,
            useNewUrlParser: true 
        };

        const url = `mongodb://${this.MONGO_HOST}:${this.MONGO_PORT}/${this.MONGO_DB_NAME}`;
        mongoose.connect(url, options);
    }
}