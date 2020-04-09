export class Config {
    public MongoDBCredentials(): any {
        const MONGO_HOST = process.env.MONGO_HOST;
        const MONGO_PORT = process.env.MONGO_PORT;
        const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
        const MONGO_USERNAME = process.env.MONGO_USERNAME;
        const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

        return { MONGO_HOST, MONGO_PORT, MONGO_DB_NAME, MONGO_USERNAME, MONGO_PASSWORD };
    }
}