import axios, { AxiosResponse } from 'axios';
import winston from 'winston';
import {APIData} from '../dto/APIData'
import {LocalCache} from '../caching/LocalCache';
import { Request, Response, NextFunction } from 'express';
import config from '../config/Config'
const apiData = new APIData();
export class APIResponse {
   
public async getFlightData(endpoint:string){
    
    
    const localcache =  new LocalCache();
    let urlendpoint:string="";
    try{
            
            const cacheddata:APIData = await localcache.getCache(endpoint);
            if(!cacheddata) {
            urlendpoint = endpoint==="source1" ? config.API_ENDPOINT1 : config.API_ENDPOINT2
            const apiresult = await axios.get(urlendpoint,{auth:{username:config.API_USERNAME,password:config.API_PASSWORD}})
            const responsedata:APIData = apiresult.data;
            if(apiresult.data != 'Service Unavailable'){
            await localcache.setCache(endpoint,responsedata)}
            return apiresult.data;
                
          }else { return cacheddata}

    }catch(err){
            winston.error("Error while calling endpoint", err);
            return err;
    }

}

public async getResponse(req: Request, res: Response) {
   
    const apiResponse = new APIResponse();
    try{
        
        const [sourceoneresult,sourcetworesult]=await Promise.all([apiResponse.getFlightData("source1"),apiResponse.getFlightData("source2")])
        const sourceonedata:APIData = sourceoneresult;
        const sourcetwodata:APIData=sourcetworesult;
    
        let uniqueflights= await apiData.getUniqueFlights(sourceonedata,sourcetwodata)
        if(uniqueflights){
        return res.status(200).send(uniqueflights);
        } else {
            return res.status(400).json({
                "Error":"Error while calling APIs"
            });
        }
    }catch(err){

        return res.status(400).json({
            err
        });
    }

}

}