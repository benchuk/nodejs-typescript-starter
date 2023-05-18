import { Request, Response } from 'express';
import loggerService from '../../services/loggerService';

class DemoController {
    readonly test = async (req: Request, res: Response) => {
        loggerService.debug("demo api")
        return res.Res200("demo ok")
    }
}

export default new DemoController();
