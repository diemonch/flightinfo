import axios, { AxiosResponse } from 'axios';
import winston from 'winston';
import {APIData} from '../dto/APIData'
import {LocalCache} from '../caching/LocalCache';
import { Request, Response, NextFunction } from 'express';
import config from '../config/Config'
import {errorHandler} from '../util/ErrorHandler'



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

    }catch(error){
            await errorHandler(error);
            winston.error("Error while calling endpoint", error);
            return error;
    }

}

public async getResponse(req: Request, res: Response) {
   
    const apiResponse = new APIResponse();
    let sourceoneresult!:APIData
    let sourcetworesult!:APIData
    const apiResponseMaxOut =config.API_RESPONSE_MAXOUT

     try{
        const apiRequestTimer = new Promise((_, reject) => setTimeout(reject, apiResponseMaxOut, {timedout: "Request timed out"}));
        sourceoneresult = await Promise.race([apiResponse.getFlightData("source1"),apiRequestTimer])
        sourcetworesult = await Promise.race([apiResponse.getFlightData("source2"),apiRequestTimer])

        let uniqueflights= await apiData.getUniqueFlights(sourceoneresult,sourcetworesult)
        if(uniqueflights){
        return res.status(200).send(uniqueflights);
        } else {
            return res.status(400).json({
                "Error":"Error while calling APIs"
            });
        }
    }catch(error){
       
        await errorHandler(error)
        return res.status(400).json({
            error
        });
    }

}

}