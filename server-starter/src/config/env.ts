import * as dotenv from 'dotenv'

enum EnvironmentType {
    Development = "development",
    Production = "production",
}
const getEnv = (): EnvironmentType => {
    return process.env.NODE_ENV as EnvironmentType || EnvironmentType.Development
}

const isDevelopment = (): boolean => {
    return getEnv() === EnvironmentType.Development
}

if (process.env.ENV_NAME === undefined && isDevelopment()) {
    console.log("---------------->  LOADING CONFIG LOCAL    <-------------------")
    dotenv.config({ path: './env/local.env' })
}

const envName: string = process.env.ENV_NAME || 'ENV_NAME ENV NOT FOUND'
const isDev = isDevelopment()
const env = getEnv()
console.log("----------------->  LOADING CONFIG    <-------------------")

class Config {
    isDevelopment: boolean = isDev;
    env: EnvironmentType = env;
    envName = envName;
    dbURI = process.env.DB_URI || ""
    jwtPublicKey = Buffer.from(process.env.JWT_PUBLIC_KEY || "", 'base64').toString();
    tokenAudience = (process.env.TOKEN_AUDIENCE.split(",") || [""]);
    useBackCompatAuthToken = Boolean(process.env.USE_BACKCOMPAT_AUTH_TOKEN || "false");
    backCompatAuthTokenSecret = (process.env.BACKCOMPAT_TOKEN_SECRET || "");
    public get description() {
        return `name:${this.envName}, env:${this.env}, isDevelopment:${this.isDevelopment}`
    }
}
export default new Config()