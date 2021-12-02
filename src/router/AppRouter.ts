import {Router} from 'express'
import {APIResponse} from '../controller/APIResponse'
export class AppRouter{

public router = Router();
public apiResponse = new APIResponse();
constructor()
{
   
    this.initializeRoutes();
}
private initializeRoutes()
{
   
    this.router.get('/app',this.apiResponse.getResponse)
}

}