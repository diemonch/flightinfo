import {createClient} from 'redis';
import winston from 'winston';
import {APIData} from '../dto/APIData'
import config from '../config/Config'
export  class LocalCache {
    
    public redisClient = createClient();

    constructor(){
       
        (async () => {
         this.redisClient.on('error', (err) => winston.error('Redis Client Error', err));
         await this.redisClient.connect();
        })();
     }
   
    
    public setCache = async (key:string, data:APIData)=>{
        
        try{
            
            await this.redisClient.setEx(key,config.REDIS_BUFFER_TIME,JSON.stringify(data));
        }catch(err){
            winston.error("Issues with setting Cache data",err)
            return err;            
        }

    }
    public getCache = async(key:string)=>{
        
        
        try{
            const data = await this.redisClient.get(key)
            if(data){
                    return JSON.parse(data)
                } else {
                    winston.info("cache is null")
                    return null
                }
            }

        catch(err){
            winston.error("Issues with Obtaining Cached data",err)
            return err
        }
    
    }
}
