import errorHandler from "errorhandler";
import app from "./app";
import db from "./dal/db"
import loggerService from "./services/loggerService";
import config from "./config/env"

if (!config.isDevelopment) {
    app.use(errorHandler());
}


const startServer = async () => {
    loggerService.info("Starting server...")
    await db.connect()
    app.listen(app.get("port"), () => {
        loggerService.info(`App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
        loggerService.info("Press CTRL-C to stop\n");
    });
}

startServer()

export default {}