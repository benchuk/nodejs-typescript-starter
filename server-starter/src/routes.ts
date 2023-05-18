import express from 'express';
import demoRouter from "./api/demo/routes"
import { GlobalMiddlewares } from "./middlewares"

const Routes = () => {
	const apiRouter = express.Router();
	apiRouter.use(GlobalMiddlewares.isLoggedIn)
	apiRouter.use('/demo', demoRouter())
	// const noneRestrictedRouter = express.Router()
	// noneRestrictedRouter.use('/', otherRouter())

	const router = express.Router()
	// router.use('/auth', noneRestrictedRouter)
	router.use('/api', apiRouter)

	// default if no other handler found
	router.use(GlobalMiddlewares.pageNotFound);
	return router
};

export default Routes;
