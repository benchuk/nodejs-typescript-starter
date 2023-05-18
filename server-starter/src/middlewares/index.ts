import { Request, Response, NextFunction } from 'express';
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import loggerService from '../services/loggerService';
import ServerResult from "../utils/data/ServerResult"
import tokenManager from '../services/tokenManager'

declare global {
    namespace Express {
        interface User {
            id: string;
        }
        interface Request {
            user: User;
        }
    }
}

class GlobalMiddleware {

    async httpRequestLogger(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { originalUrl, params, body, headers, url, query } = req
        loggerService.http(`url:${url} originalUrl:${originalUrl} query:${JSON.stringify(query, null, 2)} params:${JSON.stringify(params, null, 2)} body:${body} headers:${JSON.stringify(headers, null, 2)}`);
        next();
    }

    async isLoggedIn(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        console.log("isLoggedIn")
        // loggerService.http(`req.body ${JSON.stringify(req.body)}`);
        // loggerService.http(`req.user ${JSON.stringify(req.user)}`);
        // loggerService.http(`req.session ${JSON.stringify(req.session)}`);
        // loggerService.http(`req.session.cookie ${JSON.stringify(req.session.cookie)}`);
        try {
            const authHeader = req.headers.authorization || ""
            console.log(`authHeader ${authHeader}`)
            if (authHeader.startsWith("Bearer ")) {
                const token = authHeader.substring(7, authHeader.length);
                console.log(`token ${token}`)
                const decodedUserID = tokenManager.verifyToken(token).userID
                if (decodedUserID.length > 0) {
                    const expressUser: Express.User = {
                        id: decodedUserID,
                    };
                    req.user = expressUser
                    return next();
                }
            }

            loggerService.debug(`User is not logged in`);
            res.status(401).json(new ServerResult(401, "Unauthorized"));

        } catch (error) {
            console.log(error)
            return res.status(401).json(new ServerResult(401, "Unauthorized"));
        }
    }

    async pageNotFound(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        loggerService.http("Page not found.");
        return res.status(404).json(new ServerResult(404, "Page not found"));
    }
}

const GlobalMiddlewareInstance = new GlobalMiddleware()
const globalMiddlewares = [GlobalMiddlewareInstance.httpRequestLogger,
compression(),
bodyParser.json(),
bodyParser.urlencoded({ extended: true }),
]

console.log(`globalMiddlewares count: `, globalMiddlewares.length, globalMiddlewares)
export default globalMiddlewares
export const GlobalMiddlewares = GlobalMiddlewareInstance