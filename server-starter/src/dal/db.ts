import mongoose from "mongoose"
import loggerService from "../services/loggerService"
import env from '../config/env'

const connectInternal = async () => {
    loggerService.debug((env.dbURI !== null && env.dbURI !== undefined) ? `DB URI CONFIGURED OK` : `DB NOT CONFIGURED`)
    loggerService.debug("Connecting to DB")
    try {
        await mongoose.connect(env.dbURI);
        loggerService.info("DB Connection OK")
    } catch (error) {
        loggerService.error("Failed to connect DB")
        loggerService.error(error)
        throw new Error("Failed to connect DB");
    }
}

export default {
    connect: connectInternal
}