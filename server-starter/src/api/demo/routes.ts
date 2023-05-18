import express from "express"
import demoController from "./demoController"

const demoRouter = () => {
    const router = express.Router();
    router.get("/test", demoController.test)
    return router;
}
export default demoRouter